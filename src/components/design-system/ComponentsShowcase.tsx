
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle2, Info, Component } from 'lucide-react';

export const ComponentsShowcase = () => {
  const [activeTab, setActiveTab] = useState('buttons');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Component Library</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
          Explore the core UI components that make up the Vaya design system. Use these components as building blocks for creating consistent interfaces.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="avatars">Avatars</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="selects">Selects</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold">Button Variants</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2 items-center">
              <Button>Default</Button>
              <span className="text-sm">Default</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button variant="destructive">Destructive</Button>
              <span className="text-sm">Destructive</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button variant="outline">Outline</Button>
              <span className="text-sm">Outline</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button variant="secondary">Secondary</Button>
              <span className="text-sm">Secondary</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button variant="ghost">Ghost</Button>
              <span className="text-sm">Ghost</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button variant="link">Link</Button>
              <span className="text-sm">Link</span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mt-8">Button Sizes</h2>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-2 items-center">
              <Button size="sm">Small</Button>
              <span className="text-sm">Small</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button size="default">Default</Button>
              <span className="text-sm">Default</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button size="lg">Large</Button>
              <span className="text-sm">Large</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="inputs" className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold">Input Fields</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="default">Default Input</Label>
              <Input id="default" placeholder="Enter some text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled">Disabled Input</Label>
              <Input id="disabled" placeholder="Disabled input" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="with-icon" className="flex items-center gap-1">
                <Info size={16} /> Input with Label Icon
              </Label>
              <Input id="with-icon" placeholder="Input with label icon" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Checkbox Example</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cards" className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold">Card Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
                <CardDescription>View your account details and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Your account is in good standing with no outstanding issues.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Credit Card</span>
                    <span className="text-sm font-medium">•••• 4242</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm">Expires</span>
                    <span className="text-sm font-medium">06/2025</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Update Payment Method</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-1">
                <div className="flex items-center space-x-2">
                  <Checkbox id="emails" />
                  <label htmlFor="emails" className="text-sm">Email Notifications</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sms" />
                  <label htmlFor="sms" className="text-sm">SMS Notifications</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="push" />
                  <label htmlFor="push" className="text-sm">Push Notifications</label>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Save Preferences</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold">Badge Variants</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2 items-center">
              <Badge>Default</Badge>
              <span className="text-sm">Default</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Badge variant="secondary">Secondary</Badge>
              <span className="text-sm">Secondary</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Badge variant="destructive">Destructive</Badge>
              <span className="text-sm">Destructive</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Badge variant="outline">Outline</Badge>
              <span className="text-sm">Outline</span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mt-8">Example Usage</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Feature</Badge>
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Improvement</Badge>
              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">In Progress</Badge>
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Bug</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">New</Badge>
              <span>Modern card payment solutions for your business</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="avatars" className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold">Avatar Examples</h2>
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col gap-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-sm">Large</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-sm">Default</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-sm">Small</span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mt-8">Fallback Examples</h2>
          <div className="flex flex-wrap gap-4">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>CK</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold">Alert Examples</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 flex items-start gap-3">
              <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Information</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">This action will update your profile information.</p>
              </div>
            </div>
            
            <div className="p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Success</h3>
                <p className="text-sm text-green-700 dark:text-green-400">Your changes have been saved successfully.</p>
              </div>
            </div>
            
            <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Error</h3>
                <p className="text-sm text-red-700 dark:text-red-400">There was a problem processing your request.</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="selects" className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold">Select Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="framework">Default Select</Label>
              <Select>
                <SelectTrigger id="framework" className="w-full">
                  <SelectValue placeholder="Select a framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="svelte">Svelte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="theme">Theme Select</Label>
              <Select defaultValue="light">
                <SelectTrigger id="theme" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
