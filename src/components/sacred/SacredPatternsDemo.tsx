
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const SacredPatternsDemo: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sacred Geometric Patterns</CardTitle>
          <CardDescription>
            Background patterns derived from the four sacred family glyphs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Lotus Pattern (Jamnaben)</h3>
              <div className="h-40 bg-pattern-lotus rounded-md border"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Inspired by the circular tree with concentric branches
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Flowing Rivers (Chanchalben)</h3>
              <div className="h-40 bg-pattern-rivers rounded-md border"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Based on the flowing dual paths symbolizing balance
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Triangular Devotion (Ambalal)</h3>
              <div className="h-40 bg-pattern-triangles rounded-md border"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Derived from the triangle with three horizontal levels
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Family Growth Pattern</h3>
              <div className="h-40 bg-pattern-growth rounded-md border"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Inspired by the family tree with branching foliage
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-medium mb-2">Combined Sacred Pattern</h3>
            <div className="h-60 bg-pattern-sacred-combined rounded-md border"></div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              All four sacred patterns combined in a harmonious grid arrangement
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
