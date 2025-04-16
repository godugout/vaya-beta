
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const FontWeights = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Font Weights</CardTitle>
        <CardDescription>Visual hierarchy through font weight variations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p className="font-normal">Normal (400)</p>
            <div className="bg-gray-100 dark:bg-dark-background-elevated h-1 w-full">
              <div className="bg-black dark:bg-white h-1 w-[40%]"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Medium (500)</p>
            <div className="bg-gray-100 dark:bg-dark-background-elevated h-1 w-full">
              <div className="bg-black dark:bg-white h-1 w-[50%]"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="font-semibold">Semibold (600)</p>
            <div className="bg-gray-100 dark:bg-dark-background-elevated h-1 w-full">
              <div className="bg-black dark:bg-white h-1 w-[60%]"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="font-bold">Bold (700)</p>
            <div className="bg-gray-100 dark:bg-dark-background-elevated h-1 w-full">
              <div className="bg-black dark:bg-white h-1 w-[70%]"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
