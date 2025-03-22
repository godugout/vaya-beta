
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const GridSystemShowcase: React.FC = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-heading font-semibold mb-6">8px Grid System</h2>
      <Card>
        <CardHeader>
          <CardTitle>Spacing Scale</CardTitle>
          <CardDescription>
            All dimensions are multiples of 8px
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-end space-x-4">
                {[1, 2, 3, 4, 5, 6].map((multiplier) => {
                  const size = multiplier * 8;
                  return (
                    <div key={multiplier} className="flex flex-col items-center">
                      <div
                        className="bg-vaya-coral dark:bg-vaya-coral-dark"
                        style={{ width: `${size}px`, height: `${size}px` }}
                      ></div>
                      <span className="text-xs mt-1">{size}px</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The 8px grid system provides mathematical harmony with multiples of 8 pixels for 
                all spacing, padding, margins, and component sizes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
