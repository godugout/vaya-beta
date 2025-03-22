
import React from 'react';
import { TypographyShowcase } from './typography/TypographyShowcase';
import { BrandColorShowcase } from './colors/BrandColorShowcase';
import { ElevationSystemShowcase } from './elevation/ElevationSystemShowcase';
import { GridSystemShowcase } from './grid/GridSystemShowcase';
import { ComponentExamples } from './components/ComponentExamples';

export const DesignSystemShowcase: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <section className="mb-16">
        <h1 className="text-4xl font-heading font-semibold mb-4">Vaya Design System</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
          A comprehensive design system built on an 8px grid with consistent elevation levels, typography, and color schemes.
        </p>
      </section>

      <TypographyShowcase />
      <BrandColorShowcase />
      <ElevationSystemShowcase />
      <GridSystemShowcase />
      <ComponentExamples />
    </div>
  );
};

export default DesignSystemShowcase;
