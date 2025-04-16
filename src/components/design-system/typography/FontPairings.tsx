
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const fontPairExamples = [
  {
    name: "Primary Pairing",
    heading: "Montserrat",
    body: "Inter",
    example: {
      title: "Building Family Stories",
      text: "Capture and preserve your family's most precious memories with our intuitive storytelling tools."
    }
  },
  {
    name: "Story Pairing",
    heading: "Montserrat",
    body: "Georgia",
    example: {
      title: "Heritage Chronicles",
      text: "Explore the rich tapestry of your family's history through beautifully crafted narratives."
    }
  },
  {
    name: "Modern Pairing",
    heading: "Inter",
    body: "Inter",
    example: {
      title: "Digital Time Capsules",
      text: "Create lasting digital memories that can be shared across generations."
    }
  },
];

export const FontPairings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Font Pairings</CardTitle>
        <CardDescription>Recommended typography combinations for different contexts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fontPairExamples.map((pair) => (
            <div key={pair.name} className="p-4 border rounded-md space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{pair.name}</p>
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground">Heading: {pair.heading}</p>
                  <p className="text-xs text-muted-foreground">Body: {pair.body}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 
                  className="text-xl mb-2"
                  style={{ fontFamily: `${pair.heading}, sans-serif` }}
                >
                  {pair.example.title}
                </h3>
                <p 
                  className="text-sm text-muted-foreground"
                  style={{ fontFamily: `${pair.body}, sans-serif` }}
                >
                  {pair.example.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
