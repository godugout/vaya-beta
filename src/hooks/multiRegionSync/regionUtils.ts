
import { DataRegion, RegionStatus } from './types';
import { useToast } from '@/components/ui/use-toast';

/**
 * Utility functions for multi-region sync
 */

/**
 * Generate initial region status for a list of regions
 */
export const generateInitialRegionStatus = (
  primaryRegion: DataRegion,
  allRegions: DataRegion[]
): RegionStatus[] => {
  return allRegions.map(region => ({
    region,
    status: 'online',
    latency: Math.floor(Math.random() * 100) + 50, // Random latency between 50-150ms
    lastSync: region === primaryRegion ? new Date() : null
  }));
};

/**
 * Find the best available region to failover to
 */
export const findBestAvailableRegion = (
  primaryRegion: DataRegion,
  regionStatus: RegionStatus[],
  toast: ReturnType<typeof useToast>['toast']
): DataRegion => {
  // Find best available region based on status and latency
  const availableRegions = regionStatus.filter(r => r.status === 'online');
  
  if (availableRegions.length === 0) {
    toast({
      title: 'No Available Regions',
      description: 'All regions are currently offline. Please try again later.',
      variant: "destructive"
    });
    return primaryRegion;
  }
  
  // Sort by latency (lowest first)
  availableRegions.sort((a, b) => a.latency - b.latency);
  
  // If primary is online, use it; otherwise use the next best region
  const primaryOnline = availableRegions.find(r => r.region === primaryRegion);
  return primaryOnline ? primaryRegion : availableRegions[0].region;
};
