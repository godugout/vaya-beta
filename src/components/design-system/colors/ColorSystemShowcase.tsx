
import React from 'react';
import { VayaCard } from '@/components/ui/vaya-card';
import { Grid } from '@/components/ui/grid-layout';

export const ColorSystemShowcase: React.FC = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-heading font-semibold mb-4">Color System</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Our primary color palette with coral, purple, and green accents
      </p>
      
      <Grid cols={3} gap={4}>
        <VayaCard padding="lg">
          <div className="space-y-4">
            <div className="h-24 bg-vaya-coral rounded-lg flex items-end p-3">
              <p className="text-white font-medium">Coral</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 bg-vaya-coral-light rounded"></div>
              <div className="h-12 bg-vaya-coral rounded"></div>
              <div className="h-12 bg-vaya-coral-dark rounded"></div>
            </div>
            <p className="text-sm text-center">#FF7675</p>
          </div>
        </VayaCard>
        
        <VayaCard padding="lg">
          <div className="space-y-4">
            <div className="h-24 bg-vaya-purple rounded-lg flex items-end p-3">
              <p className="text-white font-medium">Purple</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 bg-vaya-purple-light rounded"></div>
              <div className="h-12 bg-vaya-purple rounded"></div>
              <div className="h-12 bg-vaya-purple-dark rounded"></div>
            </div>
            <p className="text-sm text-center">#6C5CE7</p>
          </div>
        </VayaCard>
        
        <VayaCard padding="lg">
          <div className="space-y-4">
            <div className="h-24 bg-vaya-green rounded-lg flex items-end p-3">
              <p className="text-white font-medium">Green</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 bg-vaya-green-light rounded"></div>
              <div className="h-12 bg-vaya-green rounded"></div>
              <div className="h-12 bg-vaya-green-dark rounded"></div>
            </div>
            <p className="text-sm text-center">#4CD137</p>
          </div>
        </VayaCard>
      </Grid>
    </div>
  );
};
