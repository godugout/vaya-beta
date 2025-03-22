
import React from 'react';
import { VayaCard } from '@/components/ui/vaya-card';
import { Grid } from '@/components/ui/grid-layout';
import { CardContent } from '@/components/ui/card';

export const ResponsiveGridShowcase: React.FC = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-heading font-semibold mb-4">Responsive Grid System</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        8px grid system for consistent spacing and layout
      </p>
      
      <VayaCard>
        <CardContent className="py-8">
          <Grid responsive gap={4}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div 
                key={item}
                className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
              >
                <p className="text-xl font-medium">Grid Item {item}</p>
              </div>
            ))}
          </Grid>
        </CardContent>
      </VayaCard>
    </div>
  );
};
