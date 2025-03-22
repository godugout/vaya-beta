
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const DesignSystemShowcase: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <section className="mb-16">
        <h1 className="text-4xl font-heading font-semibold mb-4">Vaya Design System</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
          A comprehensive design system built on an 8px grid with consistent elevation levels, typography, and color schemes.
        </p>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="text-3xl font-heading font-semibold mb-6">Typography</h2>
        <Card>
          <CardHeader>
            <CardTitle>Font Family System</CardTitle>
            <CardDescription>
              Using Montserrat for headings, Inter for UI, and Georgia for stories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h6 className="text-sm font-medium text-gray-500 mb-2">Headings: Montserrat</h6>
              <h1 className="font-heading text-4xl mb-2">Heading 1</h1>
              <h2 className="font-heading text-3xl mb-2">Heading 2</h2>
              <h3 className="font-heading text-2xl mb-2">Heading 3</h3>
              <h4 className="font-heading text-xl mb-2">Heading 4</h4>
              <h5 className="font-heading text-lg mb-2">Heading 5</h5>
              <h6 className="font-heading text-base">Heading 6</h6>
            </div>
            
            <Separator />
            
            <div>
              <h6 className="text-sm font-medium text-gray-500 mb-2">Body: Inter</h6>
              <p className="font-body text-base mb-3">
                Primary paragraph text uses Inter at 16px (1rem) with a line height of 1.5.
                This creates readable content with good spacing between lines.
              </p>
              <p className="font-body text-sm text-gray-600 dark:text-gray-400">
                Secondary text uses a smaller size and lighter color for supporting information.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h6 className="text-sm font-medium text-gray-500 mb-2">Stories: Georgia</h6>
              <p className="font-story text-lg leading-relaxed">
                Story text uses Georgia with a larger size and relaxed line height to create an immersive reading experience for family stories and memories.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Color System */}
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

      {/* Elevation System */}
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

      {/* Grid System */}
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

      {/* Component Examples */}
      <section>
        <h2 className="text-3xl font-heading font-semibold mb-6">Component Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Example */}
          <Card className="shadow-elevation-2">
            <CardHeader>
              <CardTitle>Family Memory</CardTitle>
              <CardDescription>Recorded on June 12, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-story text-base mb-4">
                "I remember the first time we visited the old family farm in Gujarat. The mango trees were heavy with fruit, and the air was filled with the scent of jasmine..."
              </p>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Jayesh Patel</p>
                  <p className="text-xs text-gray-500">Great Grandfather</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">Listen</Button>
              <Button size="sm" className="bg-vaya-coral hover:bg-vaya-coral-dark">Share</Button>
            </CardFooter>
          </Card>

          {/* Interactive Components */}
          <Card className="shadow-elevation-2">
            <CardHeader>
              <CardTitle>Interactive Elements</CardTitle>
              <CardDescription>Based on the Vaya design system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-500">Buttons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-vaya-coral hover:bg-vaya-coral-dark">Primary</Button>
                  <Button variant="outline">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-500">Badges</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-vaya-coral">New</Badge>
                  <Badge variant="outline">Badge</Badge>
                  <Badge className="bg-vaya-purple">Feature</Badge>
                  <Badge className="bg-vaya-green">Success</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-500">Avatars</h4>
                <div className="flex flex-wrap gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-vaya-coral">JP</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-vaya-purple">KP</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-vaya-green">RS</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemShowcase;
