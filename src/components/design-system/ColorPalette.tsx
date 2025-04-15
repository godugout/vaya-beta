
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { colors } from '@/styles/theme/colors';
import { vayaColors } from '@/styles/theme/colors/vaya';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ColorSwatchProps {
  color: string;
  name: string;
  hex?: string;
  textClass?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, name, hex, textClass = "text-white" }) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex || color);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: `${name}: ${hex || color}`,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div 
      className="relative group cursor-pointer rounded-md overflow-hidden transition-all hover:shadow-md"
      onClick={copyToClipboard}
      style={{ backgroundColor: color }}
    >
      <div className="p-6 h-24 flex flex-col justify-between">
        <div className={cn("text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity", textClass)}>
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </div>
        <div className={cn("space-y-1", textClass)}>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs opacity-90">{hex || color}</div>
        </div>
      </div>
    </div>
  );
};

export const ColorPalette = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Color Palette</h1>
        <p className="text-gray-500 dark:text-dark-text-secondary">
          Vaya's color system is designed for accessibility and visual harmony
        </p>
      </div>
      
      {/* Primary Brand Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Primary Brand Colors</CardTitle>
          <CardDescription>The core colors that form Vaya's brand identity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch 
              color={vayaColors.primary} 
              name="Primary Black" 
              hex="#000000" 
              textClass="text-white" 
            />
            <ColorSwatch 
              color={vayaColors.secondary} 
              name="Secondary Purple" 
              hex="#6C5CE7" 
              textClass="text-white" 
            />
            <ColorSwatch 
              color={vayaColors.accent.purple} 
              name="Accent Purple" 
              hex="#9b87f5" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color={vayaColors.accent.turquoise} 
              name="Accent Turquoise" 
              hex="#0EA5E9" 
              textClass="text-white" 
            />
          </div>
        </CardContent>
      </Card>
      
      {/* UI Semantic Colors */}
      <Card>
        <CardHeader>
          <CardTitle>UI Semantic Colors</CardTitle>
          <CardDescription>Colors with specific meanings for user interfaces</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch 
              color={vayaColors.ui.success} 
              name="Success" 
              hex="#10B981" 
              textClass="text-white" 
            />
            <ColorSwatch 
              color={vayaColors.ui.warning} 
              name="Warning" 
              hex="#F59E0B" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color={vayaColors.ui.error} 
              name="Error" 
              hex="#DC2626" 
              textClass="text-white" 
            />
            <ColorSwatch 
              color={vayaColors.ui.info} 
              name="Info" 
              hex="#0EA5E9" 
              textClass="text-white" 
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Text Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Text Colors</CardTitle>
          <CardDescription>Typography color options for different contexts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch 
              color={vayaColors.text.primary} 
              name="Text Primary" 
              hex="#000000" 
              textClass="text-white" 
            />
            <ColorSwatch 
              color={vayaColors.text.secondary} 
              name="Text Secondary" 
              hex="#4B5563" 
              textClass="text-white" 
            />
            <ColorSwatch 
              color={vayaColors.text.tertiary} 
              name="Text Tertiary" 
              hex="#9CA3AF" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color={vayaColors.text.inverse} 
              name="Text Inverse" 
              hex="#FFFFFF" 
              textClass="text-black" 
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Background Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Background Colors</CardTitle>
          <CardDescription>Surface colors for different UI elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch 
              color={vayaColors.background.white} 
              name="Background White" 
              hex="#FFFFFF" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color={vayaColors.background.light} 
              name="Background Light" 
              hex="#F9FAFB" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color={vayaColors.background.subtle} 
              name="Background Subtle" 
              hex="#F3F4F6" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color={vayaColors.background.dark} 
              name="Background Dark" 
              hex="#111827" 
              textClass="text-white" 
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Feature Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Feature-Specific Colors</CardTitle>
          <CardDescription>Special colors assigned to product features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch 
              color={vayaColors.stories} 
              name="Stories" 
              hex="#6C5CE7" 
              textClass="text-white" 
            />
            <ColorSwatch 
              color={vayaColors.memories} 
              name="Memories" 
              hex="#FF7675" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color={vayaColors.capsules} 
              name="Capsules" 
              hex="#38BDF8" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color="#0000" 
              name="Chat Background" 
              hex="#F8F9FA" 
              textClass="text-black" 
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Gray Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Gray Scale</CardTitle>
          <CardDescription>Neutrals for UI elements and typography</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <ColorSwatch 
              color={vayaColors.gray[100]} 
              name="Gray 100" 
              hex="#F3F4F6" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color={vayaColors.gray[300]} 
              name="Gray 300" 
              hex="#D1D5DB" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color={vayaColors.gray[500]} 
              name="Gray 500" 
              hex="#6B7280" 
              textClass="text-white" 
            />
            <ColorSwatch 
              color={vayaColors.gray[700]} 
              name="Gray 700" 
              hex="#374151" 
              textClass="text-white" 
            />
            <ColorSwatch 
              color={vayaColors.gray[900]} 
              name="Gray 900" 
              hex="#111827" 
              textClass="text-white" 
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Forest Stream Theme */}
      <Card>
        <CardHeader>
          <CardTitle>Forest Stream Theme</CardTitle>
          <CardDescription>Nature-inspired colors from the Forest Stream motif</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <ColorSwatch 
              color="rgb(var(--color-sky))" 
              name="Sky" 
              hex="#86CAE9" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color="rgb(var(--color-forest))" 
              name="Forest" 
              hex="#154734" 
              textClass="text-white" 
            />
            <ColorSwatch 
              color="rgb(var(--color-water))" 
              name="Water" 
              hex="#449EBA" 
              textClass="text-white" 
            />
            <ColorSwatch 
              color="rgb(var(--color-leaf))" 
              name="Leaf" 
              hex="#94C11E" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color="rgb(var(--color-autumn))" 
              name="Autumn" 
              hex="#F2992D" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color="rgb(var(--color-mountain))" 
              name="Mountain" 
              hex="#5EACBA" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color="rgb(var(--color-sand))" 
              name="Sand" 
              hex="#C4B295" 
              textClass="text-black" 
            />
            <ColorSwatch 
              color="rgb(var(--color-ui-purple))" 
              name="UI Purple" 
              hex="#6F56AF" 
              textClass="text-white" 
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Gradient Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Gradient Palette</CardTitle>
          <CardDescription>Gradients for visual interest and hierarchy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-24 rounded-md" style={{ background: "linear-gradient(135deg, #86CAE9 0%, #449EBA 100%)" }}>
              <div className="h-full flex items-end p-4 text-white">
                <div>
                  <div className="font-medium">Sky-Water Gradient</div>
                  <div className="text-xs">linear-gradient(135deg, #86CAE9 0%, #449EBA 100%)</div>
                </div>
              </div>
            </div>
            
            <div className="h-24 rounded-md" style={{ background: "linear-gradient(135deg, #F2992D 0%, #D94843 100%)" }}>
              <div className="h-full flex items-end p-4 text-white">
                <div>
                  <div className="font-medium">Autumn Gradient</div>
                  <div className="text-xs">linear-gradient(135deg, #F2992D 0%, #D94843 100%)</div>
                </div>
              </div>
            </div>
            
            <div className="h-24 rounded-md" style={{ background: "linear-gradient(135deg, #94C11E 0%, #154734 100%)" }}>
              <div className="h-full flex items-end p-4 text-white">
                <div>
                  <div className="font-medium">Forest Gradient</div>
                  <div className="text-xs">linear-gradient(135deg, #94C11E 0%, #154734 100%)</div>
                </div>
              </div>
            </div>
            
            <div className="h-24 rounded-md" style={{ background: "linear-gradient(135deg, #6F56AF 0%, #9B87F5 100%)" }}>
              <div className="h-full flex items-end p-4 text-white">
                <div>
                  <div className="font-medium">Purple Gradient</div>
                  <div className="text-xs">linear-gradient(135deg, #6F56AF 0%, #9B87F5 100%)</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Color Picker Tool */}
      <Card>
        <CardHeader>
          <CardTitle>Color Picker Tool</CardTitle>
          <CardDescription>Create and explore custom colors for your brand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="color-picker">Hex Color</Label>
                <div className="flex space-x-2">
                  <Input id="color-picker" type="color" className="w-12 h-10 p-1" />
                  <Input id="color-hex" type="text" placeholder="#000000" className="flex-1" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color-opacity">Opacity</Label>
                <Input id="color-opacity" type="range" min="0" max="100" defaultValue="100" />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <div className="space-y-4">
                <Label>Color Variations</Label>
                <div className="grid grid-cols-5 gap-2 h-32">
                  <div className="bg-black/90 rounded-l-md"></div>
                  <div className="bg-black/70"></div>
                  <div className="bg-black/50"></div>
                  <div className="bg-black/30"></div>
                  <div className="bg-black/10 rounded-r-md"></div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white border rounded-md p-4 flex items-center justify-center">
                    <div className="bg-black text-white px-3 py-1 text-sm">Text on White</div>
                  </div>
                  <div className="bg-gray-100 border rounded-md p-4 flex items-center justify-center">
                    <div className="bg-black text-white px-3 py-1 text-sm">Text on Light</div>
                  </div>
                  <div className="bg-black border rounded-md p-4 flex items-center justify-center">
                    <div className="bg-white text-black px-3 py-1 text-sm">Text on Black</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
