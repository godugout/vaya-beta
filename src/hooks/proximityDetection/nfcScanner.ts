
import { useToast } from '@/components/ui/use-toast';
import { useCallback } from 'react';
import { ProximityDevice } from './types';

export const useNfcScanner = (
  setPermissionGranted: (value: boolean | null) => void,
  matchesFilters: (device: ProximityDevice) => boolean,
  onDeviceDetected?: (device: ProximityDevice) => void
) => {
  const { toast } = useToast();
  
  // Check if NFC is supported in the browser
  const isNFCSupported = typeof window !== 'undefined' && 'NDEFReader' in window;

  const scanForNfcDevices = useCallback(async (enabled: boolean) => {
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
          onDeviceDetected?.(newDevice);
          toast({
            title: 'NFC Tag Detected',
            description: 'Found an NFC tag very close by',
          });
        }
      });
      
      return true;
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
      return false;
    }
  }, [isNFCSupported, setPermissionGranted, matchesFilters, onDeviceDetected, toast]);

  return {
    isNFCSupported,
    scanForNfcDevices
  };
};
