
import React from 'react';
import { motion } from 'framer-motion';
import { UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FamilyMember } from '../hooks/useFamilyProximity';
import { ProximityRing } from './ProximityRing';
import { FamilyMemberMarker } from './FamilyMemberMarker';
import { LocateButton } from './LocateButton';

interface ProximityVisualizationProps {
  members: FamilyMember[];
  themeAccent: string;
  themeSecondary: string;
  proximityStyles: Record<string, any>;
}

export function ProximityVisualization({ 
  members, 
  themeAccent,
  themeSecondary,
  proximityStyles 
}: ProximityVisualizationProps) {
  return (
    <div className="relative overflow-hidden h-[400px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Proximity Rings */}
        {[1, 2, 3].map((ring) => (
          <ProximityRing 
            key={ring} 
            ringSize={ring} 
            ringClass={themeSecondary} 
            delay={ring * 0.5} 
          />
        ))}
        
        {/* Center user */}
        <motion.div 
          className="z-10 rounded-full bg-white shadow-md w-16 h-16 flex items-center justify-center border-2 border-gray-200"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <UserRound size={30} className={themeAccent} />
        </motion.div>
        
        {/* Family members */}
        {members.map((member) => {
          const style = proximityStyles[member.proximity];
          
          return (
            <FamilyMemberMarker
              key={member.id}
              memberId={member.id}
              memberName={member.name}
              style={style}
            />
          );
        })}
      </div>
      
      <LocateButton themeAccent={themeAccent} />
    </div>
  );
}
