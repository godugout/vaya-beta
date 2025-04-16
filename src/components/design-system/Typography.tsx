
import React from 'react';
import { FontFamilyShowcase } from './typography/FontFamilyShowcase';
import { TypeScale } from './typography/TypeScale';
import { FontWeights } from './typography/FontWeights';
import { TextStyles } from './typography/TextStyles';
import { TypographyPlayground } from './typography/TypographyPlayground';
import { ColorContrastChecker } from './ColorContrastChecker';

export const Typography = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Typography</h1>
        <p className="text-gray-500 dark:text-dark-text-secondary">
          Vaya's typographic system is designed for clarity and readability
        </p>
      </div>
      
      <FontFamilyShowcase />
      <TypeScale />
      <FontWeights />
      <TextStyles />
      <TypographyPlayground />
      <ColorContrastChecker />
    </div>
  );
};
