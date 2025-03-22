
import { supabase } from '@/integrations/supabase/client';

export type SyncOperation = {
  id: string;
  table: string;
  type: 'insert' | 'update' | 'delete';
  data: any;
  timestamp: number;
  priority: 'high' | 'medium' | 'low';
  retryCount: number;
  status: 'pending' | 'processing' | 'failed' | 'completed';
  error?: string;
};

class OfflineManager {
  private operationQueue: SyncOperation[] = [];
  private isOnline: boolean = navigator.onLine;
  private syncInProgress: boolean = false;
  private maxRetries: number = 3;
  private listeners: Set<(status: { isOnline: boolean, pendingOperations: number }) => void> = new Set();

  constructor() {
    // Load any persisted operations from localStorage
    this.loadQueueFromStorage();
    
    // Set up online/offline event listeners
    window.addEventListener('online', this.handleOnlineStatus);
    window.addEventListener('offline', this.handleOnlineStatus);
    
    // Initial status check
    this.handleOnlineStatus();
  }

  private handleOnlineStatus = () => {
    const wasOnline = this.isOnline;
    this.isOnline = navigator.onLine;
    
    // If we've come back online, try to sync
    if (!wasOnline && this.isOnline) {
      this.syncOperations();
    }
    
    // Notify listeners of status change
    this.notifyListeners();
  };

  /**
   * Add an operation to the queue
   */
  public queueOperation(operation: Omit<SyncOperation, 'id' | 'timestamp' | 'retryCount' | 'status'>): string {
    const id = crypto.randomUUID();
    const fullOperation: SyncOperation = {
      id,
      ...operation,
      timestamp: Date.now(),
      retryCount: 0,
      status: 'pending'
    };
    
    this.operationQueue.push(fullOperation);
    this.persistQueue();
    this.notifyListeners();
    
    // Try to sync immediately if we're online
    if (this.isOnline && !this.syncInProgress) {
      this.syncOperations();
    }
    
    return id;
  }

  /**
   * Sync all pending operations with the server
   */
  public async syncOperations(): Promise<void> {
    if (!this.isOnline || this.syncInProgress || this.operationQueue.length === 0) {
      return;
    }
    
    this.syncInProgress = true;
    
    try {
      // Sort operations by priority and timestamp
      const sortedOperations = [...this.operationQueue]
        .filter(op => op.status === 'pending')
        .sort((a, b) => {
          // First by priority
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
          if (priorityDiff !== 0) return priorityDiff;
          
          // Then by timestamp (oldest first)
          return a.timestamp - b.timestamp;
        });
      
      for (const operation of sortedOperations) {
        try {
          operation.status = 'processing';
          this.persistQueue();
          
          await this.executeOperation(operation);
          
          // If we get here, the operation was successful
          operation.status = 'completed';
        } catch (error) {
          console.error(`Failed to sync operation ${operation.id}:`, error);
          
          operation.retryCount++;
          if (operation.retryCount >= this.maxRetries) {
            operation.status = 'failed';
            operation.error = error instanceof Error ? error.message : String(error);
          } else {
            operation.status = 'pending';
          }
        }
        
        this.persistQueue();
        this.notifyListeners();
      }
      
      // Clean up completed operations
      this.cleanupCompletedOperations();
    } finally {
      this.syncInProgress = false;
    }
  }

  /**
   * Execute a single operation against the server
   */
  private async executeOperation(operation: SyncOperation): Promise<void> {
    const { table, type, data } = operation;
    
    switch (type) {
      case 'insert':
        const { error: insertError } = await supabase
          .from(table)
          .insert(data);
        
        if (insertError) throw insertError;
        break;
        
      case 'update':
        const { id, ...updateData } = data;
        const { error: updateError } = await supabase
          .from(table)
          .update(updateData)
          .eq('id', id);
        
        if (updateError) throw updateError;
        break;
        
      case 'delete':
        const { error: deleteError } = await supabase
          .from(table)
          .delete()
          .eq('id', data.id);
        
        if (deleteError) throw deleteError;
        break;
    }
  }

  /**
   * Remove completed operations from the queue
   */
  private cleanupCompletedOperations(): void {
    this.operationQueue = this.operationQueue.filter(op => op.status !== 'completed');
    this.persistQueue();
  }

  /**
   * Save the operation queue to localStorage
   */
  private persistQueue(): void {
    localStorage.setItem('offlineOperationQueue', JSON.stringify(this.operationQueue));
  }

  /**
   * Load the operation queue from localStorage
   */
  private loadQueueFromStorage(): void {
    try {
      const storedQueue = localStorage.getItem('offlineOperationQueue');
      if (storedQueue) {
        this.operationQueue = JSON.parse(storedQueue);
      }
    } catch (error) {
      console.error('Failed to load offline operation queue from storage:', error);
      // If loading fails, initialize with an empty queue
      this.operationQueue = [];
    }
  }

  /**
   * Get the current connection status and pending operations count
   */
  public getStatus(): { isOnline: boolean; pendingOperations: number } {
    return {
      isOnline: this.isOnline,
      pendingOperations: this.operationQueue.filter(op => op.status === 'pending').length
    };
  }

  /**
   * Subscribe to status changes
   */
  public subscribe(listener: (status: { isOnline: boolean; pendingOperations: number }) => void): () => void {
    this.listeners.add(listener);
    // Call the listener immediately with current status
    listener(this.getStatus());
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of status changes
   */
  private notifyListeners(): void {
    const status = this.getStatus();
    this.listeners.forEach(listener => listener(status));
  }

  /**
   * Clean up event listeners
   */
  public destroy(): void {
    window.removeEventListener('online', this.handleOnlineStatus);
    window.removeEventListener('offline', this.handleOnlineStatus);
  }
}

// Export a singleton instance
export const offlineManager = new OfflineManager();
