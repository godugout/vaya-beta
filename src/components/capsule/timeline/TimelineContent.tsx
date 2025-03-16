
import React from 'react';
import { MemoryCapsule } from '../types/capsuleTypes';
import { EmptyTimelineState } from './EmptyTimelineState';
import { CapsuleTimelineItem } from './CapsuleTimelineItem';

interface TimelineContentProps {
  yearFilteredCapsules: MemoryCapsule[];
  timeView: "upcoming" | "past" | "all";
  currentYear: number;
  onCreateCapsule?: () => void;
  onViewCapsule?: (id: string) => void;
}

export const TimelineContent = ({
  yearFilteredCapsules,
  timeView,
  currentYear,
  onCreateCapsule,
  onViewCapsule
}: TimelineContentProps) => {
  return (
    <div className="mt-6 relative border-l-2 border-dashed border-gray-300 dark:border-gray-700 pl-6 ml-6">
      {yearFilteredCapsules.length === 0 ? (
        <EmptyTimelineState 
          timeView={timeView} 
          currentYear={currentYear} 
          onCreateCapsule={onCreateCapsule} 
        />
      ) : (
        <div className="space-y-10">
          {yearFilteredCapsules.map((capsule) => (
            <CapsuleTimelineItem 
              key={capsule.id} 
              capsule={capsule} 
              onViewCapsule={onViewCapsule} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
