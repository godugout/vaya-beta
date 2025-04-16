
import React from 'react';
import { calculateContrast, meetsWcagAA, meetsWcagAAA } from '@/lib/colorUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { vayaColors } from '@/styles/theme/colors/vaya';

interface ContrastResult {
  combination: string;
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
}

export const ColorContrastChecker = () => {
  const checkContrast = (color1: string, color2: string, name: string): ContrastResult => {
    const ratio = calculateContrast(color1, color2);
    return {
      combination: name,
      ratio,
      passesAA: meetsWcagAA(ratio),
      passesAAA: meetsWcagAAA(ratio)
    };
  };

  const results: ContrastResult[] = [
    // Text on backgrounds
    checkContrast(vayaColors.text.primary, vayaColors.background.white, "Text Primary on White"),
    checkContrast(vayaColors.text.primary, vayaColors.background.light, "Text Primary on Light"),
    checkContrast(vayaColors.text.inverse, vayaColors.background.dark, "Text Inverse on Dark"),
    
    // UI Elements
    checkContrast(vayaColors.ui.success, vayaColors.background.white, "Success on White"),
    checkContrast(vayaColors.ui.error, vayaColors.background.white, "Error on White"),
    checkContrast(vayaColors.ui.warning, vayaColors.background.white, "Warning on White"),
    
    // Brand Colors
    checkContrast(vayaColors.primary, vayaColors.background.white, "Primary on White"),
    checkContrast(vayaColors.secondary, vayaColors.background.white, "Secondary on White")
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Contrast Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded">
              <span className="font-medium">{result.combination}</span>
              <div className="flex items-center gap-4">
                <span>Ratio: {result.ratio.toFixed(2)}:1</span>
                <div className="flex gap-2">
                  <span className={result.passesAA ? "text-green-500" : "text-red-500"}>
                    AA {result.passesAA ? "✓" : "✗"}
                  </span>
                  <span className={result.passesAAA ? "text-green-500" : "text-red-500"}>
                    AAA {result.passesAAA ? "✓" : "✗"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
