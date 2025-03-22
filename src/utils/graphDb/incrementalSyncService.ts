
import { supabase } from '@/integrations/supabase/client';

interface SyncRecord {
  table: string;
  id: string;
  operation: 'insert' | 'update' | 'delete';
  timestamp: number;
  payload?: any;
  syncStatus: 'pending' | 'completed' | 'failed';
  retries: number;
}

/**
 * Incremental Synchronization Service
 * Implements efficient data transfer with change tracking and syncing
 */
export class IncrementalSyncService {
  private readonly LOCAL_SYNC_QUEUE = 'vaya_sync_queue';
  private syncQueue: SyncRecord[] = [];
  private isInitialized = false;
  private isSyncing = false;
  private readonly MAX_RETRIES = 3;
  private readonly SYNC_INTERVAL = 60000; // 1 minute
  private syncIntervalId: number | null = null;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize the sync service and load the pending sync queue
   */
  private async initialize() {
    if (this.isInitialized) return;

    try {
      // Load pending sync records from local storage
      const storedQueue = localStorage.getItem(this.LOCAL_SYNC_QUEUE);
      if (storedQueue) {
        this.syncQueue = JSON.parse(storedQueue);
      }

      // Start periodic sync
      this.syncIntervalId = window.setInterval(() => {
        this.processSyncQueue();
      }, this.SYNC_INTERVAL);

      this.isInitialized = true;
      console.log('Incremental sync service initialized');
      
      // Initial sync attempt
      this.processSyncQueue();
    } catch (error) {
      console.error('Failed to initialize sync service:', error);
    }
  }

  /**
   * Add a record to the sync queue
   */
  queueSync(table: string, id: string, operation: 'insert' | 'update' | 'delete', payload?: any): void {
    // Create a new sync record
    const syncRecord: SyncRecord = {
      table,
      id,
      operation,
      timestamp: Date.now(),
      payload,
      syncStatus: 'pending',
      retries: 0
    };

    // Add to queue and update local storage
    this.syncQueue.push(syncRecord);
    this.persistSyncQueue();
    
    // Attempt immediate sync if not already syncing
    if (!this.isSyncing) {
      this.processSyncQueue();
    }
  }

  /**
   * Process the sync queue
   */
  private async processSyncQueue(): Promise<void> {
    if (this.isSyncing || this.syncQueue.length === 0) return;

    this.isSyncing = true;
    console.log(`Processing sync queue: ${this.syncQueue.length} items`);

    try {
      const pendingRecords = this.syncQueue.filter(record => 
        record.syncStatus === 'pending' && record.retries < this.MAX_RETRIES
      );

      // Process each record
      for (const record of pendingRecords) {
        try {
          await this.syncRecord(record);
          record.syncStatus = 'completed';
        } catch (error) {
          console.error(`Sync failed for ${record.table}:${record.id}`, error);
          record.syncStatus = 'failed';
          record.retries++;
        }
      }

      // Clean up completed records and persist updated queue
      this.syncQueue = this.syncQueue.filter(record => 
        record.syncStatus !== 'completed' && 
        !(record.syncStatus === 'failed' && record.retries >= this.MAX_RETRIES)
      );
      this.persistSyncQueue();
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Sync a single record to the server
   */
  private async syncRecord(record: SyncRecord): Promise<void> {
    const { table, id, operation, payload } = record;

    switch (operation) {
      case 'insert':
      case 'update':
        await supabase
          .from(table)
          .upsert({ id, ...payload });
        break;
      
      case 'delete':
        await supabase
          .from(table)
          .delete()
          .eq('id', id);
        break;
    }
  }

  /**
   * Persist sync queue to local storage
   */
  private persistSyncQueue(): void {
    localStorage.setItem(this.LOCAL_SYNC_QUEUE, JSON.stringify(this.syncQueue));
  }

  /**
   * Clean up resources when component unmounts
   */
  destroy(): void {
    if (this.syncIntervalId !== null) {
      window.clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }
  }

  /**
   * Force an immediate sync attempt
   */
  forceSync(): Promise<void> {
    return this.processSyncQueue();
  }

  /**
   * Get sync queue statistics
   */
  getSyncStats(): { pending: number, completed: number, failed: number, total: number } {
    const pending = this.syncQueue.filter(record => record.syncStatus === 'pending').length;
    const failed = this.syncQueue.filter(record => record.syncStatus === 'failed').length;
    return {
      pending,
      completed: 0, // We remove completed items from the queue
      failed,
      total: this.syncQueue.length
    };
  }
}

// Export singleton instance
export const incrementalSync = new IncrementalSyncService();
