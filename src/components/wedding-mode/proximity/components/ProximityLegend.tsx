
import React from 'react';
import { cn } from '@/lib/utils';

interface ProximityStyle {
  color: string;
  position: { x: number; y: number };
  ring: string;
  animPulse: boolean;
}

interface ProximityLegendProps {
  proximityStyles: Record<string, ProximityStyle>;
}

export function ProximityLegend({ proximityStyles }: ProximityLegendProps) {
  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
      {Object.entries(proximityStyles).map(([key, style]) => (
        <div key={key} className="flex items-center text-sm">
          <div className={cn("w-3 h-3 rounded-full mr-2", style.color.replace('text-', 'bg-'))} />
          <span className="capitalize">{key}</span>
        </div>
      ))}
    </div>
  );
}
