
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ColorPicker = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Picker Tool</CardTitle>
        <CardDescription>Create and explore custom colors for your brand</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="color-picker">Hex Color</Label>
              <div className="flex space-x-2">
                <Input id="color-picker" type="color" className="w-12 h-10 p-1" />
                <Input id="color-hex" type="text" placeholder="#000000" className="flex-1" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color-opacity">Opacity</Label>
              <Input id="color-opacity" type="range" min="0" max="100" defaultValue="100" />
            </div>
          </div>
          
          <div className="sm:col-span-2">
            <div className="space-y-4">
              <Label>Color Variations</Label>
              <div className="grid grid-cols-5 gap-2 h-32">
                <div className="bg-black/90 rounded-l-md"></div>
                <div className="bg-black/70"></div>
                <div className="bg-black/50"></div>
                <div className="bg-black/30"></div>
                <div className="bg-black/10 rounded-r-md"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white border rounded-md p-4 flex items-center justify-center">
                  <div className="bg-black text-white px-3 py-1 text-sm">Text on White</div>
                </div>
                <div className="bg-gray-100 border rounded-md p-4 flex items-center justify-center">
                  <div className="bg-black text-white px-3 py-1 text-sm">Text on Light</div>
                </div>
                <div className="bg-black border rounded-md p-4 flex items-center justify-center">
                  <div className="bg-white text-black px-3 py-1 text-sm">Text on Black</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
