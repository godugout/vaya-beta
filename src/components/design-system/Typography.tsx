
import React from 'react';
import { FontFamilyShowcase } from './typography/FontFamilyShowcase';
import { TypeScale } from './typography/TypeScale';
import { FontWeights } from './typography/FontWeights';
import { TextStyles } from './typography/TextStyles';
import { FontPairings } from './typography/FontPairings';
import { TypographyPlayground } from './typography/TypographyPlayground';
import { ColorContrastChecker } from './ColorContrastChecker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fontFamilies, textStyles } from '@/styles/typography';

export const Typography = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Typography</h1>
        <p className="text-gray-500 dark:text-dark-text-secondary">
          A comprehensive type system designed for clarity and consistency
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Typography System</CardTitle>
          <CardDescription>
            Our new centralized font management system provides consistent typography across the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Available Font Families</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(fontFamilies).map(([name, family]) => (
                <div key={name} className="p-3 border rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">{name}</p>
                  <p style={{ fontFamily: family }} className="text-xl">
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Text Style Examples</h3>
            <div className="space-y-4">
              {Object.entries(textStyles).map(([name, style]) => (
                <div key={name} className="p-3 border rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">{name}</p>
                  <p style={style as React.CSSProperties} className="truncate">
                    The quick brown fox jumps over the lazy dog
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {style.fontFamily}, {style.fontSize}, weight: {style.fontWeight}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Utility Classes</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The typography system provides utility classes for consistent styling:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Example with utility classes</p>
                <p className="text-style-h2">Heading Example</p>
                <p className="text-style-body">
                  This is body text using our typography utility classes.
                </p>
                <p className="text-style-caption text-muted-foreground">
                  And this is caption text with utilities.
                </p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Component usage with hook</p>
                <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                  {`
const { getStyle } = useTypography();
const headingStyle = getStyle('h2');
const bodyStyle = getStyle('body');

return (
  <div>
    <h2 style={headingStyle}>Heading</h2>
    <p style={bodyStyle}>Body text</p>
  </div>
);
                  `}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <FontFamilyShowcase />
      <FontPairings />
      <TypeScale />
      <FontWeights />
      <TextStyles />
      <TypographyPlayground />
      <ColorContrastChecker />
    </div>
  );
};

