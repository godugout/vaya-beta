import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ProximityDevice } from '@/hooks/proximityDetection/types';

export function useProximityData(familyId: string, isConnected: boolean, channel: any) {
  const [knownFamilyMembers, setKnownFamilyMembers] = useState<Record<string, string>>({});
  
  // Calculate proximity levels
  const getProximityLevel = (device: ProximityDevice) => {
    if (!device.rssi && !device.distance) return 'unknown';
    
    if (device.distance) {
      if (device.distance < 1) return 'nearby'; // < 1m
      if (device.distance < 5) return 'close'; // 1-5m
      return 'distant'; // > 5m
    }
    
    if (device.rssi) {
      if (device.rssi > -50) return 'nearby';
      if (device.rssi > -70) return 'close';
      return 'distant';
    }
    
    return 'unknown';
  };
  
  // Map devices to display names
  const getDeviceDisplayName = (device: ProximityDevice) => {
    // Check if this device is associated with a family member
    if (device.id in knownFamilyMembers) {
      return knownFamilyMembers[device.id];
    }
    
    // Otherwise, use the device name or a fallback
    return device.name || `Unknown ${device.type} device`;
  };
  
  // Broadcast device detection
  const broadcastDetection = (device: ProximityDevice) => {
    // If we have a real-time connection, broadcast this detection
    if (isConnected && channel) {
      channel.send({
        type: 'broadcast',
        event: 'proximity:device_detected',
        payload: {
          familyId,
          device,
          timestamp: new Date().toISOString()
        }
      });
    }
  };
  
  // Load known family members to match with detected devices
  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('family_members')
          .select('id, full_name, device_id')
          .eq('family_id', familyId)
          .not('device_id', 'is', null);
        
        if (error) throw error;
        
        // Create a mapping of device IDs to family member names
        const memberMap: Record<string, string> = {};
        data?.forEach(member => {
          if (member.device_id) {
            memberMap[member.device_id] = member.full_name;
          }
        });
        
        setKnownFamilyMembers(memberMap);
      } catch (error) {
        console.error('Failed to load family members:', error);
      }
    };
    
    fetchFamilyMembers();
  }, [familyId]);
  
  return {
    knownFamilyMembers,
    getProximityLevel,
    getDeviceDisplayName,
    broadcastDetection
  };
}
