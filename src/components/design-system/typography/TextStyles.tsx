
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const TextStyles = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Text Styles</CardTitle>
        <CardDescription>Common text treatment patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mb-1">Highlight Text</p>
              <p>This is normal text with <span className="bg-yellow-100 px-1">highlighted</span> content.</p>
            </div>
            
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mb-1">Link Styles</p>
              <p>Text with an <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">inline link</a> element.</p>
            </div>
            
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mb-1">Code Text</p>
              <p>Inline <code className="bg-gray-100 dark:bg-dark-background-elevated px-1 py-0.5 rounded text-sm font-mono">code</code> styling.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mb-1">Block Quote</p>
              <blockquote className="pl-4 border-l-4 border-gray-300 dark:border-dark-background-elevated italic">
                This is a blockquote that demonstrates editorial content or testimonials.
              </blockquote>
            </div>
            
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mb-1">Lists</p>
              <ul className="list-disc list-inside space-y-1">
                <li>First list item</li>
                <li>Second list item</li>
                <li>Third list item</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-500 dark:text-dark-text-tertiary mb-1">Caption Text</p>
              <p className="text-sm text-gray-500 dark:text-dark-text-tertiary">This is caption text used for images or supplementary content.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
