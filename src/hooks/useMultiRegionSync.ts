
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Simulated regions
export type DataRegion = 'us-east' | 'us-west' | 'eu-central' | 'ap-south' | 'sa-east';

interface RegionStatus {
  region: DataRegion;
  status: 'online' | 'syncing' | 'offline';
  latency: number;
  lastSync: Date | null;
}

interface MultiRegionSyncOptions {
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

/**
 * Hook to handle multi-region database replication simulation
 * For the wedding application to ensure data availability globally
 */
export function useMultiRegionSync({
  enabled = true,
  primaryRegion = 'us-east',
  syncRegions = ['eu-central', 'ap-south'],
  statusInterval = 30000,
  onSync
}: MultiRegionSyncOptions = {}) {
  const [regionStatus, setRegionStatus] = useState<RegionStatus[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [primaryRegionStatus, setPrimaryRegionStatus] = useState<'online' | 'degraded' | 'offline'>('online');
  const { toast } = useToast();
  
  // Initialize region status
  useEffect(() => {
    if (!enabled) return;
    
    const allRegions = [primaryRegion, ...syncRegions];
    const initialStatus: RegionStatus[] = allRegions.map(region => ({
      region,
      status: 'online',
      latency: Math.floor(Math.random() * 100) + 50, // Random latency between 50-150ms
      lastSync: region === primaryRegion ? new Date() : null
    }));
    
    setRegionStatus(initialStatus);
    
    // Periodically update region status
    const statusInterval = setInterval(() => {
      setRegionStatus(prev => prev.map(region => ({
        ...region,
        latency: Math.floor(Math.random() * 100) + 50
      })));
    }, 60000);
    
    return () => clearInterval(statusInterval);
  }, [enabled, primaryRegion, syncRegions]);
  
  // Simulate data sync process
  const syncRegion = async (region: DataRegion) => {
    if (region === primaryRegion) return;
    
    try {
      setIsSyncing(true);
      setSyncProgress(0);
      
      // Update region status to syncing
      setRegionStatus(prev => 
        prev.map(r => 
          r.region === region 
            ? { ...r, status: 'syncing' } 
            : r
        )
      );
      
      // Simulate sync progress
      const syncInterval = setInterval(() => {
        setSyncProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 10) + 5;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 500);
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
      
      clearInterval(syncInterval);
      setSyncProgress(100);
      
      // Update region status after sync
      setRegionStatus(prev => 
        prev.map(r => 
          r.region === region 
            ? { ...r, status: 'online', lastSync: new Date() } 
            : r
        )
      );
      
      onSync?.(region);
      
      toast({
        title: 'Region Synchronized',
        description: `Data successfully synchronized to ${region} region`,
        variant: 'success'
      });
    } catch (error) {
      console.error(`Error syncing to region ${region}:`, error);
      
      // Update region status to offline in case of error
      setRegionStatus(prev => 
        prev.map(r => 
          r.region === region 
            ? { ...r, status: 'offline' } 
            : r
        )
      );
      
      toast({
        title: 'Sync Failed',
        description: `Failed to synchronize data to ${region} region`,
        variant: 'destructive'
      });
    } finally {
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };
  
  // Force sync all regions
  const syncAllRegions = async () => {
    if (!enabled) return;
    
    try {
      setIsSyncing(true);
      
      // Sync each region sequentially
      for (const region of syncRegions) {
        await syncRegion(region);
      }
      
      toast({
        title: 'All Regions Synchronized',
        description: 'Data successfully synchronized to all regions',
        variant: 'success'
      });
    } finally {
      setIsSyncing(false);
    }
  };
  
  // Handle potential region failover
  const failoverToBestRegion = (): DataRegion => {
    // Find best available region based on status and latency
    const availableRegions = regionStatus.filter(r => r.status === 'online');
    
    if (availableRegions.length === 0) {
      toast({
        title: 'No Available Regions',
        description: 'All regions are currently offline. Please try again later.',
        variant: 'destructive'
      });
      return primaryRegion;
    }
    
    // Sort by latency (lowest first)
    availableRegions.sort((a, b) => a.latency - b.latency);
    
    // If primary is online, use it; otherwise use the next best region
    const primaryOnline = availableRegions.find(r => r.region === primaryRegion);
    const bestRegion = primaryOnline ? primaryRegion : availableRegions[0].region;
    
    if (bestRegion !== primaryRegion) {
      toast({
        title: 'Region Failover',
        description: `Primary region is unavailable. Using ${bestRegion} instead.`,
        variant: 'warning'
      });
      
      setPrimaryRegionStatus('degraded');
    }
    
    return bestRegion;
  };
  
  // Simulate a region outage
  const simulateRegionOutage = (region: DataRegion) => {
    setRegionStatus(prev => 
      prev.map(r => 
        r.region === region 
          ? { ...r, status: 'offline' } 
          : r
      )
    );
    
    if (region === primaryRegion) {
      setPrimaryRegionStatus('offline');
      failoverToBestRegion();
    }
    
    toast({
      title: 'Region Outage',
      description: `${region} region is currently experiencing issues`,
      variant: 'destructive'
    });
  };
  
  // Recover a region from outage
  const recoverRegion = (region: DataRegion) => {
    setRegionStatus(prev => 
      prev.map(r => 
        r.region === region 
          ? { ...r, status: 'online', latency: Math.floor(Math.random() * 100) + 50 } 
          : r
      )
    );
    
    if (region === primaryRegion) {
      setPrimaryRegionStatus('online');
    }
    
    toast({
      title: 'Region Recovered',
      description: `${region} region is back online`,
      variant: 'success'
    });
    
    // Auto-sync recovered region
    syncRegion(region);
  };
  
  return {
    regionStatus,
    isSyncing,
    syncProgress,
    primaryRegionStatus,
    syncRegion,
    syncAllRegions,
    simulateRegionOutage,
    recoverRegion,
    failoverToBestRegion,
    enabled
  };
}
