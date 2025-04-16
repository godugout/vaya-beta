
import React from 'react';
import { BrandColors } from './color/BrandColors';
import { SemanticColors } from './color/SemanticColors';
import { TextColors } from './color/TextColors';
import { BackgroundColors } from './color/BackgroundColors';
import { ColorPicker } from './color/ColorPicker';
import { ColorCombinations } from './ColorCombinations';

export const ColorPalette = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Color Palette</h1>
        <p className="text-gray-500 dark:text-dark-text-secondary">
          Vaya's color system is designed for accessibility and visual harmony
        </p>
      </div>
      
      <ColorCombinations />
      <BrandColors />
      <SemanticColors />
      <TextColors />
      <BackgroundColors />
      <ColorPicker />
    </div>
  );
};
