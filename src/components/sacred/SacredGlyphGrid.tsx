
import React from 'react';
import { AmbalTriangleGlyph } from './AmbalTriangleGlyph';
import { ChanchalbenDualityGlyph } from './ChanchalbenDualityGlyph';
import { JamnabenCircularGlyph } from './JamnabenCircularGlyph';
import { FamilyTreeGlyph } from './FamilyTreeGlyph';

export const SacredGlyphGrid = () => {
  return (
    <div className="w-full py-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Sacred Family Glyphs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
        <div className="flex flex-col items-center space-y-3">
          <AmbalTriangleGlyph size="lg" />
          <div className="text-center">
            <h3 className="font-semibold text-lg text-amber-600">Ambalal Triangle</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Spiritual Devotion</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-3">
          <ChanchalbenDualityGlyph size="lg" />
          <div className="text-center">
            <h3 className="font-semibold text-lg text-teal-600">Chanchalben Duality</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Flow & Balance</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-3">
          <JamnabenCircularGlyph size="lg" />
          <div className="text-center">
            <h3 className="font-semibold text-lg text-yellow-600">Jamnaben Circle</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Cyclical Nurturing</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-3">
          <FamilyTreeGlyph size="lg" />
          <div className="text-center">
            <h3 className="font-semibold text-lg text-green-600">Family Tree</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Growth & Heritage</p>
          </div>
        </div>
      </div>
    </div>
  );
};
