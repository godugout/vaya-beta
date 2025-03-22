
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Define the types of devices we can detect
export type ProximityDeviceType = 'bluetooth' | 'wifi' | 'nfc';

export interface ProximityDevice {
  id: string;
  name: string;
  type: ProximityDeviceType;
  distance?: number; // Approximate distance in meters (if available)
  rssi?: number; // Signal strength
  lastSeen: Date;
}

export interface UseProximityDetectionOptions {
  enabled?: boolean;
  onDeviceDetected?: (device: ProximityDevice) => void;
  detectionInterval?: number; // in milliseconds
  signalThreshold?: number; // RSSI threshold for considering a device "near"
}

export function useProximityDetection({
  enabled = true,
  onDeviceDetected,
  detectionInterval = 5000,
  signalThreshold = -70
}: UseProximityDetectionOptions = {}) {
  const [isScanning, setIsScanning] = useState(false);
  const [nearbyDevices, setNearbyDevices] = useState<ProximityDevice[]>([]);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Check if Web Bluetooth API is available
  const isBluetoothSupported = typeof navigator !== 'undefined' && 'bluetooth' in navigator;

  // Scan for nearby Bluetooth devices
  const scanForDevices = useCallback(async () => {
    if (!enabled || !isBluetoothSupported) return;

    try {
      setIsScanning(true);
      
      // Request Bluetooth permissions and scan for devices
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [] // No services needed for proximity detection
      });
      
      setPermissionGranted(true);
      
      // Create a device object from the scan result
      const newDevice: ProximityDevice = {
        id: device.id,
        name: device.name || 'Unknown Device',
        type: 'bluetooth',
        lastSeen: new Date()
      };
      
      // Add to nearby devices if not already present
      setNearbyDevices(prevDevices => {
        const existingDevice = prevDevices.find(d => d.id === newDevice.id);
        if (existingDevice) {
          // Update existing device
          return prevDevices.map(d => 
            d.id === newDevice.id 
              ? { ...d, lastSeen: new Date() } 
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
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotFoundError') {
          console.log('No Bluetooth devices found nearby');
        } else if (error.name === 'SecurityError' || error.name === 'NotAllowedError') {
          setPermissionGranted(false);
          toast({
            title: 'Permission Denied',
            description: 'Bluetooth access is required for proximity detection',
            variant: 'destructive'
          });
        } else {
          console.error('Bluetooth scanning error:', error);
        }
      }
    } finally {
      setIsScanning(false);
    }
  }, [enabled, isBluetoothSupported, onDeviceDetected, toast]);

  // Alternative implementation for Web NFC when available
  const scanNFC = useCallback(async () => {
    if (!enabled || !('NDEFReader' in window)) return;
    
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
          lastSeen: new Date()
        };
        
        setNearbyDevices(prevDevices => {
          // Always treat NFC as a new detection
          onDeviceDetected?.(newDevice);
          toast({
            title: 'NFC Tag Detected',
            description: 'Found an NFC tag very close by',
          });
          return [...prevDevices, newDevice];
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'SecurityError' || error.name === 'NotAllowedError') {
          setPermissionGranted(false);
          toast({
            title: 'Permission Denied',
            description: 'NFC access is required for proximity detection',
            variant: 'destructive'
          });
        } else {
          console.error('NFC scanning error:', error);
        }
      }
    }
  }, [enabled, onDeviceDetected, toast]);

  // Start scanning when enabled
  useEffect(() => {
    if (!enabled) return;
    
    let scanTimer: NodeJS.Timeout;
    
    // Try NFC first if available
    if ('NDEFReader' in window) {
      scanNFC();
    }
    
    // Also scan for Bluetooth periodically
    if (isBluetoothSupported) {
      // Initial scan
      scanForDevices();
      
      // Set up interval for subsequent scans
      scanTimer = setInterval(() => {
        if (!isScanning) {
          scanForDevices();
        }
      }, detectionInterval);
    }
    
    // Clean up timer on unmount
    return () => {
      clearInterval(scanTimer);
    };
  }, [enabled, isBluetoothSupported, isScanning, scanForDevices, scanNFC, detectionInterval]);

  // Filter devices based on last seen time (remove old devices)
  useEffect(() => {
    const now = new Date();
    const EXPIRATION_TIME = 30000; // 30 seconds
    
    setNearbyDevices(prevDevices => 
      prevDevices.filter(device => {
        const timeDiff = now.getTime() - device.lastSeen.getTime();
        return timeDiff < EXPIRATION_TIME;
      })
    );
  }, [nearbyDevices]);

  return {
    isScanning,
    nearbyDevices,
    permissionGranted,
    startScan: scanForDevices,
    isSupported: isBluetoothSupported || 'NDEFReader' in window
  };
}
