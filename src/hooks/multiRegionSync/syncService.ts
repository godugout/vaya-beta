
import { useState } from 'react';
import { DataRegion, RegionStatus } from './types';
import { useToast } from '@/components/ui/use-toast';

/**
 * Service for handling region synchronization
 */
export const useSyncService = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const { toast } = useToast();

  /**
   * Synchronize data to a specific region
   */
  const syncRegion = async (
    region: DataRegion,
    primaryRegion: DataRegion,
    updateRegionStatus: (updater: (prev: RegionStatus[]) => RegionStatus[]) => void,
    onSync?: (region: DataRegion) => void
  ) => {
    if (region === primaryRegion) return;
    
    try {
      setIsSyncing(true);
      setSyncProgress(0);
      
      // Update region status to syncing
      updateRegionStatus(prev => 
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
      updateRegionStatus(prev => 
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
      });
    } catch (error) {
      console.error(`Error syncing to region ${region}:`, error);
      
      // Update region status to offline in case of error
      updateRegionStatus(prev => 
        prev.map(r => 
          r.region === region 
            ? { ...r, status: 'offline' } 
            : r
        )
      );
      
      toast({
        title: 'Sync Failed',
        description: `Failed to synchronize data to ${region} region`,
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  /**
   * Synchronize data to all regions
   */
  const syncAllRegions = async (
    syncRegions: DataRegion[],
    primaryRegion: DataRegion,
    updateRegionStatus: (updater: (prev: RegionStatus[]) => RegionStatus[]) => void,
    onSync?: (region: DataRegion) => void,
    enabled: boolean = true
  ) => {
    if (!enabled) return;
    
    try {
      setIsSyncing(true);
      
      // Sync each region sequentially
      for (const region of syncRegions) {
        await syncRegion(region, primaryRegion, updateRegionStatus, onSync);
      }
      
      toast({
        title: 'All Regions Synchronized',
        description: 'Data successfully synchronized to all regions',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    isSyncing,
    syncProgress,
    syncRegion,
    syncAllRegions
  };
};
