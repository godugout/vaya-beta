
import React from 'react';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ProximityHeader } from './components/ProximityHeader';
import { ProximityVisualization } from './components/ProximityVisualization';
import { ProximityLegendItem } from './components/ProximityLegendItem';
import { useFamilyProximity, FamilyMember } from './hooks/useFamilyProximity';

interface FamilyProximityVisualizationProps {
  familyMembers?: FamilyMember[];
}

export const FamilyProximityVisualization: React.FC<FamilyProximityVisualizationProps> = ({
  familyMembers = []
}) => {
  const { members, currentTheme, proximityStyles } = useFamilyProximity(familyMembers);
  
  return (
    <div className="p-6">
      <AnimatedContainer variant="fade" className="max-w-3xl mx-auto">
        <ProximityHeader themeAccent={currentTheme.accent} />
        
        <Card className={cn("p-6 relative overflow-hidden", currentTheme.primary)}>
          <ProximityVisualization 
            members={members}
            themeAccent={currentTheme.accent}
            themeSecondary={currentTheme.secondary}
            proximityStyles={proximityStyles}
          />
        </Card>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(proximityStyles).map(([key, style]) => (
            <ProximityLegendItem 
              key={key} 
              label={key} 
              colorClass={style.color} 
            />
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
};
