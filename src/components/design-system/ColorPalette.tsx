
import React from 'react';
import { colors } from '@/styles/theme/colors';
import { forestStreamColors } from '@/styles/theme/colors/forestStream';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';

interface ColorBlockProps {
  color: string;
  name: string;
  value?: string;
}

const ColorBlock = ({ color, name, value }: ColorBlockProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  return (
    <div className="space-y-1.5">
      <div 
        className="h-16 w-full rounded-md border border-gray-200 dark:border-gray-800" 
        style={{ backgroundColor: color }}
      />
      <div className="text-sm font-medium">{name}</div>
      {value && <div className="text-xs text-muted-foreground">{value}</div>}
    </div>
  );
};

export const ColorPalette = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Color Palette</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
          Our color palette is inspired by nature and the Forest Stream artwork, creating a harmonious and calming visual experience.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Forest Stream Colors</CardTitle>
          <CardDescription>
            The primary color palette inspired by our natural environment artwork
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <ColorBlock color={forestStreamColors.forest} name="Forest" value={forestStreamColors.forest} />
            <ColorBlock color={forestStreamColors.water} name="Water" value={forestStreamColors.water} />
            <ColorBlock color={forestStreamColors.leaf} name="Leaf" value={forestStreamColors.leaf} />
            <ColorBlock color={forestStreamColors.autumn} name="Autumn" value={forestStreamColors.autumn} />
            <ColorBlock color={forestStreamColors.sky} name="Sky" value={forestStreamColors.sky} />
            <ColorBlock color={forestStreamColors.mountain} name="Mountain" value={forestStreamColors.mountain} />
            <ColorBlock color={forestStreamColors.sand} name="Sand" value={forestStreamColors.sand} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Colors</CardTitle>
          <CardDescription>
            Colors associated with specific features in the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <ColorBlock color={forestStreamColors.primary} name="Primary" value={forestStreamColors.primary} />
            <ColorBlock color={forestStreamColors.secondary} name="Secondary" value={forestStreamColors.secondary} />
            <ColorBlock color={forestStreamColors.accent} name="Accent" value={forestStreamColors.accent} />
            <ColorBlock color={forestStreamColors.highlight} name="Highlight" value={forestStreamColors.highlight} />
            <ColorBlock color={forestStreamColors.success} name="Success" value={forestStreamColors.success} />
            <ColorBlock color={forestStreamColors.warning} name="Warning" value={forestStreamColors.warning} />
            <ColorBlock color={forestStreamColors.error} name="Error" value={forestStreamColors.error} />
            <ColorBlock color={forestStreamColors.info} name="Info" value={forestStreamColors.info} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dark Mode</CardTitle>
          <CardDescription>
            Dark mode variations of our colors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <ColorBlock color={forestStreamColors.dark.primary} name="Primary" value={forestStreamColors.dark.primary} />
            <ColorBlock color={forestStreamColors.dark.secondary} name="Secondary" value={forestStreamColors.dark.secondary} />
            <ColorBlock color={forestStreamColors.dark.background} name="Background" value={forestStreamColors.dark.background} />
            <ColorBlock color={forestStreamColors.dark.surface} name="Surface" value={forestStreamColors.dark.surface} />
            <ColorBlock color={forestStreamColors.dark.text} name="Text" value={forestStreamColors.dark.text} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gradients</CardTitle>
          <CardDescription>
            Gradient combinations for backgrounds and accents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div 
                className="h-20 w-full rounded-md" 
                style={{ background: "linear-gradient(135deg, #154734 0%, #94C11E 100%)" }}
              />
              <p className="mt-2 text-sm">Forest Gradient</p>
              <code className="text-xs text-muted-foreground">linear-gradient(135deg, #154734 0%, #94C11E 100%)</code>
            </div>
            <div>
              <div 
                className="h-20 w-full rounded-md" 
                style={{ background: "linear-gradient(135deg, #449EBA 0%, #86CAE9 100%)" }}
              />
              <p className="mt-2 text-sm">Water Gradient</p>
              <code className="text-xs text-muted-foreground">linear-gradient(135deg, #449EBA 0%, #86CAE9 100%)</code>
            </div>
            <div>
              <div 
                className="h-20 w-full rounded-md" 
                style={{ background: "linear-gradient(135deg, #F2992D 0%, #D94843 100%)" }}
              />
              <p className="mt-2 text-sm">Autumn Gradient</p>
              <code className="text-xs text-muted-foreground">linear-gradient(135deg, #F2992D 0%, #D94843 100%)</code>
            </div>
            <div>
              <div 
                className="h-20 w-full rounded-md" 
                style={{ background: "linear-gradient(135deg, #86CAE9 0%, #5EACBA 100%)" }}
              />
              <p className="mt-2 text-sm">Sky Gradient</p>
              <code className="text-xs text-muted-foreground">linear-gradient(135deg, #86CAE9 0%, #5EACBA 100%)</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
