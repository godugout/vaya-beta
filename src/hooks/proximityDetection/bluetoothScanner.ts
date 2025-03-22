
import { useToast } from '@/components/ui/use-toast';
import { useState, useCallback } from 'react';
import { ProximityDevice } from './types';

export const useBluetoothScanner = (
  setPermissionGranted: (value: boolean | null) => void,
  setDeviceHistory: (updater: (prev: Record<string, { appearances: number, lastRssi: number[] }>) => 
    Record<string, { appearances: number, lastRssi: number[] }>) => void,
  matchesFilters: (device: ProximityDevice) => boolean,
  filterDeviceInCrowdedEnvironment: (device: ProximityDevice) => boolean,
  onDeviceDetected?: (device: ProximityDevice) => void
) => {
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  
  // Check if Bluetooth is supported in the browser
  const isBluetoothSupported = typeof navigator !== 'undefined' && 'bluetooth' in navigator;

  const scanForBluetoothDevices = useCallback(async (enabled: boolean) => {
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
        // Return the device to be added to the nearbyDevices state
        onDeviceDetected?.(newDevice);
        toast({
          title: 'New Device Detected',
          description: `Found ${newDevice.name} nearby`,
        });
        return newDevice;
      }
      
      return null;
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
      return null;
    } finally {
      setIsScanning(false);
    }
  }, [isBluetoothSupported, setPermissionGranted, setDeviceHistory, matchesFilters, filterDeviceInCrowdedEnvironment, onDeviceDetected, toast]);

  return {
    isBluetoothSupported,
    isScanning,
    scanForBluetoothDevices
  };
};
