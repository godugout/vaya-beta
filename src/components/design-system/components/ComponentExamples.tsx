
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const ComponentExamples: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-heading font-semibold mb-6">Component Examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card Example */}
        <Card className="shadow-elevation-2">
          <CardHeader>
            <CardTitle>Family Memory</CardTitle>
            <CardDescription>Recorded on June 12, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-story text-base mb-4">
              "I remember the first time we visited the old family farm in Gujarat. The mango trees were heavy with fruit, and the air was filled with the scent of jasmine..."
            </p>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Jayesh Patel</p>
                <p className="text-xs text-gray-500">Great Grandfather</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">Listen</Button>
            <Button size="sm" className="bg-vaya-coral hover:bg-vaya-coral-dark">Share</Button>
          </CardFooter>
        </Card>

        {/* Interactive Components */}
        <Card className="shadow-elevation-2">
          <CardHeader>
            <CardTitle>Interactive Elements</CardTitle>
            <CardDescription>Based on the Vaya design system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-500">Buttons</h4>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-vaya-coral hover:bg-vaya-coral-dark">Primary</Button>
                <Button variant="outline">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-500">Badges</h4>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-vaya-coral">New</Badge>
                <Badge variant="outline">Badge</Badge>
                <Badge className="bg-vaya-purple">Feature</Badge>
                <Badge className="bg-vaya-green">Success</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-500">Avatars</h4>
              <div className="flex flex-wrap gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-vaya-coral">JP</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-vaya-purple">KP</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-vaya-green">RS</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
