
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LanguageSelector } from '@/components/nav/LanguageSelector';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Languages, EyeOff, VolumeX, Mic, ZoomIn } from 'lucide-react';
import { AnimationSettings } from '@/components/accessibility/AnimationSettings';
import { VayaCard } from '@/components/ui/vaya-card';
import { FadeIn } from '@/components/animation/FadeIn';
import { useAnimation } from '@/components/animation/AnimationProvider';

const Settings = () => {
  const { isReduced } = useAnimation();
  const [simplified, setSimplified] = React.useState(false);
  const [voiceNavigation, setVoiceNavigation] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);
  const [largeText, setLargeText] = React.useState(false);
  const [screenReader, setScreenReader] = React.useState(false);

  const toggleSimplifiedView = (checked: boolean) => {
    setSimplified(checked);
    document.documentElement.classList.toggle('simplified-nav', checked);
  };

  return (
    <div className="container max-w-4xl py-8">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="account-email">Email</Label>
                  <p id="account-email" className="text-sm text-gray-500 dark:text-gray-400">
                    Your current email is: user@example.com
                  </p>
                </div>
                
                <div className="space-y-1">
                  <Label>Language</Label>
                  <LanguageSelector />
                </div>
                
                <div className="pt-4">
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how Vaya looks and feels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="theme-toggle" className="font-medium text-base">Theme Mode</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Choose between light and dark mode
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
                
                <AnimationSettings />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="simplified-toggle" className="font-medium text-base">Simplified View</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Larger text and controls for easier viewing
                    </p>
                  </div>
                  <Switch 
                    id="simplified-toggle" 
                    checked={simplified}
                    onCheckedChange={toggleSimplifiedView}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="accessibility">
            <VayaCard>
              <CardHeader>
                <CardTitle>Accessibility Settings</CardTitle>
                <CardDescription>
                  Make Vaya more accessible for your needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Vision</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ZoomIn size={18} className="text-gray-500" />
                        <Label htmlFor="large-text">Larger Text</Label>
                      </div>
                      <Switch 
                        id="large-text" 
                        checked={largeText}
                        onCheckedChange={setLargeText}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check size={18} className="text-gray-500" />
                        <Label htmlFor="high-contrast">High Contrast</Label>
                      </div>
                      <Switch 
                        id="high-contrast" 
                        checked={highContrast}
                        onCheckedChange={setHighContrast}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <EyeOff size={18} className="text-gray-500" />
                        <Label htmlFor="screen-reader">Screen Reader Support</Label>
                      </div>
                      <Switch 
                        id="screen-reader" 
                        checked={screenReader}
                        onCheckedChange={setScreenReader}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Audio & Speech</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mic size={18} className="text-gray-500" />
                        <Label htmlFor="voice-navigation">Voice Navigation</Label>
                      </div>
                      <Switch 
                        id="voice-navigation" 
                        checked={voiceNavigation}
                        onCheckedChange={setVoiceNavigation}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <VolumeX size={18} className="text-gray-500" />
                        <Label htmlFor="reduce-sounds">Reduce Sounds</Label>
                      </div>
                      <Switch 
                        id="reduce-sounds" 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Languages size={18} className="text-gray-500" />
                        <Label htmlFor="caption-videos">Caption Videos</Label>
                      </div>
                      <Switch 
                        id="caption-videos" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="secondary" size="sm">
                    Reset to Defaults
                  </Button>
                </div>
              </CardContent>
            </VayaCard>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Control when and how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive notification emails for important updates
                    </p>
                  </div>
                  <Switch id="email-notifications" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-notifications" className="font-medium">System Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show browser notifications for new stories and memories
                    </p>
                  </div>
                  <Switch id="system-notifications" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Manage your privacy and data preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="data-collection" className="font-medium">Data Collection</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow anonymous usage data to help improve Vaya
                    </p>
                  </div>
                  <Switch id="data-collection" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="location-services" className="font-medium">Location Services</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Use your location for nearby family suggestions
                    </p>
                  </div>
                  <Switch id="location-services" />
                </div>
                
                <div className="pt-4 border-t mt-4">
                  <Button variant="outline" size="sm">
                    Download Your Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
};

export default Settings;
