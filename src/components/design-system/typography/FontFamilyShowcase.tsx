
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const FontFamilyShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Font Families</CardTitle>
        <CardDescription>Typography foundations for different contexts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-md">
            <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mb-2">Heading Font</p>
            <p className="font-heading text-2xl">Montserrat</p>
            <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mt-2">Used for headings, titles, and emphasis</p>
          </div>
          
          <div className="p-4 border rounded-md">
            <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mb-2">Body Font</p>
            <p className="font-body text-2xl">Inter</p>
            <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mt-2">Used for body copy and UI elements</p>
          </div>
          
          <div className="p-4 border rounded-md">
            <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mb-2">Mono Font</p>
            <p className="font-mono text-2xl">Monospace</p>
            <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mt-2">Used for code and technical content</p>
          </div>
          
          <div className="p-4 border rounded-md">
            <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mb-2">Handwritten Font</p>
            <p style={{ fontFamily: 'Architects Daughter, cursive' }} className="text-2xl">Architects Daughter</p>
            <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mt-2">Used for personal, informal content</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
