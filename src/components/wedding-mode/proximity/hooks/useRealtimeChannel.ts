
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useRealtimeChannel(familyId: string, realTimeUpdates: boolean) {
  const [isConnected, setIsConnected] = useState(false);
  const [channel, setChannel] = useState<any>(null);
  
  // Set up realtime connection
  useEffect(() => {
    if (!realTimeUpdates) return;
    
    const newChannel = supabase.channel(`proximity:${familyId}`, {
      config: {
        broadcast: { self: true },
      }
    });
    
    newChannel
      .on('broadcast', { event: 'proximity:device_detected' }, (payload) => {
        console.log('Received proximity update:', payload);
        // Process incoming proximity data from other family members
        // This would update a shared state of who's nearby
      })
      .on('presence', { event: 'sync' }, () => {
        // Update who's online
        const presenceState = newChannel.presenceState();
        console.log('Presence state:', presenceState);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          
          // Track the user's presence in the channel
          await newChannel.track({
            user_id: (await supabase.auth.getUser()).data.user?.id || 'anonymous',
            online_at: new Date().toISOString(),
            device_info: {
              platform: navigator.platform,
              userAgent: navigator.userAgent
            }
          });
        } else {
          setIsConnected(false);
        }
      });
    
    setChannel(newChannel);
    
    return () => {
      supabase.removeChannel(newChannel);
    };
  }, [familyId, realTimeUpdates]);
  
  return { isConnected, channel };
}
