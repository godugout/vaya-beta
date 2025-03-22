
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ProximityDevice } from './types';

export const useOfflineSync = (
  offlineMode: boolean,
  onDeviceDetected?: (device: ProximityDevice) => void
) => {
  // Queue for offline device detections
  const [offlineQueue, setOfflineQueue] = useState<ProximityDevice[]>([]);
  const { toast } = useToast();

  // Add a device to the offline queue
  const queueOfflineDevice = (device: ProximityDevice) => {
    if (offlineMode && !navigator.onLine) {
      setOfflineQueue(prev => [...prev, device]);
    }
  };

  // Handle device synchronization when coming back online
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

  return {
    offlineQueue,
    queueOfflineDevice,
    setOfflineQueue
  };
};
