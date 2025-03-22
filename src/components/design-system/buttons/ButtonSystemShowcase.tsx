
import React from 'react';
import { VayaCard } from '@/components/ui/vaya-card';
import { VayaButton } from '@/components/ui/vaya-button';
import { Grid } from '@/components/ui/grid-layout';
import { CardContent } from '@/components/ui/card';

export const ButtonSystemShowcase: React.FC = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-heading font-semibold mb-4">Button System</h2>
      <VayaCard>
        <CardContent className="py-8">
          <Grid cols={4} gap={3}>
            <div className="space-y-4">
              <p className="text-sm font-medium">Default</p>
              <VayaButton>Default Button</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Secondary</p>
              <VayaButton variant="secondary">Secondary</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Tertiary</p>
              <VayaButton variant="tertiary">Tertiary</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Outline</p>
              <VayaButton variant="outline">Outline</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Small</p>
              <VayaButton size="sm">Small</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Medium</p>
              <VayaButton size="md">Medium</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Large</p>
              <VayaButton size="lg">Large</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Loading</p>
              <VayaButton isLoading>Loading</VayaButton>
            </div>
          </Grid>
        </CardContent>
      </VayaCard>
    </div>
  );
};
