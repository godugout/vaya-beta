
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { DataRegion, RegionStatus, MultiRegionSyncOptions } from './multiRegionSync/types';
import { generateInitialRegionStatus, findBestAvailableRegion } from './multiRegionSync/regionUtils';
import { useSyncService } from './multiRegionSync/syncService';
import { useRegionSimulation } from './multiRegionSync/regionSimulation';

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
  const { toast } = useToast();
  
  // Import sync service
  const { 
    isSyncing, 
    syncProgress, 
    syncRegion: syncSingleRegion, 
    syncAllRegions: syncAllRegionsService 
  } = useSyncService();
  
  // Initialize region status
  useEffect(() => {
    if (!enabled) return;
    
    const allRegions = [primaryRegion, ...syncRegions];
    const initialStatus = generateInitialRegionStatus(primaryRegion, allRegions);
    
    setRegionStatus(initialStatus);
    
    // Periodically update region status
    const statusUpdateInterval = setInterval(() => {
      setRegionStatus(prev => prev.map(region => ({
        ...region,
        latency: Math.floor(Math.random() * 100) + 50
      })));
    }, statusInterval);
    
    return () => clearInterval(statusUpdateInterval);
  }, [enabled, primaryRegion, syncRegions, statusInterval]);
  
  // Wrap the syncRegion function to be used in this hook
  const syncRegion = useCallback(async (region: DataRegion) => {
    await syncSingleRegion(region, primaryRegion, setRegionStatus, onSync);
  }, [syncSingleRegion, primaryRegion, onSync]);
  
  // Wrap the syncAllRegions function
  const syncAllRegions = useCallback(async () => {
    await syncAllRegionsService(syncRegions, primaryRegion, setRegionStatus, onSync, enabled);
  }, [syncAllRegionsService, syncRegions, primaryRegion, onSync, enabled]);
  
  // Handle potential region failover
  const failoverToBestRegion = useCallback((): DataRegion => {
    return findBestAvailableRegion(primaryRegion, regionStatus, toast);
  }, [primaryRegion, regionStatus, toast]);
  
  // Import region simulation functions
  const { 
    primaryRegionStatus, 
    setPrimaryRegionStatus, 
    simulateRegionOutage: simulateOutage, 
    recoverRegion: recoverOutage 
  } = useRegionSimulation(setRegionStatus, syncRegion);
  
  // Wrap simulation functions with proper parameters
  const simulateRegionOutage = useCallback((region: DataRegion) => {
    simulateOutage(region, primaryRegion, failoverToBestRegion);
  }, [simulateOutage, primaryRegion, failoverToBestRegion]);
  
  const recoverRegion = useCallback((region: DataRegion) => {
    recoverOutage(region, primaryRegion);
  }, [recoverOutage, primaryRegion]);

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

// Re-export types
export type { DataRegion, RegionStatus, MultiRegionSyncOptions } from './multiRegionSync/types';
