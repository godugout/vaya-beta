
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { spacing, borderRadius, shadows } from '@/styles/theme/spacing';

export const SpacingGuide = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Spacing & Layout</h1>
        <p className="text-gray-500 dark:text-dark-text-secondary">
          Consistent spacing creates harmony and improves usability
        </p>
      </div>
      
      {/* 8px Grid System */}
      <Card>
        <CardHeader>
          <CardTitle>8px Grid System</CardTitle>
          <CardDescription>Vaya uses an 8-pixel grid system as the foundation for all layout decisions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {[4, 8, 16, 24, 32, 40, 48, 64].map((size, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={`bg-gray-200 dark:bg-dark-background-elevated border border-gray-300 dark:border-dark-background flex items-center justify-center text-xs`}
                    style={{ width: `${size}px`, height: `${size}px` }}
                  >
                    {size < 16 ? '' : size}
                  </div>
                  <span className="text-xs mt-1">{size}px</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-100 dark:bg-dark-background-elevated p-6 rounded-md">
              <p className="text-sm mb-4">The 8px grid system provides a consistent foundation for spacing:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>All spacing values should be multiples of 8 pixels (or 4px for finer adjustments)</li>
                <li>Component heights, padding, and margins follow the 8px grid</li>
                <li>This creates visual harmony and makes layouts more predictable</li>
                <li>Exceptions can be made for 1px borders and 2px accents</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Spacing Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Spacing Scale</CardTitle>
          <CardDescription>Standard spacing values to maintain consistency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Token</th>
                    <th className="text-left p-2">Value</th>
                    <th className="text-left p-2">Example</th>
                    <th className="text-left p-2">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(spacing).map(([key, value], i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2 font-mono text-sm">{key}</td>
                      <td className="p-2">{value}</td>
                      <td className="p-2">
                        <div 
                          className="bg-gray-200 dark:bg-dark-background-elevated"
                          style={{ width: value, height: '24px' }}
                        ></div>
                      </td>
                      <td className="p-2 text-sm text-gray-600 dark:text-dark-text-tertiary">
                        {getSpacingUsage(key)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Border Radius */}
      <Card>
        <CardHeader>
          <CardTitle>Border Radius</CardTitle>
          <CardDescription>Rounded corners for different UI elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(borderRadius).map(([key, value], i) => (
              <div key={i} className="flex flex-col items-center">
                <div 
                  className="bg-gray-200 dark:bg-dark-background-elevated border border-gray-300 dark:border-dark-text-tertiary w-24 h-24 flex items-center justify-center text-xs"
                  style={{ borderRadius: value }}
                >
                  {key}
                </div>
                <span className="text-sm mt-2 font-mono">{value}</span>
                <span className="text-xs text-gray-500 dark:text-dark-text-tertiary mt-1">
                  {getBorderRadiusUsage(key)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Shadows & Elevation */}
      <Card>
        <CardHeader>
          <CardTitle>Shadows & Elevation</CardTitle>
          <CardDescription>Create hierarchy and depth with consistent shadows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(shadows).map(([key, value], i) => (
              <div key={i} className="p-4">
                <div 
                  className="bg-white dark:bg-dark-background-elevated h-32 flex items-center justify-center rounded-md mb-4"
                  style={{ boxShadow: value }}
                >
                  <span className="font-medium">{key}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-mono">{value}</div>
                  <div className="text-xs text-gray-500 dark:text-dark-text-tertiary">
                    {getShadowUsage(key)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Layout Grid Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Grid Examples</CardTitle>
          <CardDescription>Grid layouts for different scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">12-Column Grid (Desktop)</h3>
              <div className="grid grid-cols-12 gap-2 mb-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-12 bg-gray-200 dark:bg-dark-background-elevated flex items-center justify-center text-xs"
                  >
                    {i+1}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-dark-text-tertiary">
                Standard 12-column grid for desktop layouts. Use for complex layouts with multiple columns.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Content Grid Example</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <div className="col-span-2">
                  <div className="h-48 bg-gray-200 dark:bg-dark-background-elevated rounded-md flex items-center justify-center">
                    Main Content
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="h-48 bg-gray-200 dark:bg-dark-background-elevated rounded-md flex items-center justify-center">
                    Sidebar
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-dark-text-tertiary">
                Content + sidebar layout. Main content takes up 2/3 of the available space.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Card Grid Example</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-32 bg-gray-200 dark:bg-dark-background-elevated rounded-md flex items-center justify-center"
                  >
                    Card {i+1}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-dark-text-tertiary">
                Responsive card grid that adapts to different screen sizes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Container and Margin Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Container and Margin Guidelines</CardTitle>
          <CardDescription>Standards for page container and margin sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="relative border border-dashed border-gray-300 dark:border-gray-700 p-8 rounded-md">
              <div className="absolute top-0 left-0 w-full bg-gray-100 dark:bg-dark-background-elevated text-center text-xs py-1">
                Viewport
              </div>
              
              <div className="relative border border-dashed border-gray-400 dark:border-gray-600 rounded-md mx-auto max-w-6xl p-6">
                <div className="absolute top-0 left-0 w-full bg-gray-200 dark:bg-dark-background text-center text-xs py-1">
                  Container (max-width: 1200px)
                </div>
                
                <div className="relative h-32 border border-gray-500 dark:border-gray-500 rounded-md bg-white dark:bg-dark-background-elevated flex items-center justify-center">
                  Content Area
                </div>
                
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-dark-background-elevated text-xs px-1 py-0.5 border rounded">
                  16px - 32px
                </div>
                
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white dark:bg-dark-background-elevated text-xs px-1 py-0.5 border rounded">
                  16px - 32px
                </div>
              </div>
              
              <div className="mt-6 bg-gray-100 dark:bg-dark-background-elevated p-4 rounded-md text-sm">
                <ul className="list-disc list-inside space-y-1">
                  <li>Main container has max-width of 1200px with centered alignment</li>
                  <li>Horizontal padding adapts to screen size (16px on mobile, 24px on tablet, 32px on desktop)</li>
                  <li>Maintain minimum margin of 16px from viewport edge on all device sizes</li>
                  <li>Content sections have consistent vertical spacing of 48px (mobile) to 80px (desktop)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function getSpacingUsage(key: string): string {
  const usageMap: Record<string, string> = {
    '0': 'No spacing',
    '1': 'Very tight spacing, icon padding',
    '2': 'Tight spacing, inline elements',
    '3': 'Compact spacing, form controls',
    '4': 'Standard spacing, paragraphs',
    '5': 'Medium spacing',
    '6': 'Default component spacing',
    '8': 'Loose spacing, section margins',
    '10': 'Extra loose spacing',
    '12': 'Large section spacing',
    '16': 'Page section spacing',
    '20': 'Major layout divisions',
    '24': 'Very large layout spacing',
  };
  
  return usageMap[key] || '';
}

function getBorderRadiusUsage(key: string): string {
  const usageMap: Record<string, string> = {
    'none': 'Square corners, tables, code blocks',
    'sm': 'Subtle rounding, form inputs',
    'DEFAULT': 'Standard rounding, cards, buttons',
    'md': 'Medium rounding, larger components',
    'lg': 'Prominent rounding, featured elements',
    'xl': 'Large rounding, floating elements',
    '2xl': 'Very large rounding, modal dialogs',
    '3xl': 'Extra large rounding, user avatars',
    'full': 'Perfect circles, badges, icons',
  };
  
  return usageMap[key] || '';
}

function getShadowUsage(key: string): string {
  const usageMap: Record<string, string> = {
    'sm': 'Subtle elevation, hover states',
    'DEFAULT': 'Standard elevation, cards',
    'md': 'Medium elevation, dropdowns, buttons',
    'lg': 'Large elevation, dialogs, sidebars',
    'xl': 'Extra large elevation, modals',
  };
  
  return usageMap[key] || '';
}
