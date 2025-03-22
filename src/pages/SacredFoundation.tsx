
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SacredGlyphsShowcase } from '@/components/sacred/SacredGlyphsShowcase';
import { SacredTypographyDemo } from '@/components/sacred/SacredTypographyDemo';
import { SacredPatternsDemo } from '@/components/sacred/SacredPatternsDemo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AmbalTriangleGlyph } from '@/components/sacred/AmbalTriangleGlyph';
import { ChanchalbenDualityGlyph } from '@/components/sacred/ChanchalbenDualityGlyph';
import { JamnabenCircularGlyph } from '@/components/sacred/JamnabenCircularGlyph';
import { FamilyTreeGlyph } from '@/components/sacred/FamilyTreeGlyph';

export default function SacredFoundation() {
  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-heading font-semibold mb-4">Vaya + Hanuman Edition</h1>
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="text-sacred-primary-saffron"><AmbalTriangleGlyph size="sm" /></div>
            <div className="text-sacred-primary-teal"><ChanchalbenDualityGlyph size="sm" /></div>
            <div className="text-sacred-primary-yellow"><JamnabenCircularGlyph size="sm" /></div>
            <div className="text-sacred-primary-green"><FamilyTreeGlyph size="sm" /></div>
          </div>
          <p className="max-w-3xl mx-auto text-lg">
            A visual identity system that honors family heritage through meaningful symbols and thoughtful design
          </p>
        </div>
        
        <Tabs defaultValue="glyphs" className="mb-12">
          <TabsList className="mb-8 grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="glyphs">Sacred Glyphs</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="glyphs">
            <SacredGlyphsShowcase />
          </TabsContent>
          
          <TabsContent value="typography">
            <SacredTypographyDemo />
          </TabsContent>
          
          <TabsContent value="patterns">
            <SacredPatternsDemo />
          </TabsContent>
        </Tabs>
        
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Sacred Color System</CardTitle>
              <CardDescription>
                A comprehensive color system based on spiritual and natural elements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Primary Sacred Colors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="h-20 bg-sacred-primary-saffron rounded-t-md"></div>
                      <div className="p-3 border-x border-b rounded-b-md">
                        <p className="font-medium">Saffron Orange</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">#FF7A00</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="h-20 bg-sacred-primary-teal rounded-t-md"></div>
                      <div className="p-3 border-x border-b rounded-b-md">
                        <p className="font-medium">Sacred Teal</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">#1E9C95</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="h-20 bg-sacred-primary-yellow rounded-t-md"></div>
                      <div className="p-3 border-x border-b rounded-b-md">
                        <p className="font-medium">Sunshine Yellow</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">#FFDD59</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="h-20 bg-sacred-primary-green rounded-t-md"></div>
                      <div className="p-3 border-x border-b rounded-b-md">
                        <p className="font-medium">Kelly Green</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">#2ECC71</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Earth Elements</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="h-20 bg-sacred-earth-brown rounded-t-md"></div>
                      <div className="p-3 border-x border-b rounded-b-md">
                        <p className="font-medium">Earth Brown</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">#8D6E63</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="h-20 bg-sacred-earth-gray rounded-t-md"></div>
                      <div className="p-3 border-x border-b rounded-b-md">
                        <p className="font-medium">Stone Gray</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">#7F8C8D</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="h-20 bg-sacred-earth-terracotta rounded-t-md"></div>
                      <div className="p-3 border-x border-b rounded-b-md">
                        <p className="font-medium">Terracotta Red</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">#E74C3C</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="h-20 bg-sacred-earth-forest rounded-t-md"></div>
                      <div className="p-3 border-x border-b rounded-b-md">
                        <p className="font-medium">Deep Forest</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">#1E392A</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Neutrals</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <div className="h-20 bg-sacred-neutral-parchment rounded-t-md"></div>
                      <div className="p-3 border-x border-b rounded-b-md">
                        <p className="font-medium">Parchment</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">#F5EFE6</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="h-20 bg-sacred-neutral-sandstone rounded-t-md"></div>
                      <div className="p-3 border-x border-b rounded-b-md">
                        <p className="font-medium">Sandstone</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">#E6D7B9</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="h-20 bg-sacred-neutral-charcoal rounded-t-md"></div>
                      <div className="p-3 border-x border-b rounded-b-md text-white">
                        <p className="font-medium">Rich Charcoal</p>
                        <p className="text-sm text-gray-300">#2D3436</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Saffron Orange (Shade/Tint Variations)</h3>
                  <div className="grid grid-cols-5 gap-1 h-12">
                    <div className="bg-sacred-primary-saffron-900 rounded-l-md"></div>
                    <div className="bg-sacred-primary-saffron-700"></div>
                    <div className="bg-sacred-primary-saffron-500"></div>
                    <div className="bg-sacred-primary-saffron-300"></div>
                    <div className="bg-sacred-primary-saffron-100 rounded-r-md"></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>900</span>
                    <span>700</span>
                    <span>500</span>
                    <span>300</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
