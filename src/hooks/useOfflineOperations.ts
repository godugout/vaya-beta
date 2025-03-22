
import { useState, useEffect } from 'react';
import { offlineManager, SyncOperation } from '@/utils/offline/offlineManager';
import { useToast } from '@/components/ui/use-toast';

export interface OfflineStatus {
  isOnline: boolean;
  pendingOperations: number;
  isSyncing?: boolean;
}

export const useOfflineOperations = () => {
  const [status, setStatus] = useState<OfflineStatus>({
    isOnline: navigator.onLine,
    pendingOperations: 0,
    isSyncing: false
  });
  const { toast } = useToast();

  // Function to forcibly trigger a sync
  const syncNow = async () => {
    if (!status.isOnline) {
      toast({
        title: "Can't sync now",
        description: "You are offline. Please check your internet connection.",
        variant: "destructive"
      });
      return;
    }
    
    if (status.pendingOperations === 0) {
      toast({
        title: "Nothing to sync",
        description: "There are no pending operations to synchronize.",
        variant: "default"
      });
      return;
    }
    
    setStatus(prev => ({ ...prev, isSyncing: true }));
    try {
      await offlineManager.syncOperations();
      toast({
        title: "Sync completed",
        description: "Your changes have been synchronized successfully.",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Sync failed",
        description: error instanceof Error ? error.message : "An error occurred during synchronization.",
        variant: "destructive"
      });
    } finally {
      setStatus(prev => ({ ...prev, isSyncing: false }));
    }
  };

  // Queue an operation to be synced when online
  const queueOperation = (operation: Omit<SyncOperation, 'id' | 'timestamp' | 'retryCount' | 'status'>) => {
    const operationId = offlineManager.queueOperation(operation);
    
    if (status.isOnline) {
      toast({
        title: "Operation queued",
        description: "Your changes will be synchronized in the background.",
        variant: "default"
      });
    } else {
      toast({
        title: "Operation saved",
        description: "Your changes will be synchronized when you're back online.",
        variant: "default"
      });
    }
    
    return operationId;
  };

  // Subscribe to offline manager status changes
  useEffect(() => {
    const unsubscribe = offlineManager.subscribe((newStatus) => {
      setStatus(prev => ({
        ...prev,
        ...newStatus
      }));
      
      // Show a toast when we go online/offline
      if (prev.isOnline !== newStatus.isOnline) {
        if (newStatus.isOnline) {
          toast({
            title: "You're back online",
            description: newStatus.pendingOperations > 0 
              ? `Synchronizing ${newStatus.pendingOperations} pending changes...` 
              : "All your data is up to date.",
            variant: "default"
          });
        } else {
          toast({
            title: "You're offline",
            description: "Don't worry, your changes will be saved and synchronized when you're back online.",
            variant: "destructive"
          });
        }
      }
    });
    
    // Clean up subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [toast]);

  return {
    status,
    syncNow,
    queueOperation,
    isOnline: status.isOnline,
    hasPendingOperations: status.pendingOperations > 0,
    isSyncing: status.isSyncing
  };
};
