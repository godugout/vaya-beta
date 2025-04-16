
import React from 'react';
import { FontFamilyShowcase } from './typography/FontFamilyShowcase';
import { TypeScale } from './typography/TypeScale';
import { FontWeights } from './typography/FontWeights';
import { TextStyles } from './typography/TextStyles';
import { FontPairings } from './typography/FontPairings';
import { TypographyPlayground } from './typography/TypographyPlayground';
import { ColorContrastChecker } from './ColorContrastChecker';

export const Typography = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Typography</h1>
        <p className="text-gray-500 dark:text-dark-text-secondary">
          A comprehensive type system designed for clarity and consistency
        </p>
      </div>
      
      <FontFamilyShowcase />
      <FontPairings />
      <TypeScale />
      <FontWeights />
      <TextStyles />
      <TypographyPlayground />
      <ColorContrastChecker />
    </div>
  );
};
