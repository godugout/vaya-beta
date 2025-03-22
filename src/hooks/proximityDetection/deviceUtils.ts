
import { useCallback } from 'react';
import { ProximityDevice, DeviceHistory } from './types';

export const useDeviceFilters = (
  crowdedEnvironment: boolean,
  deviceHistory: Record<string, DeviceHistory>,
  deviceFilters: Partial<ProximityDevice>[]
) => {
  // Filter devices with potential interference in crowded environments
  const filterDeviceInCrowdedEnvironment = useCallback((device: ProximityDevice) => {
    if (!crowdedEnvironment) return true;
    
    // In crowded environments, apply more strict filtering
    const deviceStats = deviceHistory[device.id];
    
    if (!deviceStats) return true; // First appearance
    
    // Device must have been seen multiple times with consistent signal strength
    if (deviceStats.appearances < 3) return false;
    
    // Check for signal stability
    const recentRssi = deviceStats.lastRssi.slice(-3);
    const avgRssi = recentRssi.reduce((a, b) => a + b, 0) / recentRssi.length;
    const variance = recentRssi.reduce((a, b) => a + Math.pow(b - avgRssi, 2), 0) / recentRssi.length;
    
    // High variance indicates potential interference or unstable signal
    return variance < 25; // Empirical threshold for stable signals
  }, [crowdedEnvironment, deviceHistory]);

  // Apply user-defined filters
  const matchesFilters = useCallback((device: ProximityDevice) => {
    if (deviceFilters.length === 0) return true;
    
    return deviceFilters.some(filter => {
      // Match all specified filter properties
      return Object.entries(filter).every(([key, value]) => {
        return device[key as keyof ProximityDevice] === value;
      });
    });
  }, [deviceFilters]);

  // Sort devices by signal strength/proximity
  const sortDevicesByProximity = (devices: ProximityDevice[]) => {
    return [...devices].sort((a, b) => {
      // First by distance if available
      if (a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance;
      }
      // Then by RSSI (higher RSSI = stronger signal = closer)
      if (a.rssi !== undefined && b.rssi !== undefined) {
        return b.rssi - a.rssi;
      }
      // Finally by last seen
      return b.lastSeen.getTime() - a.lastSeen.getTime();
    });
  };

  return {
    filterDeviceInCrowdedEnvironment,
    matchesFilters,
    sortDevicesByProximity
  };
};

// Calculate how long devices should remain in the nearby list based on settings
export const getDeviceExpirationTime = (batteryEfficient: boolean) => {
  return batteryEfficient ? 60000 : 30000; // 30-60 seconds based on battery efficiency setting
};
