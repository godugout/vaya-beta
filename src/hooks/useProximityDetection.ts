
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Define the types of devices we can detect
export type ProximityDeviceType = 'bluetooth' | 'wifi' | 'nfc' | 'uwb';

export interface ProximityDevice {
  id: string;
  name: string;
  type: ProximityDeviceType;
  distance?: number; // Approximate distance in meters (if available)
  rssi?: number; // Signal strength
  lastSeen: Date;
  metadata?: Record<string, any>; // Additional device-specific data
}

export interface UseProximityDetectionOptions {
  enabled?: boolean;
  onDeviceDetected?: (device: ProximityDevice) => void;
  onDeviceLost?: (deviceId: string) => void;
  detectionInterval?: number; // in milliseconds
  signalThreshold?: number; // RSSI threshold for considering a device "near"
  crowdedEnvironment?: boolean; // Optimize for crowded environments
  batteryEfficient?: boolean; // Optimize for battery efficiency
  deviceFilters?: Partial<ProximityDevice>[]; // Filter specific devices
  offlineMode?: boolean; // Continue tracking when offline
}

export function useProximityDetection({
  enabled = true,
  onDeviceDetected,
  onDeviceLost,
  detectionInterval = 5000,
  signalThreshold = -70,
  crowdedEnvironment = false,
  batteryEfficient = false,
  deviceFilters = [],
  offlineMode = false
}: UseProximityDetectionOptions = {}) {
  const [isScanning, setIsScanning] = useState(false);
  const [nearbyDevices, setNearbyDevices] = useState<ProximityDevice[]>([]);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [deviceHistory, setDeviceHistory] = useState<Record<string, { appearances: number, lastRssi: number[] }>>({}); 
  const { toast } = useToast();

  // Check if available APIs are supported
  const isBluetoothSupported = typeof navigator !== 'undefined' && 'bluetooth' in navigator;
  const isNFCSupported = typeof window !== 'undefined' && 'NDEFReader' in window;
  const isUWBSupported = typeof navigator !== 'undefined' && 'uwb' in navigator;

  // Adjust scanning parameters based on options
  const effectiveInterval = batteryEfficient ? detectionInterval * 2 : detectionInterval;
  const effectiveThreshold = crowdedEnvironment ? signalThreshold - 10 : signalThreshold; // Require stronger signal in crowded areas

  // Filter devices with potential interference in crowded environments
  const filterDeviceInCrowdedEnvironment = useCallback((device: ProximityDevice) => {
    if (!crowdedEnvironment) return true;
    
    // In crowded environments, apply more strict filtering
    const deviceStats = deviceHistory[device.id];
    
    if (!deviceStats) return true; // First appearance
    
    // Device must have been seen multiple times with consistent signal strength
    if (deviceStats.appearances < 3) return false;
    
    // Check for signal stability
    const recentRssi = deviceStats.lastRssi.slice(-3);
    const avgRssi = recentRssi.reduce((a, b) => a + b, 0) / recentRssi.length;
    const variance = recentRssi.reduce((a, b) => a + Math.pow(b - avgRssi, 2), 0) / recentRssi.length;
    
    // High variance indicates potential interference or unstable signal
    return variance < 25; // Empirical threshold for stable signals
  }, [crowdedEnvironment, deviceHistory]);

  // Apply user-defined filters
  const matchesFilters = useCallback((device: ProximityDevice) => {
    if (deviceFilters.length === 0) return true;
    
    return deviceFilters.some(filter => {
      // Match all specified filter properties
      return Object.entries(filter).every(([key, value]) => {
        return device[key as keyof ProximityDevice] === value;
      });
    });
  }, [deviceFilters]);

  // Scan for nearby Bluetooth devices
  const scanForDevices = useCallback(async () => {
    if (!enabled || !isBluetoothSupported || !navigator.bluetooth) return;

    try {
      setIsScanning(true);
      
      // Request Bluetooth permissions and scan for devices
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [] // No services needed for proximity detection
      });
      
      setPermissionGranted(true);
      
      // Get RSSI if available (not standardized in Web Bluetooth yet)
      let rssi: number | undefined = undefined;
      if ('gattServer' in device && device.gatt) {
        try {
          // This is a non-standard extension some browsers might support
          const server = await device.gatt.connect();
          // @ts-ignore - Accessing experimental properties
          if (server.device && server.device.rssi) {
            // @ts-ignore
            rssi = server.device.rssi;
          }
          // Disconnect immediately to save battery
          server.disconnect();
        } catch (e) {
          // RSSI detection failed, not critical
        }
      }
      
      // Create a device object from the scan result
      const newDevice: ProximityDevice = {
        id: device.id,
        name: device.name || 'Unknown Device',
        type: 'bluetooth',
        rssi: rssi,
        lastSeen: new Date()
      };
      
      // Update device history for crowded environment filtering
      setDeviceHistory(prev => {
        const current = prev[newDevice.id] || { appearances: 0, lastRssi: [] };
        return {
          ...prev,
          [newDevice.id]: {
            appearances: current.appearances + 1,
            lastRssi: [...current.lastRssi.slice(-4), rssi || -100].filter(Boolean)
          }
        };
      });
      
      // Apply filters before adding device
      if (matchesFilters(newDevice) && filterDeviceInCrowdedEnvironment(newDevice)) {
        // Add to nearby devices if not already present
        setNearbyDevices(prevDevices => {
          const existingDevice = prevDevices.find(d => d.id === newDevice.id);
          if (existingDevice) {
            // Update existing device
            return prevDevices.map(d => 
              d.id === newDevice.id 
                ? { ...d, lastSeen: new Date(), rssi: newDevice.rssi || d.rssi } 
                : d
            );
          } else {
            // Add new device
            onDeviceDetected?.(newDevice);
            toast({
              title: 'New Device Detected',
              description: `Found ${newDevice.name} nearby`,
            });
            return [...prevDevices, newDevice];
          }
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotFoundError') {
          console.log('No Bluetooth devices found nearby');
        } else if (error.name === 'SecurityError' || error.name === 'NotAllowedError') {
          setPermissionGranted(false);
          toast({
            title: 'Permission Denied',
            description: 'Bluetooth access is required for proximity detection',
            variant: "destructive"
          });
        } else {
          console.error('Bluetooth scanning error:', error);
        }
      }
    } finally {
      setIsScanning(false);
    }
  }, [
    enabled, 
    isBluetoothSupported, 
    onDeviceDetected, 
    toast, 
    filterDeviceInCrowdedEnvironment, 
    matchesFilters
  ]);

  // Alternative implementation for Web NFC when available
  const scanNFC = useCallback(async () => {
    if (!enabled || !isNFCSupported) return;
    
    try {
      // @ts-ignore - NDEFReader might not be recognized by TypeScript
      const ndef = new NDEFReader();
      await ndef.scan();
      
      setPermissionGranted(true);
      
      // Listen for NFC readings
      ndef.addEventListener("reading", (event: any) => {
        const newDevice: ProximityDevice = {
          id: event.serialNumber || Date.now().toString(),
          name: 'NFC Tag',
          type: 'nfc',
          distance: 0.1, // NFC typically works at very close range (a few cm)
          lastSeen: new Date(),
          metadata: {
            message: event.message,
            recordCount: event.message?.records?.length || 0
          }
        };
        
        if (matchesFilters(newDevice)) {
          setNearbyDevices(prevDevices => {
            // Always treat NFC as a new detection
            onDeviceDetected?.(newDevice);
            toast({
              title: 'NFC Tag Detected',
              description: 'Found an NFC tag very close by',
            });
            return [...prevDevices, newDevice];
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'SecurityError' || error.name === 'NotAllowedError') {
          setPermissionGranted(false);
          toast({
            title: 'Permission Denied',
            description: 'NFC access is required for proximity detection',
            variant: "destructive"
          });
        } else {
          console.error('NFC scanning error:', error);
        }
      }
    }
  }, [enabled, isNFCSupported, onDeviceDetected, toast, matchesFilters]);

  // Queue for offline device detections
  const [offlineQueue, setOfflineQueue] = useState<ProximityDevice[]>([]);

  // Handle device synchronization
  useEffect(() => {
    if (!offlineMode || offlineQueue.length === 0) return;
    
    // Check if we're back online
    if (navigator.onLine) {
      // Process offline queue
      offlineQueue.forEach(device => {
        onDeviceDetected?.(device);
        toast({
          title: 'Synced Device Detection',
          description: `Found ${device.name} while offline`,
        });
      });
      
      // Clear the queue
      setOfflineQueue([]);
    }
  }, [navigator.onLine, offlineQueue, offlineMode, onDeviceDetected, toast]);

  // Start scanning when enabled
  useEffect(() => {
    if (!enabled) return;
    
    let scanTimer: NodeJS.Timeout;
    
    // Try NFC first if available
    if (isNFCSupported) {
      scanNFC();
    }
    
    // Also scan for Bluetooth periodically
    if (isBluetoothSupported && navigator.bluetooth) {
      // Initial scan
      scanForDevices();
      
      // Set up interval for subsequent scans
      scanTimer = setInterval(() => {
        if (!isScanning) {
          scanForDevices();
        }
      }, effectiveInterval);
    }
    
    // Clean up timer on unmount
    return () => {
      clearInterval(scanTimer);
    };
  }, [
    enabled, 
    isBluetoothSupported, 
    isNFCSupported, 
    isScanning, 
    scanForDevices, 
    scanNFC, 
    effectiveInterval
  ]);

  // Filter devices based on last seen time (remove old devices)
  useEffect(() => {
    const now = new Date();
    const EXPIRATION_TIME = batteryEfficient ? 60000 : 30000; // 30-60 seconds based on battery efficiency setting
    
    setNearbyDevices(prevDevices => {
      const newDevices = prevDevices.filter(device => {
        const timeDiff = now.getTime() - device.lastSeen.getTime();
        const shouldKeep = timeDiff < EXPIRATION_TIME;
        
        // Notify when devices are lost
        if (!shouldKeep) {
          onDeviceLost?.(device.id);
        }
        
        return shouldKeep;
      });
      
      return newDevices;
    });
  }, [nearbyDevices, batteryEfficient, onDeviceLost]);

  // Sort devices by signal strength/proximity
  const sortedDevices = [...nearbyDevices].sort((a, b) => {
    // First by distance if available
    if (a.distance !== undefined && b.distance !== undefined) {
      return a.distance - b.distance;
    }
    // Then by RSSI (higher RSSI = stronger signal = closer)
    if (a.rssi !== undefined && b.rssi !== undefined) {
      return b.rssi - a.rssi;
    }
    // Finally by last seen
    return b.lastSeen.getTime() - a.lastSeen.getTime();
  });

  return {
    isScanning,
    nearbyDevices: sortedDevices,
    permissionGranted,
    startScan: scanForDevices,
    isSupported: isBluetoothSupported || isNFCSupported || isUWBSupported,
    batteryEfficient,
    crowdedEnvironmentMode: crowdedEnvironment
  };
}
