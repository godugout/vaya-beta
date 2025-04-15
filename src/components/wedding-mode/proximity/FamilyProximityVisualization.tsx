
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserRound, Map, Locate } from 'lucide-react';
import { useWeddingMode } from '../WeddingModeProvider';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  lastSeen: Date;
  proximity: 'nearby' | 'close' | 'distant' | 'unknown';
}

interface FamilyProximityVisualizationProps {
  familyMembers?: FamilyMember[];
}

export const FamilyProximityVisualization: React.FC<FamilyProximityVisualizationProps> = ({
  familyMembers = []
}) => {
  const { theme } = useWeddingMode();
  const [members, setMembers] = useState<FamilyMember[]>(familyMembers);
  
  // Mock data if no family members are provided
  useEffect(() => {
    if (familyMembers.length === 0) {
      setMembers([
        { id: '1', name: 'Mom', relationship: 'Parent', lastSeen: new Date(), proximity: 'nearby' },
        { id: '2', name: 'Dad', relationship: 'Parent', lastSeen: new Date(), proximity: 'nearby' },
        { id: '3', name: 'Sister', relationship: 'Sibling', lastSeen: new Date(), proximity: 'close' },
        { id: '4', name: 'Grandma', relationship: 'Grandparent', lastSeen: new Date(), proximity: 'distant' },
        { id: '5', name: 'Uncle Bob', relationship: 'Uncle', lastSeen: new Date(), proximity: 'unknown' },
      ]);
    }
  }, [familyMembers]);
  
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      primary: 'bg-autumn/20',
      secondary: 'ring-autumn/30',
    },
    modern: {
      accent: 'text-water',
      primary: 'bg-water/20',
      secondary: 'ring-water/30',
    },
    rustic: {
      accent: 'text-forest',
      primary: 'bg-forest/20',
      secondary: 'ring-forest/30',
    }
  };
  
  const currentTheme = themeStyles[theme];
  
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
  
  return (
    <div className="p-6">
      <AnimatedContainer variant="fade" className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <Map size={40} className={cn("mx-auto mb-2", currentTheme.accent)} />
          <h2 className="text-3xl font-heading font-bold">Family Radar</h2>
          <p className="text-gray-600 dark:text-gray-400">
            See which family members are nearby at the wedding venue
          </p>
        </div>
        
        <Card className={cn("p-6 relative overflow-hidden h-[400px]", currentTheme.primary)}>
          <div className="absolute inset-0 flex items-center justify-center">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className={cn(
                  "rounded-full border border-dashed absolute",
                  currentTheme.secondary
                )}
                style={{
                  width: `${ring * 120}px`,
                  height: `${ring * 120}px`,
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
            
            {/* Family members */}
            {members.map((member) => {
              const style = proximityStyles[member.proximity];
              
              return (
                <motion.div
                  key={member.id}
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
                    <UserRound size={24} className={style.color} />
                    <motion.div 
                      className="absolute -bottom-4 whitespace-nowrap text-xs font-medium"
                      animate={{ opacity: [0, 1] }}
                      transition={{ delay: 0.5 }}
                    >
                      {member.name}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="absolute bottom-4 right-4">
            <motion.div 
              className="flex items-center justify-center rounded-full bg-white shadow-md p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Locate size={20} className={currentTheme.accent} />
            </motion.div>
          </div>
        </Card>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(proximityStyles).map(([key, style]) => (
            <div key={key} className="flex items-center text-sm">
              <div className={cn("w-3 h-3 rounded-full mr-2", style.color.replace('text-', 'bg-'))} />
              <span className="capitalize">{key}</span>
            </div>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
};
