
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProximityDevice } from '@/hooks/proximityDetection/types';
import { RadarRings } from './RadarRings';
import { UserPosition } from './UserPosition';
import { ProximityDeviceMarker } from './ProximityDeviceMarker';

interface RadarViewProps {
  themePrimary: string;
  themeSecondary: string;
  themeAccent: string;
  nearbyDevices: ProximityDevice[];
  proximityStyles: Record<string, any>;
  getProximityLevel: (device: ProximityDevice) => string;
  getDeviceDisplayName: (device: ProximityDevice) => string;
  isScanning: boolean;
  startScan: () => void;
}

export function RadarView({
  themePrimary,
  themeSecondary,
  themeAccent,
  nearbyDevices,
  proximityStyles,
  getProximityLevel,
  getDeviceDisplayName,
  isScanning,
  startScan
}: RadarViewProps) {
  return (
    <div className={cn("relative overflow-hidden h-[350px]", themePrimary)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <RadarRings themeSecondary={themeSecondary} />
        
        {/* Center user */}
        <UserPosition themeAccent={themeAccent} />
        
        {/* Nearby devices */}
        {nearbyDevices.map((device) => {
          const proximityLevel = getProximityLevel(device);
          const style = proximityStyles[proximityLevel];
          const deviceName = getDeviceDisplayName(device);
          
          return (
            <ProximityDeviceMarker 
              key={device.id}
              device={device}
              displayName={deviceName}
              style={style}
            />
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
  );
}
