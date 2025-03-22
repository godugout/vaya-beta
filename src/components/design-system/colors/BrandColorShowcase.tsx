
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const BrandColorShowcase: React.FC = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-heading font-semibold mb-6">Color System</h2>
      <Card>
        <CardHeader>
          <CardTitle>Brand Colors</CardTitle>
          <CardDescription>
            Primary coral, secondary purple, and tertiary green accents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary: Coral */}
            <div className="space-y-3">
              <div className="h-20 rounded-md bg-vaya-coral flex items-end p-2">
                <span className="text-white font-medium">Coral</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-10 rounded-md bg-vaya-coral-light"></div>
                <div className="h-10 rounded-md bg-vaya-coral"></div>
                <div className="h-10 rounded-md bg-vaya-coral-dark"></div>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Default</span>
                  <span className="font-mono">#FF7675</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Light</span>
                  <span className="font-mono">#FFA8A7</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Dark</span>
                  <span className="font-mono">#D15A59</span>
                </div>
              </div>
            </div>
            
            {/* Secondary: Purple */}
            <div className="space-y-3">
              <div className="h-20 rounded-md bg-vaya-purple flex items-end p-2">
                <span className="text-white font-medium">Purple</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-10 rounded-md bg-vaya-purple-light"></div>
                <div className="h-10 rounded-md bg-vaya-purple"></div>
                <div className="h-10 rounded-md bg-vaya-purple-dark"></div>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Default</span>
                  <span className="font-mono">#6C5CE7</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Light</span>
                  <span className="font-mono">#A195F7</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Dark</span>
                  <span className="font-mono">#4A3BBF</span>
                </div>
              </div>
            </div>
            
            {/* Tertiary: Green */}
            <div className="space-y-3">
              <div className="h-20 rounded-md bg-vaya-green flex items-end p-2">
                <span className="text-white font-medium">Green</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-10 rounded-md bg-vaya-green-light"></div>
                <div className="h-10 rounded-md bg-vaya-green"></div>
                <div className="h-10 rounded-md bg-vaya-green-dark"></div>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Default</span>
                  <span className="font-mono">#4CD137</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Light</span>
                  <span className="font-mono">#7EE76C</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Dark</span>
                  <span className="font-mono">#35A220</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
