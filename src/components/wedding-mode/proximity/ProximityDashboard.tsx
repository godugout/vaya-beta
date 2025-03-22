
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { Button } from '@/components/ui/button';
import { FeedbackMessage } from '@/components/feedback/FeedbackMessage';
import { useProximityDetection } from '@/hooks/useProximityDetection';
import { ProximityLegend } from './components/ProximityLegend';
import { ProximityStatusBadges } from './components/ProximityStatusBadges';
import { ProximityProgressBar } from './components/ProximityProgressBar';
import { RadarView } from './components/RadarView';
import { useProximityTheme } from './hooks/useProximityTheme';
import { useProximityStyles } from './hooks/useProximityStyles';
import { useProximityData } from './hooks/useProximityData';
import { useRealtimeChannel } from './hooks/useRealtimeChannel';

interface ProximityDashboardProps {
  familyId: string;
  title?: string;
  batteryEfficient?: boolean;
  optimizeForCrowds?: boolean;
}

export function ProximityDashboard({ 
  familyId, 
  title = "Family Radar", 
  batteryEfficient = false, 
  optimizeForCrowds = true 
}: ProximityDashboardProps) {
  const [realTimeUpdates, setRealTimeUpdates] = useState<boolean>(true);
  
  // Get theme styles based on wedding theme
  const currentTheme = useProximityTheme();
  
  // Get proximity styles
  const proximityStyles = useProximityStyles();
  
  // Set up Supabase Realtime channel
  const { isConnected, channel } = useRealtimeChannel(familyId, realTimeUpdates);
  
  // Get proximity data and helper functions
  const { 
    knownFamilyMembers, 
    getProximityLevel, 
    getDeviceDisplayName,
    broadcastDetection
  } = useProximityData(familyId, isConnected, channel);
  
  // Initialize proximity detection
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
      
      // Broadcast this detection to other devices
      broadcastDetection(device);
    }
  });
  
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
            <ProximityStatusBadges 
              batteryEfficient={batteryEfficient} 
              isConnected={isConnected} 
            />
          </div>
        </CardHeader>
        
        <CardContent>
          <RadarView 
            themePrimary={currentTheme.primary}
            themeSecondary={currentTheme.secondary}
            themeAccent={currentTheme.accent}
            nearbyDevices={nearbyDevices}
            proximityStyles={proximityStyles}
            getProximityLevel={getProximityLevel}
            getDeviceDisplayName={getDeviceDisplayName}
            isScanning={isScanning}
            startScan={startScan}
          />
          
          <ProximityLegend proximityStyles={proximityStyles} />
          
          <ProximityProgressBar 
            knownFamilyMembers={knownFamilyMembers}
            nearbyDevices={nearbyDevices}
          />
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
