
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const TypographyShowcase: React.FC = () => {
  return (
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
  );
};
