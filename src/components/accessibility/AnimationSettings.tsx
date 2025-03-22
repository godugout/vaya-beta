
import React from 'react';
import { useAnimation } from '@/components/animation/AnimationProvider';
import { RadioGroup } from '@/components/input/FormControls';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';

export function AnimationSettings() {
  const { preference, setPreference } = useAnimation();

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Label className="font-medium text-base">Motion & Animation</Label>
        <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-1 flex items-center justify-center">
          <Info size={14} className="text-gray-500" />
        </div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Control how animations and transitions appear throughout the application.
      </p>
      
      <RadioGroup
        name="animation-preference"
        value={preference}
        onChange={(value) => setPreference(value as 'full' | 'reduced' | 'none')}
        options={[
          { 
            value: 'full', 
            label: 'Full animations', 
            description: 'Experience all animations and transitions as designed.'
          },
          { 
            value: 'reduced', 
            label: 'Reduced motion', 
            description: 'Simpler animations for improved accessibility and reduced visual stimulation.'
          },
          { 
            value: 'none', 
            label: 'No animations', 
            description: 'Turn off all non-essential animations and transitions.'
          },
        ]}
      />
    </div>
  );
}
