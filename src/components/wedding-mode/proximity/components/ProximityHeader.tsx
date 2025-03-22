
import React from 'react';
import { Map } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProximityHeaderProps {
  themeAccent: string;
}

export function ProximityHeader({ themeAccent }: ProximityHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <Map size={40} className={cn("mx-auto mb-2", themeAccent)} />
      <h2 className="text-3xl font-heading font-bold">Family Radar</h2>
      <p className="text-gray-600 dark:text-gray-400">
        See which family members are nearby at the wedding venue
      </p>
    </div>
  );
}
