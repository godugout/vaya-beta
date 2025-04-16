
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { vayaColors } from '@/styles/theme/colors/vaya';

const colorCombinations = [
  {
    name: "Primary Action",
    background: vayaColors.primary,
    text: "#FFFFFF",
    example: "Button"
  },
  {
    name: "Secondary Action",
    background: vayaColors.secondary,
    text: "#FFFFFF",
    example: "Button"
  },
  {
    name: "Success State",
    background: vayaColors.ui.success,
    text: "#FFFFFF",
    example: "Alert"
  },
  {
    name: "Warning State",
    background: vayaColors.ui.warning,
    text: "#000000",
    example: "Notice"
  },
  {
    name: "Error State",
    background: vayaColors.ui.error,
    text: "#FFFFFF",
    example: "Alert"
  },
  {
    name: "Info State",
    background: vayaColors.ui.info,
    text: "#FFFFFF",
    example: "Message"
  }
];

export const ColorCombinations = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Combinations</CardTitle>
        <CardDescription>Practical examples of color usage in different contexts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorCombinations.map((combo) => (
            <div key={combo.name} className="p-4 border rounded-md space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">{combo.name}</p>
                <span className="text-xs text-muted-foreground">{combo.example}</span>
              </div>
              
              <div 
                className="h-20 rounded-md flex items-center justify-center"
                style={{ 
                  backgroundColor: combo.background,
                  color: combo.text
                }}
              >
                <span className="font-medium">Sample Text</span>
              </div>
              
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">
                  Background: {combo.background}
                </p>
                <p className="text-xs text-muted-foreground">
                  Text: {combo.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
