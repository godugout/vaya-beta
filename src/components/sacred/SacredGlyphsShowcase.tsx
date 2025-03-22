
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AmbalTriangleGlyph } from './AmbalTriangleGlyph';
import { ChanchalbenDualityGlyph } from './ChanchalbenDualityGlyph';
import { JamnabenCircularGlyph } from './JamnabenCircularGlyph';
import { FamilyTreeGlyph } from './FamilyTreeGlyph';

export const SacredGlyphsShowcase: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sacred-primary-saffron">Ambalal Triangle Glyph</CardTitle>
          <CardDescription>Represents spiritual hierarchy & devotion</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="text-sacred-primary-saffron">
            <AmbalTriangleGlyph size="lg" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sacred-primary-teal">Chanchalben Duality Glyph</CardTitle>
          <CardDescription>Represents flow & balance in life</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="text-sacred-primary-teal">
            <ChanchalbenDualityGlyph size="lg" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sacred-primary-yellow">Jamnaben Circular Glyph</CardTitle>
          <CardDescription>Represents eternal family connection</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="text-sacred-primary-yellow">
            <JamnabenCircularGlyph size="lg" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sacred-primary-green">Family Tree Glyph</CardTitle>
          <CardDescription>Represents growth & generational legacy</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="text-sacred-primary-green">
            <FamilyTreeGlyph size="lg" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
