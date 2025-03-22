
import { useState } from 'react';
import { DataRegion, RegionStatus } from './types';
import { useToast } from '@/components/ui/use-toast';

/**
 * Functions for simulating region outages and recovery
 */
export const useRegionSimulation = (
  updateRegionStatus: (updater: (prev: RegionStatus[]) => RegionStatus[]) => void,
  syncRegion: (region: DataRegion) => Promise<void>
) => {
  const [primaryRegionStatus, setPrimaryRegionStatus] = useState<'online' | 'degraded' | 'offline'>('online');
  const { toast } = useToast();
  
  /**
   * Simulate a region outage
   */
  const simulateRegionOutage = (
    region: DataRegion,
    primaryRegion: DataRegion,
    failoverCallback: () => DataRegion
  ) => {
    updateRegionStatus(prev => 
      prev.map(r => 
        r.region === region 
          ? { ...r, status: 'offline' } 
          : r
      )
    );
    
    if (region === primaryRegion) {
      setPrimaryRegionStatus('offline');
      failoverCallback();
    }
    
    toast({
      title: 'Region Outage',
      description: `${region} region is currently experiencing issues`,
      variant: "destructive"
    });
  };
  
  /**
   * Recover a region from outage
   */
  const recoverRegion = async (region: DataRegion, primaryRegion: DataRegion) => {
    updateRegionStatus(prev => 
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
    });
    
    // Auto-sync recovered region
    await syncRegion(region);
  };

  return {
    primaryRegionStatus,
    setPrimaryRegionStatus,
    simulateRegionOutage,
    recoverRegion
  };
};
