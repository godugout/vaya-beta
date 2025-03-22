
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const ElevationSystemShowcase: React.FC = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-heading font-semibold mb-6">Elevation System</h2>
      <Card>
        <CardHeader>
          <CardTitle>5 Elevation Levels</CardTitle>
          <CardDescription>
            Consistent shadow depths for different components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="flex flex-col items-center">
                <div 
                  className={`h-24 w-full bg-white dark:bg-gray-800 rounded-lg shadow-elevation-${level} flex items-center justify-center`}
                >
                  <span className="font-medium">Level {level}</span>
                </div>
                <span className="text-sm text-gray-500 mt-2">Elevation {level}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
