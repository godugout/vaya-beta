
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAnimation } from '@/components/animation/AnimationProvider';
import { AnimationPreference } from '@/types/animation';

export const AnimationSettings = () => {
  const { animationPreference, setAnimationPreference } = useAnimation();
  const [selectedPreference, setSelectedPreference] = useState<AnimationPreference>(animationPreference);

  const handleSave = () => {
    setAnimationPreference(selectedPreference);
    localStorage.setItem('animationPreference', selectedPreference);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Animation Settings</CardTitle>
        <CardDescription>
          Choose how animations are displayed throughout the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedPreference} 
          onValueChange={(value: AnimationPreference) => setSelectedPreference(value)}
          className="space-y-4"
        >
          <div className="flex items-start space-x-3">
            <RadioGroupItem id="full" value="full" />
            <div className="grid gap-1.5">
              <Label htmlFor="full" className="font-medium">
                Full Animations
              </Label>
              <p className="text-sm text-muted-foreground">
                Display all animations at normal speed
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <RadioGroupItem id="reduced" value="reduced" />
            <div className="grid gap-1.5">
              <Label htmlFor="reduced" className="font-medium">
                Reduced Animations
              </Label>
              <p className="text-sm text-muted-foreground">
                Simplify and reduce the speed of animations
              </p>
            </div>
          </div>
        </RadioGroup>
        
        <Button onClick={handleSave} className="mt-6">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default AnimationSettings;
