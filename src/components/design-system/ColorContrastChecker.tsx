
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useColorContrast } from '@/hooks/useColorContrast';
import { ContrastResultRow } from './typography/ContrastResultRow';

export const ColorContrastChecker = () => {
  const { results } = useColorContrast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Contrast Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result, index) => (
            <ContrastResultRow key={index} result={result} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
