
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorInput } from '@/components/family/theme/ColorInput';

export const ThemeCustomizer = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState({
    primaryColor: '#FF7675',
    secondaryColor: '#6C5CE7',
    textColor: '#2D3436',
    accentColor: '#449EBA',
    backgroundColor: '#FFFFFF',
    borderRadius: 'rounded',
    spacing: 'compact',
    fontFamily: 'Inter Tight'
  });

  const handleColorChange = (key: string, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const saveTheme = () => {
    toast({
      title: "Theme Updated",
      description: "Your custom theme has been saved.",
    });
  };

  const exportTheme = () => {
    const themeString = JSON.stringify(theme, null, 2);
    const blob = new Blob([themeString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vaya-theme.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Theme Exported",
      description: "Your theme has been exported as JSON.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Theme Customizer</h1>
        <p className="text-gray-500 dark:text-dark-text-secondary">
          Customize your brand's visual identity and preview in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>Define your brand's color palette</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ColorInput 
                id="primaryColor" 
                label="Primary Color" 
                value={theme.primaryColor} 
                onChange={(value) => handleColorChange('primaryColor', value)} 
              />
              <ColorInput 
                id="secondaryColor" 
                label="Secondary Color" 
                value={theme.secondaryColor} 
                onChange={(value) => handleColorChange('secondaryColor', value)} 
              />
              <ColorInput 
                id="accentColor" 
                label="Accent Color" 
                value={theme.accentColor} 
                onChange={(value) => handleColorChange('accentColor', value)} 
              />
              <ColorInput 
                id="textColor" 
                label="Text Color" 
                value={theme.textColor} 
                onChange={(value) => handleColorChange('textColor', value)} 
              />
              <ColorInput 
                id="backgroundColor" 
                label="Background Color" 
                value={theme.backgroundColor} 
                onChange={(value) => handleColorChange('backgroundColor', value)} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography & Spacing</CardTitle>
              <CardDescription>Define your brand's typographic style</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select 
                  value={theme.fontFamily} 
                  onValueChange={(value) => handleSelectChange('fontFamily', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter Tight">Inter Tight</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                    <SelectItem value="Georgia">Georgia</SelectItem>
                    <SelectItem value="Architects Daughter">Architects Daughter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="borderRadius">Border Radius</Label>
                <Select 
                  value={theme.borderRadius} 
                  onValueChange={(value) => handleSelectChange('borderRadius', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select border radius" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="rounded-sm">Small</SelectItem>
                    <SelectItem value="rounded">Medium</SelectItem>
                    <SelectItem value="rounded-lg">Large</SelectItem>
                    <SelectItem value="rounded-xl">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="spacing">Spacing Density</Label>
                <Select 
                  value={theme.spacing} 
                  onValueChange={(value) => handleSelectChange('spacing', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select spacing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={exportTheme}>Export Theme</Button>
              <Button onClick={saveTheme}>Save Theme</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See your brand theme in action</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="components" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="components">Components</TabsTrigger>
                  <TabsTrigger value="typography">Typography</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                </TabsList>
                
                <TabsContent value="components" className="p-4 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Buttons</h3>
                    <div className="flex flex-wrap gap-3" style={{ fontFamily: theme.fontFamily }}>
                      <Button 
                        style={{ 
                          backgroundColor: theme.primaryColor,
                          color: isDarkColor(theme.primaryColor) ? '#FFFFFF' : '#000000'
                        }}
                        className={theme.borderRadius}
                      >
                        Primary Button
                      </Button>
                      <Button 
                        style={{ 
                          backgroundColor: theme.secondaryColor,
                          color: isDarkColor(theme.secondaryColor) ? '#FFFFFF' : '#000000'
                        }}
                        className={theme.borderRadius}
                      >
                        Secondary Button
                      </Button>
                      <Button 
                        variant="outline" 
                        style={{ 
                          borderColor: theme.primaryColor,
                          color: theme.textColor
                        }}
                        className={theme.borderRadius}
                      >
                        Outline Button
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Cards</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card 
                        style={{ 
                          borderColor: theme.accentColor,
                          borderRadius: getBorderRadiusPixels(theme.borderRadius)
                        }}
                      >
                        <CardHeader style={{ fontFamily: theme.fontFamily, color: theme.textColor }}>
                          <CardTitle>Card Title</CardTitle>
                          <CardDescription>Card description text</CardDescription>
                        </CardHeader>
                        <CardContent style={{ fontFamily: theme.fontFamily, color: theme.textColor }}>
                          <p>This is sample content inside a card component.</p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            size="sm"
                            style={{ 
                              backgroundColor: theme.primaryColor,
                              color: isDarkColor(theme.primaryColor) ? '#FFFFFF' : '#000000',
                              fontFamily: theme.fontFamily
                            }}
                            className={theme.borderRadius}
                          >
                            Action
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <Card
                        style={{ 
                          background: theme.backgroundColor,
                          borderRadius: getBorderRadiusPixels(theme.borderRadius)
                        }}
                      >
                        <CardHeader>
                          <div 
                            style={{ 
                              height: '100px', 
                              background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                              borderTopLeftRadius: getBorderRadiusPixels(theme.borderRadius),
                              borderTopRightRadius: getBorderRadiusPixels(theme.borderRadius)
                            }}
                          />
                        </CardHeader>
                        <CardContent 
                          className="pt-4"
                          style={{ fontFamily: theme.fontFamily, color: theme.textColor }}
                        >
                          <h3 className="text-xl font-medium mb-2">Media Card</h3>
                          <p>Card with gradient header showcasing brand colors.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Form Controls</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label 
                          htmlFor="sample-input"
                          style={{ fontFamily: theme.fontFamily, color: theme.textColor }}
                        >
                          Input Field
                        </Label>
                        <Input 
                          id="sample-input" 
                          placeholder="Enter text..." 
                          style={{ 
                            fontFamily: theme.fontFamily,
                            borderColor: theme.accentColor,
                            borderRadius: getBorderRadiusPixels(theme.borderRadius)
                          }}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label 
                          htmlFor="sample-select"
                          style={{ fontFamily: theme.fontFamily, color: theme.textColor }}
                        >
                          Select Field
                        </Label>
                        <Select>
                          <SelectTrigger 
                            style={{ 
                              fontFamily: theme.fontFamily,
                              borderColor: theme.accentColor,
                              borderRadius: getBorderRadiusPixels(theme.borderRadius)
                            }}
                          >
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="typography" className="p-4 space-y-6">
                  <div className="space-y-6" style={{ fontFamily: theme.fontFamily, color: theme.textColor }}>
                    <div>
                      <h1 className="text-4xl font-bold mb-2">Heading 1</h1>
                      <p className="text-sm text-gray-500 dark:text-dark-text-tertiary">Font: {theme.fontFamily}, Size: 36px, Weight: Bold</p>
                    </div>
                    
                    <div>
                      <h2 className="text-3xl font-bold mb-2">Heading 2</h2>
                      <p className="text-sm text-gray-500 dark:text-dark-text-tertiary">Font: {theme.fontFamily}, Size: 30px, Weight: Bold</p>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">Heading 3</h3>
                      <p className="text-sm text-gray-500 dark:text-dark-text-tertiary">Font: {theme.fontFamily}, Size: 24px, Weight: Semibold</p>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Heading 4</h4>
                      <p className="text-sm text-gray-500 dark:text-dark-text-tertiary">Font: {theme.fontFamily}, Size: 20px, Weight: Semibold</p>
                    </div>
                    
                    <div>
                      <p className="text-base mb-2">Body Text (Base)</p>
                      <p className="text-sm text-gray-500 dark:text-dark-text-tertiary">Font: {theme.fontFamily}, Size: 16px, Weight: Regular</p>
                    </div>
                    
                    <div>
                      <p className="text-sm mb-2">Small Text</p>
                      <p className="text-sm text-gray-500 dark:text-dark-text-tertiary">Font: {theme.fontFamily}, Size: 14px, Weight: Regular</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="layout" className="p-4">
                  <div 
                    className="border p-4" 
                    style={{ 
                      backgroundColor: theme.backgroundColor,
                      color: theme.textColor,
                      fontFamily: theme.fontFamily,
                      borderRadius: getBorderRadiusPixels(theme.borderRadius)
                    }}
                  >
                    <div className="grid grid-cols-12 gap-2">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div 
                          key={i}
                          className="h-12 flex items-center justify-center text-xs"
                          style={{ 
                            backgroundColor: theme.primaryColor,
                            color: isDarkColor(theme.primaryColor) ? '#FFFFFF' : '#000000',
                            borderRadius: getBorderRadiusPixels(theme.borderRadius),
                            opacity: 0.7 + (i * 0.025)
                          }}
                        >
                          Col {i+1}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 space-y-2">
                      <h3 className="text-lg font-medium mb-2">Spacing Preview</h3>
                      <div className="flex space-x-2">
                        {["0.25rem", "0.5rem", "1rem", "1.5rem", "2rem", "3rem"].map((size, i) => (
                          <div 
                            key={i}
                            className="flex flex-col items-center"
                          >
                            <div 
                              style={{ 
                                width: size,
                                height: "2rem",
                                backgroundColor: theme.secondaryColor,
                                borderRadius: getBorderRadiusPixels(theme.borderRadius)
                              }}
                            />
                            <span className="text-xs mt-1">{size}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Responsive Layout</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div 
                              key={i}
                              className="p-4 flex items-center justify-center"
                              style={{ 
                                backgroundColor: hexToRgba(theme.accentColor, 0.2),
                                borderRadius: getBorderRadiusPixels(theme.borderRadius),
                                border: `1px solid ${theme.accentColor}`
                              }}
                            >
                              Responsive Cell {i+1}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper functions
function isDarkColor(hex: string): boolean {
  // Remove the # if it exists
  hex = hex.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if the color is dark
  return luminance < 0.5;
}

function getBorderRadiusPixels(radiusClass: string): string {
  switch (radiusClass) {
    case 'none': return '0px';
    case 'rounded-sm': return '0.125rem';
    case 'rounded': return '0.25rem';
    case 'rounded-lg': return '0.5rem';
    case 'rounded-xl': return '0.75rem';
    default: return '0.25rem';
  }
}

function hexToRgba(hex: string, alpha: number): string {
  hex = hex.replace('#', '');
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
