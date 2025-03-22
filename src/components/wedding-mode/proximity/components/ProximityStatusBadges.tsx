
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BatteryMedium } from 'lucide-react';

interface ProximityStatusBadgesProps {
  batteryEfficient: boolean;
  isConnected: boolean;
}

export function ProximityStatusBadges({ batteryEfficient, isConnected }: ProximityStatusBadgesProps) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant={batteryEfficient ? "outline" : "default"} className="flex items-center gap-1">
        <BatteryMedium className="h-3 w-3" />
        {batteryEfficient ? "Power Saver" : "Normal"}
      </Badge>
      
      <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center gap-1">
        {isConnected ? "Online" : "Offline"}
      </Badge>
    </div>
  );
}
