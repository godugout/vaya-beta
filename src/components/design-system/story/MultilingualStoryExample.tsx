
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VayaButton } from '@/components/ui/vaya-button';
import { StoryText, StoryHeading, StoryQuote, StoryDivider } from '@/components/ui/story-text';
import { FlexBox } from '@/components/ui/grid-layout';

export const MultilingualStoryExample: React.FC = () => {
  return (
    <Card variant="purple" elevation={2}>
      <CardHeader>
        <CardTitle>Multilingual Support</CardTitle>
        <CardDescription>Gujarati and Hindi typography</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <StoryHeading language="gujarati">પરિવારની વાર્તાઓ</StoryHeading>
        
        <StoryText language="gujarati">
          અમારા પરિવારની વાર્તાઓ પેઢી દર પેઢી આગળ વધતી રહી છે. દરેક કહાની આપણા સંસ્કૃતિક વારસાનો એક ભાગ છે જે આપણી ઓળખને આકાર આપે છે.
        </StoryText>
        
        <StoryDivider />
        
        <StoryHeading language="hindi">परिवार की कहानियाँ</StoryHeading>
        
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
    </Card>
  );
};
