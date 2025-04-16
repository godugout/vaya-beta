import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { typography } from '@/styles/theme/typography';
import { ColorContrastChecker } from './ColorContrastChecker';

export const Typography = () => {
  const [fontFamily, setFontFamily] = React.useState('Inter Tight');
  const [sampleText, setSampleText] = React.useState('The quick brown fox jumps over the lazy dog');
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Typography</h1>
        <p className="text-gray-500 dark:text-dark-text-secondary">
          Vaya's typographic system is designed for clarity and readability
        </p>
      </div>
      
      {/* Font Family System */}
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
      
      {/* Type Scale */}
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
      
      {/* Font Weight */}
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
      
      {/* Text Styles */}
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
      
      {/* Typography Playground */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Playground</CardTitle>
          <CardDescription>Experiment with different typography settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="font-family">Font Family</Label>
                <Select
                  value={fontFamily}
                  onValueChange={setFontFamily}
                >
                  <SelectTrigger id="font-family">
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter Tight">Inter Tight</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                    <SelectItem value="Georgia">Georgia</SelectItem>
                    <SelectItem value="monospace">Monospace</SelectItem>
                    <SelectItem value="Architects Daughter">Architects Daughter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select defaultValue="16">
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12px</SelectItem>
                    <SelectItem value="14">14px</SelectItem>
                    <SelectItem value="16">16px</SelectItem>
                    <SelectItem value="18">18px</SelectItem>
                    <SelectItem value="20">20px</SelectItem>
                    <SelectItem value="24">24px</SelectItem>
                    <SelectItem value="30">30px</SelectItem>
                    <SelectItem value="36">36px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font-weight">Font Weight</Label>
                <Select defaultValue="400">
                  <SelectTrigger id="font-weight">
                    <SelectValue placeholder="Select font weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="400">Regular (400)</SelectItem>
                    <SelectItem value="500">Medium (500)</SelectItem>
                    <SelectItem value="600">Semibold (600)</SelectItem>
                    <SelectItem value="700">Bold (700)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sample-text">Sample Text</Label>
                <Input
                  id="sample-text"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                />
              </div>
            </div>
            
            <div className="md:col-span-2 border rounded-md p-6 flex flex-col items-center justify-center">
              <div 
                className="text-center space-y-4" 
                style={{ 
                  fontFamily: fontFamily
                }}
              >
                <p className="text-4xl font-bold">Heading Example</p>
                <p className="text-xl">Subheading Example</p>
                <p className="text-base max-w-md mx-auto">{sampleText}</p>
                <div className="flex justify-center pt-4 space-x-2">
                  <Button style={{ fontFamily: fontFamily }}>Primary Button</Button>
                  <Button variant="outline" style={{ fontFamily: fontFamily }}>Secondary Button</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Add Color Contrast Analysis */}
      <ColorContrastChecker />
    </div>
  );
};
