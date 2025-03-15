
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LanguageSelector } from '@/components/nav/LanguageSelector';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Settings = () => {
  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
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
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme-toggle">Theme Mode</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose between light and dark mode
                  </p>
                </div>
                <ThemeToggle />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="simplified-toggle">Simplified View</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Larger text and controls for easier viewing
                  </p>
                </div>
                <Switch id="simplified-toggle" />
              </div>
            </CardContent>
          </Card>
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
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notification emails for important updates
                  </p>
                </div>
                <Switch id="email-notifications" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="system-notifications">System Notifications</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Show browser notifications for new stories and memories
                  </p>
                </div>
                <Switch id="system-notifications" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accessibility">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Settings</CardTitle>
              <CardDescription>
                Make Vaya more accessible for your needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="voice-navigation">Voice Navigation</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Navigate the app using voice commands
                  </p>
                </div>
                <Switch id="voice-navigation" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reduced-motion">Reduce Motion</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Minimize animations throughout the application
                  </p>
                </div>
                <Switch id="reduced-motion" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
