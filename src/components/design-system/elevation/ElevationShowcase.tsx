
import React from 'react';
import { VayaCard } from '@/components/ui/vaya-card';
import { Grid } from '@/components/ui/grid-layout';

export const ElevationShowcase: React.FC = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-heading font-semibold mb-4">Elevation System</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Standardized shadow depths for different components based on our 5-level system
      </p>
      
      <Grid cols={5} gap={4}>
        {[1, 2, 3, 4, 5].map((level) => (
          <VayaCard 
            key={level} 
            elevation={level as 1 | 2 | 3 | 4 | 5}
            className="h-32 flex items-center justify-center"
          >
            <p className="text-xl font-medium">Level {level}</p>
          </VayaCard>
        ))}
      </Grid>
    </div>
  );
};
