
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  DeviceHistory, 
  ProximityDevice, 
  UseProximityDetectionOptions 
} from './proximityDetection/types';
import { useBluetoothScanner } from './proximityDetection/bluetoothScanner';
import { useNfcScanner } from './proximityDetection/nfcScanner';
import { useDeviceFilters } from './proximityDetection/deviceUtils';
import { useOfflineSync } from './proximityDetection/offlineSync';
import { getDeviceExpirationTime } from './proximityDetection/deviceUtils';

export const useProximityDetection = (options: UseProximityDetectionOptions = {}) => {
  const {
    enabled = false,
    onDeviceDetected,
    onDeviceLost,
    detectionInterval = 5000,
    signalThreshold = -80,
    crowdedEnvironment = false,
    batteryEfficient = false,
    deviceFilters = [],
    offlineMode = false
  } = options;
  
  const [nearbyDevices, setNearbyDevices] = useState<ProximityDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [deviceHistory, setDeviceHistory] = useState<Record<string, DeviceHistory>>({});
  
  const { toast } = useToast();
  
  // Use device utilities
  const { 
    filterDeviceInCrowdedEnvironment, 
    matchesFilters, 
    sortDevicesByProximity 
  } = useDeviceFilters(crowdedEnvironment, deviceHistory, deviceFilters);
  
  // Use offline sync capability
  const { queueOfflineDevice } = useOfflineSync(offlineMode, onDeviceDetected);
  
  // Use Bluetooth scanner
  const { 
    isBluetoothSupported, 
    isScanning: isBluetoothScanning, 
    scanForBluetoothDevices 
  } = useBluetoothScanner(
    setPermissionGranted,
    setDeviceHistory,
    matchesFilters,
    filterDeviceInCrowdedEnvironment,
    onDeviceDetected
  );
  
  // Use NFC scanner
  const { 
    isNFCSupported, 
    scanForNfcDevices 
  } = useNfcScanner(
    setPermissionGranted,
    matchesFilters,
    onDeviceDetected
  );
  
  // Add device to nearby devices
  const addNearbyDevice = useCallback((device: ProximityDevice) => {
    if (!device) return;
    
    setNearbyDevices(prev => {
      // Check if device already exists
      const existingDeviceIndex = prev.findIndex(d => d.id === device.id);
      
      if (existingDeviceIndex >= 0) {
        // Update existing device
        const updated = [...prev];
        updated[existingDeviceIndex] = {
          ...updated[existingDeviceIndex],
          ...device,
          lastSeen: new Date()
        };
        return updated;
      } else {
        // Add new device
        return [...prev, device];
      }
    });
    
    // Queue for offline handling if needed
    if (!navigator.onLine) {
      queueOfflineDevice(device);
    }
    
    // Trigger callback
    onDeviceDetected?.(device);
  }, [onDeviceDetected, queueOfflineDevice]);
  
  // Remove devices that haven't been seen recently
  useEffect(() => {
    if (!enabled) return;
    
    const interval = setInterval(() => {
      const now = new Date();
      const expirationTime = getDeviceExpirationTime(batteryEfficient);
      
      setNearbyDevices(prev => {
        const filteredDevices = prev.filter(device => {
          const timeDiff = now.getTime() - device.lastSeen.getTime();
          const isExpired = timeDiff > expirationTime;
          
          if (isExpired && onDeviceLost) {
            onDeviceLost(device.id);
          }
          
          return !isExpired;
        });
        
        return sortDevicesByProximity(filteredDevices);
      });
    }, detectionInterval);
    
    return () => clearInterval(interval);
  }, [enabled, batteryEfficient, detectionInterval, onDeviceLost, sortDevicesByProximity]);
  
  // Start scanning when enabled changes
  useEffect(() => {
    if (enabled) {
      startScan();
    }
  }, [enabled]);
  
  // Scan for devices
  const startScan = useCallback(async () => {
    if (isScanning || !enabled) return;
    
    setIsScanning(true);
    
    try {
      // Scan for bluetooth devices
      if (isBluetoothSupported) {
        const device = await scanForBluetoothDevices(true);
        if (device) {
          addNearbyDevice(device);
        }
      }
      
      // Scan for NFC devices
      if (isNFCSupported) {
        await scanForNfcDevices(true);
      }
      
      // If no scanning methods are supported, show a toast
      if (!isBluetoothSupported && !isNFCSupported) {
        toast({
          title: "Proximity Detection Not Supported",
          description: "Your device doesn't support Bluetooth or NFC scanning",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error scanning for devices:", error);
    } finally {
      setIsScanning(false);
    }
  }, [
    isScanning, 
    enabled, 
    isBluetoothSupported, 
    isNFCSupported, 
    scanForBluetoothDevices, 
    scanForNfcDevices, 
    addNearbyDevice,
    toast
  ]);
  
  return {
    nearbyDevices,
    isScanning: isScanning || isBluetoothScanning,
    startScan,
    permissionGranted,
    isBluetoothSupported,
    isNFCSupported,
  };
};

export { type ProximityDevice, type UseProximityDetectionOptions } from './proximityDetection/types';
