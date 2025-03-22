
/**
 * Types for multi-region synchronization
 */

// Simulated regions
export type DataRegion = 'us-east' | 'us-west' | 'eu-central' | 'ap-south' | 'sa-east';

export interface RegionStatus {
  region: DataRegion;
  status: 'online' | 'syncing' | 'offline';
  latency: number;
  lastSync: Date | null;
}

export interface MultiRegionSyncOptions {
  /**
   * Enable multi-region synchronization
   */
  enabled?: boolean;
  
  /**
   * Primary region for data
   */
  primaryRegion?: DataRegion;
  
  /**
   * Array of regions to sync with
   */
  syncRegions?: DataRegion[];
  
  /**
   * How often to check region status (ms)
   */
  statusInterval?: number;
  
  /**
   * Callback when data is synchronized
   */
  onSync?: (region: DataRegion) => void;
}
