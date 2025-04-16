
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const TypeScale = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Type Scale</CardTitle>
        <CardDescription>Font sizes based on a harmonious scale</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h1 className="font-heading text-6xl">Display</h1>
              <span className="text-sm text-gray-500 dark:text-dark-text-tertiary">3.75rem / 60px</span>
            </div>
            <div className="flex items-baseline justify-between">
              <h1 className="font-heading text-5xl">Heading 1</h1>
              <span className="text-sm text-gray-500 dark:text-dark-text-tertiary">3rem / 48px</span>
            </div>
            <div className="flex items-baseline justify-between">
              <h2 className="font-heading text-4xl">Heading 2</h2>
              <span className="text-sm text-gray-500 dark:text-dark-text-tertiary">2.25rem / 36px</span>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="font-heading text-3xl">Heading 3</h3>
              <span className="text-sm text-gray-500 dark:text-dark-text-tertiary">1.875rem / 30px</span>
            </div>
            <div className="flex items-baseline justify-between">
              <h4 className="font-heading text-2xl">Heading 4</h4>
              <span className="text-sm text-gray-500 dark:text-dark-text-tertiary">1.5rem / 24px</span>
            </div>
            <div className="flex items-baseline justify-between">
              <h5 className="font-heading text-xl">Heading 5</h5>
              <span className="text-sm text-gray-500 dark:text-dark-text-tertiary">1.25rem / 20px</span>
            </div>
            <div className="flex items-baseline justify-between">
              <h6 className="font-heading text-lg">Heading 6</h6>
              <span className="text-sm text-gray-500 dark:text-dark-text-tertiary">1.125rem / 18px</span>
            </div>
          </div>
          
          <div className="pt-6 border-t space-y-4">
            <div className="flex items-baseline justify-between">
              <p className="text-lg">Large Text</p>
              <span className="text-sm text-gray-500 dark:text-dark-text-tertiary">1.125rem / 18px</span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-base">Body Text</p>
              <span className="text-sm text-gray-500 dark:text-dark-text-tertiary">1rem / 16px</span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-sm">Small Text</p>
              <span className="text-sm text-gray-500 dark:text-dark-text-tertiary">0.875rem / 14px</span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-xs">Extra Small Text</p>
              <span className="text-sm text-gray-500 dark:text-dark-text-tertiary">0.75rem / 12px</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
