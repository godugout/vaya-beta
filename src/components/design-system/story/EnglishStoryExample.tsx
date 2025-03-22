
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VayaButton } from '@/components/ui/vaya-button';
import { StoryText, StoryHeading, StoryQuote, StoryDivider, StoryCitation } from '@/components/ui/story-text';
import { FlexBox } from '@/components/ui/grid-layout';

export const EnglishStoryExample: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>English Stories</CardTitle>
        <CardDescription>Using Georgia for traditional storytelling</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <StoryHeading>The Old Family Farm</StoryHeading>
        
        <StoryText>
          I remember the first time I visited my grandfather's farm in Gujarat. The mango trees were heavy with fruit, and the air was filled with the scent of jasmine and spices from grandmother's kitchen.
        </StoryText>
        
        <StoryQuote>
          "Those were the days when time moved more slowly. We would spend hours sitting under the banyan tree, listening to grandfather's stories of his childhood."
        </StoryQuote>
        
        <StoryText size="sm" textColor="muted">
          The old stone well still stands at the center of what used to be our family land. Sometimes I can still hear the sounds of the brass bucket hitting the water when I close my eyes.
        </StoryText>
        
        <StoryDivider />
        
        <FlexBox align="center" gap={4}>
          <img 
            src="https://images.unsplash.com/photo-1518564603990-3dba3d061399?auto=format&fit=crop&q=80&w=100&h=100" 
            alt="Old farm" 
            className="rounded-full w-12 h-12 object-cover"
          />
          <div>
            <p className="font-medium">Jayesh Patel</p>
            <StoryCitation>Recorded Summer 2022</StoryCitation>
          </div>
        </FlexBox>
      </CardContent>
      <CardFooter>
        <VayaButton variant="outline" leftIcon={<span>🔊</span>}>Listen to Story</VayaButton>
      </CardFooter>
    </Card>
  );
};
