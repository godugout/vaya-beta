
import React from 'react';
import { cn } from '@/lib/utils';

interface ProximityLegendItemProps {
  label: string;
  colorClass: string;
}

export function ProximityLegendItem({ label, colorClass }: ProximityLegendItemProps) {
  return (
    <div className="flex items-center text-sm">
      <div className={cn("w-3 h-3 rounded-full mr-2", colorClass.replace('text-', 'bg-'))} />
      <span className="capitalize">{label}</span>
    </div>
  );
}
