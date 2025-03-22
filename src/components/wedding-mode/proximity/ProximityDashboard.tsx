import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { useWeddingMode } from '../WeddingModeProvider';
import { FeedbackMessage } from '@/components/feedback/FeedbackMessage';
import { useProximityDetection, ProximityDevice } from '@/hooks/useProximityDetection';
import { UserRound, Bluetooth, Wifi, MapPin, RefreshCw, BatteryMedium } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface ProximityDashboardProps {
  familyId: string;
  title?: string;
  batteryEfficient?: boolean;
  optimizeForCrowds?: boolean;
}

export function ProximityDashboard({ familyId, title = "Family Radar", batteryEfficient = false, optimizeForCrowds = true }: ProximityDashboardProps) {
  const { theme } = useWeddingMode();
  const [isConnected, setIsConnected] = useState(false);
  const [knownFamilyMembers, setKnownFamilyMembers] = useState<Record<string, string>>({});
  const [realTimeUpdates, setRealTimeUpdates] = useState<boolean>(true);
  
  const { 
    nearbyDevices, 
    isScanning, 
    startScan, 
    permissionGranted 
  } = useProximityDetection({
    enabled: true,
    batteryEfficient,
    crowdedEnvironment: optimizeForCrowds,
    detectionInterval: batteryEfficient ? 8000 : 3000,
    onDeviceDetected: (device) => {
      // Log detection for debugging
      console.log('Device detected:', device);
      
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
    }
  });
  
  // Set up Supabase Realtime channel
  const [channel, setChannel] = useState<any>(null);
  
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
  
  // Theme styles based on wedding theme
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      primary: 'bg-autumn/20',
      secondary: 'ring-autumn/30',
      progressBg: 'bg-autumn'
    },
    modern: {
      accent: 'text-water',
      primary: 'bg-water/20',
      secondary: 'ring-water/30',
      progressBg: 'bg-water'
    },
    rustic: {
      accent: 'text-forest',
      primary: 'bg-forest/20',
      secondary: 'ring-forest/30',
      progressBg: 'bg-forest'
    }
  };
  
  const currentTheme = themeStyles[theme];
  
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
  
  const proximityStyles = {
    nearby: {
      color: 'text-green-500',
      position: { x: 0, y: 0 },
      ring: 'ring-green-500/20',
      animPulse: true
    },
    close: {
      color: 'text-blue-500',
      position: { x: -20, y: 20 },
      ring: 'ring-blue-500/20',
      animPulse: false
    },
    distant: {
      color: 'text-gray-500',
      position: { x: 30, y: -20 },
      ring: 'ring-gray-500/20',
      animPulse: false
    },
    unknown: {
      color: 'text-gray-400',
      position: { x: 40, y: 30 },
      ring: 'ring-gray-400/10',
      animPulse: false
    }
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
  
  return (
    <AnimatedContainer variant="fade" className="max-w-3xl mx-auto p-4">
      {permissionGranted === false && (
        <FeedbackMessage 
          variant="warning"
          title="Permission Required"
          className="mb-4"
        >
          Proximity detection requires permission to use Bluetooth and/or NFC. Please grant access to locate family members.
        </FeedbackMessage>
      )}
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>{title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={batteryEfficient ? "outline" : "default"} className="flex items-center gap-1">
                <BatteryMedium className="h-3 w-3" />
                {batteryEfficient ? "Power Saver" : "Normal"}
              </Badge>
              
              <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center gap-1">
                {isConnected ? "Online" : "Offline"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className={cn("relative overflow-hidden h-[350px]", currentTheme.primary)}>
            <div className="absolute inset-0 flex items-center justify-center">
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className={cn(
                    "rounded-full border border-dashed absolute",
                    currentTheme.secondary
                  )}
                  style={{
                    width: `${ring * 100}px`,
                    height: `${ring * 100}px`,
                  }}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: [0.2, 0.3, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, delay: ring * 0.5 }}
                />
              ))}
              
              {/* Center user */}
              <motion.div 
                className="z-10 rounded-full bg-white shadow-md w-16 h-16 flex items-center justify-center border-2 border-gray-200"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <UserRound size={30} className={currentTheme.accent} />
              </motion.div>
              
              {/* Nearby devices */}
              {nearbyDevices.map((device) => {
                const proximityLevel = getProximityLevel(device);
                const style = proximityStyles[proximityLevel];
                const deviceName = getDeviceDisplayName(device);
                
                // Determine icon based on device type
                let DeviceIcon = UserRound;
                if (device.type === 'bluetooth') DeviceIcon = Bluetooth;
                if (device.type === 'wifi') DeviceIcon = Wifi;
                if (device.type === 'nfc') DeviceIcon = MapPin;
                
                return (
                  <motion.div
                    key={device.id}
                    className={cn(
                      "absolute z-20 rounded-full bg-white shadow-md p-2",
                      "flex items-center justify-center",
                      "border border-gray-200 ring-2",
                      style.ring
                    )}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: style.animPulse ? [1, 1.1, 1] : 1,
                      x: style.position.x * 3, 
                      y: style.position.y * 3
                    }}
                    transition={{ 
                      duration: style.animPulse ? 2 : 0.5, 
                      repeat: style.animPulse ? Infinity : 0,
                      delay: Math.random() * 0.5
                    }}
                  >
                    <div className="relative">
                      <DeviceIcon size={24} className={style.color} />
                      <motion.div 
                        className="absolute -bottom-4 whitespace-nowrap text-xs font-medium"
                        animate={{ opacity: [0, 1] }}
                        transition={{ delay: 0.5 }}
                      >
                        {deviceName}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Scan button */}
            <div className="absolute bottom-4 right-4">
              <Button 
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                onClick={startScan}
                disabled={isScanning}
              >
                <RefreshCw className={cn("h-4 w-4", isScanning && "animate-spin")} />
                {isScanning ? "Scanning..." : "Scan Now"}
              </Button>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(proximityStyles).map(([key, style]) => (
              <div key={key} className="flex items-center text-sm">
                <div className={cn("w-3 h-3 rounded-full mr-2", style.color.replace('text-', 'bg-'))} />
                <span className="capitalize">{key}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Family Members In Range</span>
              <span>{Object.keys(knownFamilyMembers).filter(id => 
                nearbyDevices.some(device => device.id === id)
              ).length} / {Object.keys(knownFamilyMembers).length}</span>
            </div>
            <Progress 
              value={Object.keys(knownFamilyMembers).length > 0 ? 
                Math.round((Object.keys(knownFamilyMembers).filter(id => 
                  nearbyDevices.some(device => device.id === id)
                ).length / Object.keys(knownFamilyMembers).length) * 100) : 0
              } 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setRealTimeUpdates(!realTimeUpdates)}
        >
          {realTimeUpdates ? "Disable" : "Enable"} Real-Time Updates
        </Button>
        
        <Button 
          variant="outline"
          className="w-full"
          onClick={() => startScan()}
        >
          Manual Scan
        </Button>
      </div>
    </AnimatedContainer>
  );
}
