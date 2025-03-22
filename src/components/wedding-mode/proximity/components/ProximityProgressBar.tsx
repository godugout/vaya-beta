
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProximityProgressBarProps {
  knownFamilyMembers: Record<string, string>;
  nearbyDevices: any[];
}

export function ProximityProgressBar({ knownFamilyMembers, nearbyDevices }: ProximityProgressBarProps) {
  const detectedMemberCount = Object.keys(knownFamilyMembers).filter(id => 
    nearbyDevices.some(device => device.id === id)
  ).length;
  
  const totalMemberCount = Object.keys(knownFamilyMembers).length;
  
  const progressPercentage = totalMemberCount > 0 ? 
    Math.round((detectedMemberCount / totalMemberCount) * 100) : 0;
  
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Family Members In Range</span>
        <span>{detectedMemberCount} / {totalMemberCount}</span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-2"
      />
    </div>
  );
}
