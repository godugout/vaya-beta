
import { useState, useEffect, useCallback } from "react";
import { offlineManager } from "@/utils/offline/offlineManager";

interface UseOfflineOperationsProps {
  onConnectivityChange?: (isOnline: boolean) => void;
}

export function useOfflineOperations({ onConnectivityChange }: UseOfflineOperationsProps = {}) {
  const [isOnline, setIsOnline] = useState<boolean>(offlineManager.isNetworkOnline());
  const [pendingOperations, setPendingOperations] = useState<any[]>([]);

  // Handle connectivity changes
  useEffect(() => {
    const handleConnectivityChange = (online: boolean) => {
      setIsOnline(online);
      if (onConnectivityChange) {
        onConnectivityChange(online);
      }
    };

    // Register listeners
    offlineManager.addEventListener('connectivity-changed', handleConnectivityChange);
    offlineManager.addEventListener('queue-updated', setPendingOperations);

    // Get initial state
    setIsOnline(offlineManager.isNetworkOnline());

    // Cleanup listeners
    return () => {
      offlineManager.removeEventListener('connectivity-changed', handleConnectivityChange);
      offlineManager.removeEventListener('queue-updated', setPendingOperations);
    };
  }, [onConnectivityChange]);

  // Queue an operation
  const queueOperation = useCallback((operation: string, data: any, priority: number = 1) => {
    offlineManager.queueOperation(operation, data, priority);
  }, []);

  // Force sync attempt
  const forceSync = useCallback(() => {
    return offlineManager.processQueue();
  }, []);

  return {
    isOnline,
    pendingOperations,
    queueOperation,
    forceSync,
    hasPendingOperations: pendingOperations.length > 0
  };
}
