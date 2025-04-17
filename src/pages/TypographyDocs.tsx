
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fontFamilies, fontWeights, fontSizes, lineHeights, letterSpacings, textStyles } from '@/styles/typography';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const TypographyDocs = () => {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="space-y-6 mb-12">
        <h1 className="text-4xl font-bold">Typography System</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A comprehensive guide to typography styles, font families, and utility classes available in the design system.
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fonts">Font Families</TabsTrigger>
          <TabsTrigger value="sizes">Font Sizes</TabsTrigger>
          <TabsTrigger value="weights">Font Weights</TabsTrigger>
          <TabsTrigger value="styles">Text Styles</TabsTrigger>
          <TabsTrigger value="utilities">Utility Classes</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Typography System Overview</CardTitle>
              <CardDescription>
                Our typography system provides consistent text styling across the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Design Principles</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Consistent hierarchical structure</li>
                      <li>Optimized for readability across devices</li>
                      <li>Accessible contrast ratios (WCAG AA compliance)</li>
                      <li>Responsive text sizing with fluid typography</li>
                      <li>Consistent spacing and alignment</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Core Font Pairings</h2>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-md">
                        <p className="text-sm text-muted-foreground mb-1">Primary Pairing</p>
                        <h4 className="font-heading text-lg">Montserrat for Headings</h4>
                        <p className="font-body">Inter Tight for Body Text</p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <p className="text-sm text-muted-foreground mb-1">Story Text</p>
                        <h4 className="font-heading text-lg">Montserrat for Headings</h4>
                        <p style={{ fontFamily: 'Georgia, serif' }}>Georgia for Story Text</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Typography Showcase</h2>
                    <div className="space-y-4">
                      <h1 className="text-5xl font-bold font-heading">Heading 1</h1>
                      <h2 className="text-4xl font-bold font-heading">Heading 2</h2>
                      <h3 className="text-3xl font-semibold font-heading">Heading 3</h3>
                      <h4 className="text-2xl font-semibold font-heading">Heading 4</h4>
                      <h5 className="text-xl font-semibold font-heading">Heading 5</h5>
                      <h6 className="text-lg font-semibold font-heading">Heading 6</h6>
                      <p className="text-base">Body text in our main font</p>
                      <p className="text-sm text-muted-foreground">Small supporting text</p>
                      <p style={{ fontFamily: 'Architects Daughter, cursive' }} className="text-lg">
                        Handwritten style text
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Usage Guidelines</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium mb-2">Do</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Maintain hierarchy with appropriate headings</li>
                      <li>Use the predefined text styles for consistency</li>
                      <li>Ensure sufficient contrast for readability</li>
                      <li>Limit the use of decorative fonts to accents</li>
                      <li>Use utility classes for consistent styling</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium mb-2">Don't</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Mix too many font families in one view</li>
                      <li>Use extremely small font sizes (below 12px)</li>
                      <li>Override the established hierarchy</li>
                      <li>Use decorative fonts for large blocks of text</li>
                      <li>Create custom text styles outside the system</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Font Families Tab */}
        <TabsContent value="fonts" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Font Families</CardTitle>
              <CardDescription>
                Available font families used throughout the application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                {Object.entries(fontFamilies).map(([name, family]) => (
                  <div key={name} className="p-6 border rounded-md">
                    <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                      <h3 className="text-xl font-medium">{name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{family}</Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => copyToClipboard(`font-family: ${family};`, `${name} font`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p style={{ fontFamily: family as string }} className="text-2xl mb-4">
                      The quick brown fox jumps over the lazy dog
                    </p>
                    <p style={{ fontFamily: family as string }} className="text-lg">
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ <br />
                      abcdefghijklmnopqrstuvwxyz <br />
                      0123456789 !@#$%^&*()
                    </p>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Tailwind Class</p>
                          <code className="px-2 py-1 bg-muted rounded text-sm">
                            {name === 'main' ? 'font-sans' : 
                             name === 'heading' ? 'font-heading' : 
                             name === 'mono' ? 'font-mono' : 
                             name === 'architectsDaughter' ? 'font-architects-daughter' : 
                             `font-${name}`}
                          </code>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">CSS Variable</p>
                          <code className="px-2 py-1 bg-muted rounded text-sm">
                            var(--font-family-{name === 'architectsDaughter' ? 'architects-daughter' : name})
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Font Sizes Tab */}
        <TabsContent value="sizes" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Font Sizes</CardTitle>
              <CardDescription>
                Type scale based on 8px grid system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(fontSizes).map(([name, size]) => (
                    <div key={name} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center gap-4">
                        <div className="w-16 text-center p-2 bg-muted rounded">
                          <span className="text-sm">{name}</span>
                        </div>
                        <span style={{ fontSize: size }}>
                          Text at {size} size
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <code className="px-2 py-1 bg-muted rounded text-sm">
                          {size}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => copyToClipboard(`font-size: ${size};`, `${name} (${size})`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Fluid Typography</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(fontSizes).map(([name, size], index) => (
                      <div key={`fluid-${name}`} className="p-4 border rounded-md">
                        <p className="text-sm text-muted-foreground mb-2">
                          Responsive {name} text with clamp()
                        </p>
                        <p style={{ 
                          fontSize: `clamp(${parseFloat(size as string) * 0.75}rem, ${index + 1}vw, ${size})` 
                        }}>
                          This text scales responsively based on viewport width
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          <code className="px-2 py-1 bg-muted rounded text-xs">
                            {`font-size: clamp(${parseFloat(size as string) * 0.75}rem, ${index + 1}vw, ${size});`}
                          </code>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Font Weights Tab */}
        <TabsContent value="weights" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Font Weights</CardTitle>
              <CardDescription>
                Available font weights for creating visual hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(fontWeights).map(([name, weight]) => (
                  <div key={name} className="p-6 border rounded-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl">{name}</h3>
                      <Badge variant="outline">{weight}</Badge>
                    </div>
                    
                    <p style={{ fontWeight: weight as number }} className="text-2xl mb-6">
                      The quick brown fox jumps over the lazy dog
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tailwind Class</p>
                        <code className="px-2 py-1 bg-muted rounded text-sm">
                          font-{name}
                        </code>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">CSS Variable</p>
                        <code className="px-2 py-1 bg-muted rounded text-sm">
                          var(--font-weight-{name})
                        </code>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">CSS Property</p>
                        <code className="px-2 py-1 bg-muted rounded text-sm">
                          font-weight: {weight};
                        </code>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => copyToClipboard(`font-weight: ${weight};`, `${name} weight`)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Text Styles Tab */}
        <TabsContent value="styles" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Text Styles</CardTitle>
              <CardDescription>
                Predefined combinations of font properties for common use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                {Object.entries(textStyles).map(([name, style]) => (
                  <div key={name} className="p-6 border rounded-md">
                    <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                      <h3 className="text-xl font-medium">{name}</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8" 
                        onClick={() => copyToClipboard(
                          `.text-style-${name}`,
                          `${name} style class`
                        )}
                      >
                        <Copy className="h-3 w-3 mr-2" />
                        <span>Copy Class</span>
                      </Button>
                    </div>
                    
                    <p style={style as React.CSSProperties} className="mb-6">
                      The quick brown fox jumps over the lazy dog. 0123456789
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground mb-1">Font Family</p>
                        <code>
                          {(style as any).fontFamily}
                        </code>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground mb-1">Font Size</p>
                        <code>
                          {(style as any).fontSize}
                        </code>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground mb-1">Font Weight</p>
                        <code>
                          {(style as any).fontWeight}
                        </code>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground mb-1">Line Height</p>
                        <code>
                          {(style as any).lineHeight}
                        </code>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground mb-1">Letter Spacing</p>
                        <code>
                          {(style as any).letterSpacing || 'normal'}
                        </code>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Usage Example:</p>
                      <div className="bg-muted rounded-md p-3 overflow-x-auto">
                        <pre className="text-xs">
{`// Using utility class
<p className="text-style-${name}">Your text here</p>

// Using React hook
const { getStyle } = useTypography();
<p style={getStyle('${name}')}>Your text here</p>`}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Utility Classes Tab */}
        <TabsContent value="utilities" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Typography Utility Classes</CardTitle>
              <CardDescription>
                CSS utility classes for consistent typography styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">Font Family Utilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">font-main</p>
                      <p className="font-main text-lg">Main font text example</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">font-heading</p>
                      <p className="font-heading text-lg">Heading font text example</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">font-mono</p>
                      <p className="font-mono text-lg">Monospace font text example</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">font-architects-daughter</p>
                      <p className="font-architects-daughter text-lg">Handwritten font text example</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Font Weight Utilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">font-normal</p>
                      <p className="font-normal text-lg">Normal weight text</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">font-medium</p>
                      <p className="font-medium text-lg">Medium weight text</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">font-semibold</p>
                      <p className="font-semibold text-lg">Semibold weight text</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">font-bold</p>
                      <p className="font-bold text-lg">Bold weight text</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Text Size Utilities</h3>
                  <div className="space-y-4">
                    {['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map((size) => (
                      <div key={size} className="p-4 border rounded-md flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">text-{size}</p>
                          <p className={`text-${size}`}>Text in {size} size</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(`text-${size}`, `text-${size} class`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Line Height Utilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(lineHeights).map(([name, height]) => (
                      <div key={name} className="p-4 border rounded-md">
                        <p className="text-sm text-muted-foreground mb-1">leading-{name}</p>
                        <p className={`leading-${name} border-l-2 border-primary pl-2`}>
                          This text has a line height of {height}. This shows how multiple lines of text are spaced with this line height setting.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Composed Text Style Utilities</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">text-style-h1</p>
                      <p className="text-style-h1">H1 Style Text</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">text-style-body</p>
                      <p className="text-style-body">Body style text example showing normal paragraph styling with appropriate line height and spacing for comfortable reading in longer blocks of content.</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">text-style-caption</p>
                      <p className="text-style-caption">Caption style text for supporting information</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">text-style-handwritten</p>
                      <p className="text-style-handwritten">Handwritten style for personal touch</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TypographyDocs;
