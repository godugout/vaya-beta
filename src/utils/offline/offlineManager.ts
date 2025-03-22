
/**
 * Offline Operations Manager
 * Handles the caching, queuing, and syncing of operations when offline
 */
export class OfflineManager {
  private static instance: OfflineManager;
  private isOnline: boolean = navigator.onLine;
  private syncQueue: Array<{
    operation: string;
    data: any;
    timestamp: number;
    priority: number;
  }> = [];
  private listeners: Map<string, Function[]> = new Map();

  private constructor() {
    // Set up online/offline event listeners
    window.addEventListener('online', this.handleOnlineStatusChange.bind(this));
    window.addEventListener('offline', this.handleOnlineStatusChange.bind(this));
    
    // Load any pending operations from storage
    this.loadPendingOperations();
  }

  /**
   * Get the singleton instance
   */
  public static getInstance(): OfflineManager {
    if (!OfflineManager.instance) {
      OfflineManager.instance = new OfflineManager();
    }
    return OfflineManager.instance;
  }

  /**
   * Check if device is currently online
   */
  public isNetworkOnline(): boolean {
    return this.isOnline;
  }

  /**
   * Queue an operation to be performed when online
   */
  public queueOperation(operation: string, data: any, priority: number = 1): void {
    const queueItem = {
      operation,
      data,
      timestamp: Date.now(),
      priority
    };
    
    this.syncQueue.push(queueItem);
    this.syncQueue.sort((a, b) => b.priority - a.priority);
    this.savePendingOperations();
    
    // Attempt immediate sync if online
    if (this.isOnline) {
      this.processQueue();
    }
    
    // Notify listeners
    this.notifyListeners('queue-updated', this.syncQueue);
  }

  /**
   * Process the queue of pending operations
   */
  public async processQueue(): Promise<void> {
    if (!this.isOnline || this.syncQueue.length === 0) return;
    
    const processedItems = [];
    
    // Process each operation
    for (const item of this.syncQueue) {
      try {
        // This is where we'll implement the actual processing logic
        // based on the operation type
        await this.performOperation(item);
        processedItems.push(item);
      } catch (error) {
        console.error('Error processing operation:', error);
        // Leave failed items in the queue for retry
        break;
      }
    }
    
    // Remove processed items
    this.syncQueue = this.syncQueue.filter(item => !processedItems.includes(item));
    this.savePendingOperations();
    
    // Notify listeners
    this.notifyListeners('queue-updated', this.syncQueue);
  }

  /**
   * Register a listener for offline manager events
   */
  public addEventListener(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  /**
   * Remove a listener
   */
  public removeEventListener(event: string, callback: Function): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  /**
   * Handle online/offline status changes
   */
  private handleOnlineStatusChange(event: Event): void {
    this.isOnline = navigator.onLine;
    this.notifyListeners('connectivity-changed', this.isOnline);
    
    if (this.isOnline) {
      // Process pending operations when we come back online
      this.processQueue();
    }
  }

  /**
   * Perform a specific operation
   */
  private async performOperation(item: any): Promise<void> {
    // This will be implemented based on operation types
    // For now, we're just logging
    console.log(`Performing operation: ${item.operation}`, item.data);
    
    // The actual implementation will handle different operation types
    // such as database writes, uploads, etc.
  }

  /**
   * Save pending operations to local storage
   */
  private savePendingOperations(): void {
    localStorage.setItem('vaya_offline_queue', JSON.stringify(this.syncQueue));
  }

  /**
   * Load pending operations from local storage
   */
  private loadPendingOperations(): void {
    try {
      const savedQueue = localStorage.getItem('vaya_offline_queue');
      if (savedQueue) {
        this.syncQueue = JSON.parse(savedQueue);
      }
    } catch (error) {
      console.error('Error loading pending operations:', error);
    }
  }

  /**
   * Notify all listeners for a specific event
   */
  private notifyListeners(event: string, data: any): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }
}

// Export singleton instance
export const offlineManager = OfflineManager.getInstance();
