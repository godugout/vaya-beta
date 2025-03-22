
import React from 'react';
import { Container, Grid } from '@/components/ui/grid-layout';
import { EnglishStoryExample } from './story/EnglishStoryExample';
import { MultilingualStoryExample } from './story/MultilingualStoryExample';
import { ElevationShowcase } from './elevation/ElevationShowcase';
import { ColorSystemShowcase } from './colors/ColorSystemShowcase';
import { ButtonSystemShowcase } from './buttons/ButtonSystemShowcase';
import { ResponsiveGridShowcase } from './grid/ResponsiveGridShowcase';
import { PoetryExample } from './story/PoetryExample';

export const StoryShowcase: React.FC = () => {
  return (
    <Container maxWidth="xl" className="py-8">
      <h1 className="text-3xl font-heading font-semibold mb-6">Story Typography Showcase</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Specialized typography components for multilingual story presentation
      </p>
      
      <Grid cols={2} gap={6} className="mb-12">
        <EnglishStoryExample />
        <MultilingualStoryExample />
      </Grid>
      
      <div className="mb-12">
        <PoetryExample />
      </div>
      
      <ElevationShowcase />
      <ColorSystemShowcase />
      <ButtonSystemShowcase />
      <ResponsiveGridShowcase />
    </Container>
  );
};

export default StoryShowcase;
