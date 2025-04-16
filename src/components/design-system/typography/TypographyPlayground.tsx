
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const TypographyPlayground = () => {
  const [fontFamily, setFontFamily] = React.useState('Inter Tight');
  const [sampleText, setSampleText] = React.useState('The quick brown fox jumps over the lazy dog');

  return (
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
  );
};
