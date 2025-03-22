
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VayaButton } from '@/components/ui/vaya-button';
import { VayaCard } from '@/components/ui/vaya-card';
import { StoryText, StoryHeading, StoryQuote, StoryDivider, StoryCitation } from '@/components/ui/story-text';
import { Grid, Container, FlexBox } from '@/components/ui/grid-layout';

export const StoryShowcase: React.FC = () => {
  return (
    <Container maxWidth="xl" className="py-8">
      <h1 className="text-3xl font-heading font-semibold mb-6">Story Typography Showcase</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Specialized typography components for multilingual story presentation
      </p>
      
      <Grid cols={2} gap={6} className="mb-12">
        <VayaCard elevation={2}>
          <CardHeader>
            <CardTitle>English Stories</CardTitle>
            <CardDescription>Using Georgia for traditional storytelling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <StoryHeading level={2} size="lg">The Old Family Farm</StoryHeading>
            
            <StoryText>
              I remember the first time I visited my grandfather's farm in Gujarat. The mango trees were heavy with fruit, and the air was filled with the scent of jasmine and spices from grandmother's kitchen.
            </StoryText>
            
            <StoryQuote>
              "Those were the days when time moved more slowly. We would spend hours sitting under the banyan tree, listening to grandfather's stories of his childhood."
            </StoryQuote>
            
            <StoryText size="sm" color="muted">
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
        </VayaCard>
        
        <VayaCard variant="purple" elevation={2}>
          <CardHeader>
            <CardTitle>Multilingual Support</CardTitle>
            <CardDescription>Gujarati and Hindi typography</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <StoryHeading level={2} size="lg" language="gujarati">પરિવારની વાર્તાઓ</StoryHeading>
            
            <StoryText language="gujarati">
              અમારા પરિવારની વાર્તાઓ પેઢી દર પેઢી આગળ વધતી રહી છે. દરેક કહાની આપણા સંસ્કૃતિક વારસાનો એક ભાગ છે જે આપણી ઓળખને આકાર આપે છે.
            </StoryText>
            
            <StoryDivider />
            
            <StoryHeading level={2} size="lg" language="hindi">परिवार की कहानियाँ</StoryHeading>
            
            <StoryText language="hindi">
              हमारे परिवार की कहानियाँ पीढ़ी दर पीढ़ी आगे बढ़ती रही हैं। हर कहानी हमारी सांस्कृतिक विरासत का एक हिस्सा है जो हमारी पहचान को आकार देती है।
            </StoryText>
            
            <StoryQuote language="hindi">
              "कहानियों के माध्यम से हम अपने पूर्वजों से जुड़े रहते हैं और अपनी परंपराओं को आगे बढ़ाते हैं।"
            </StoryQuote>
          </CardContent>
          <CardFooter>
            <FlexBox gap={2}>
              <VayaButton variant="secondary">Read More</VayaButton>
              <VayaButton variant="ghost">Translate</VayaButton>
            </FlexBox>
          </CardFooter>
        </VayaCard>
      </Grid>
      
      <h2 className="text-2xl font-heading font-semibold mb-4">Elevation System</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Standardized shadow depths for different components based on our 5-level system
      </p>
      
      <Grid cols={5} gap={4} className="mb-12">
        {[1, 2, 3, 4, 5].map((level) => (
          <VayaCard 
            key={level} 
            elevation={level as 1 | 2 | 3 | 4 | 5}
            className="h-32 flex items-center justify-center"
          >
            <p className="text-xl font-medium">Level {level}</p>
          </VayaCard>
        ))}
      </Grid>
      
      <h2 className="text-2xl font-heading font-semibold mb-4">Color System</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Our primary color palette with coral, purple, and green accents
      </p>
      
      <Grid cols={3} gap={4} className="mb-12">
        <VayaCard padding="lg">
          <div className="space-y-4">
            <div className="h-24 bg-vaya-coral rounded-lg flex items-end p-3">
              <p className="text-white font-medium">Coral</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 bg-vaya-coral-light rounded"></div>
              <div className="h-12 bg-vaya-coral rounded"></div>
              <div className="h-12 bg-vaya-coral-dark rounded"></div>
            </div>
            <p className="text-sm text-center">#FF7675</p>
          </div>
        </VayaCard>
        
        <VayaCard padding="lg">
          <div className="space-y-4">
            <div className="h-24 bg-vaya-purple rounded-lg flex items-end p-3">
              <p className="text-white font-medium">Purple</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 bg-vaya-purple-light rounded"></div>
              <div className="h-12 bg-vaya-purple rounded"></div>
              <div className="h-12 bg-vaya-purple-dark rounded"></div>
            </div>
            <p className="text-sm text-center">#6C5CE7</p>
          </div>
        </VayaCard>
        
        <VayaCard padding="lg">
          <div className="space-y-4">
            <div className="h-24 bg-vaya-green rounded-lg flex items-end p-3">
              <p className="text-white font-medium">Green</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 bg-vaya-green-light rounded"></div>
              <div className="h-12 bg-vaya-green rounded"></div>
              <div className="h-12 bg-vaya-green-dark rounded"></div>
            </div>
            <p className="text-sm text-center">#4CD137</p>
          </div>
        </VayaCard>
      </Grid>
      
      <h2 className="text-2xl font-heading font-semibold mb-4">Button System</h2>
      <VayaCard className="mb-12">
        <CardContent className="py-8">
          <Grid cols={4} gap={3}>
            <div className="space-y-4">
              <p className="text-sm font-medium">Default</p>
              <VayaButton>Default Button</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Secondary</p>
              <VayaButton variant="secondary">Secondary</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Tertiary</p>
              <VayaButton variant="tertiary">Tertiary</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Outline</p>
              <VayaButton variant="outline">Outline</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Small</p>
              <VayaButton size="sm">Small</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Medium</p>
              <VayaButton size="md">Medium</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Large</p>
              <VayaButton size="lg">Large</VayaButton>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium">Loading</p>
              <VayaButton isLoading>Loading</VayaButton>
            </div>
          </Grid>
        </CardContent>
      </VayaCard>
      
      <h2 className="text-2xl font-heading font-semibold mb-4">Responsive Grid System</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        8px grid system for consistent spacing and layout
      </p>
      
      <VayaCard className="mb-12">
        <CardContent className="py-8">
          <Grid responsive gap={4}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div 
                key={item}
                className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
              >
                <p className="text-xl font-medium">Grid Item {item}</p>
              </div>
            ))}
          </Grid>
        </CardContent>
      </VayaCard>
    </Container>
  );
};

export default StoryShowcase;
