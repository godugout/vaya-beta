
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useColorContrast } from '@/hooks/useColorContrast';
import { ContrastResultRow } from './typography/ContrastResultRow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ColorContrastChecker = () => {
  const { results } = useColorContrast();
  
  const textResults = results.filter(r => r.combination.includes('Text'));
  const uiResults = results.filter(r => r.combination.includes('UI') || r.combination.includes('on White'));
  const brandResults = results.filter(r => r.combination.includes('Primary') || r.combination.includes('Secondary'));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-2xl">Color Contrast Analysis</CardTitle>
        <CardDescription>WCAG compliance check for color combinations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Results</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="ui">UI Elements</TabsTrigger>
            <TabsTrigger value="brand">Brand Colors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {results.map((result, index) => (
              <ContrastResultRow key={index} result={result} />
            ))}
          </TabsContent>
          
          <TabsContent value="text" className="space-y-4">
            {textResults.map((result, index) => (
              <ContrastResultRow key={index} result={result} />
            ))}
          </TabsContent>
          
          <TabsContent value="ui" className="space-y-4">
            {uiResults.map((result, index) => (
              <ContrastResultRow key={index} result={result} />
            ))}
          </TabsContent>
          
          <TabsContent value="brand" className="space-y-4">
            {brandResults.map((result, index) => (
              <ContrastResultRow key={index} result={result} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
