
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StoryPoem, StoryStanza, StoryVerse } from '@/components/ui/story-text';

export const PoetryExample: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Poetry Components</CardTitle>
        <CardDescription>Specialized components for displaying poetry</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <StoryPoem 
          title="The Road Not Taken" 
          author="Robert Frost" 
          year="1916"
          size="md"
        >
          <StoryStanza>
            <StoryVerse>Two roads diverged in a yellow wood,</StoryVerse>
            <StoryVerse>And sorry I could not travel both</StoryVerse>
            <StoryVerse>And be one traveler, long I stood</StoryVerse>
            <StoryVerse>And looked down one as far as I could</StoryVerse>
            <StoryVerse isLast>To where it bent in the undergrowth;</StoryVerse>
          </StoryStanza>
          
          <StoryStanza>
            <StoryVerse>Then took the other, as just as fair,</StoryVerse>
            <StoryVerse>And having perhaps the better claim,</StoryVerse>
            <StoryVerse>Because it was grassy and wanted wear;</StoryVerse>
            <StoryVerse>Though as for that the passing there</StoryVerse>
            <StoryVerse isLast>Had worn them really about the same,</StoryVerse>
          </StoryStanza>
        </StoryPoem>

        <StoryPoem 
          title="गिरिजाकुमार माथुर की कविता" 
          author="गिरिजाकुमार माथुर"
          language="hindi"
          centered={true}
        >
          <StoryStanza language="hindi">
            <StoryVerse language="hindi">तुम्हारे लिए</StoryVerse>
            <StoryVerse language="hindi">इस बँधी मुट्ठी में</StoryVerse>
            <StoryVerse language="hindi">धूल के साथ</StoryVerse>
            <StoryVerse language="hindi" isLast>बन्द है मेरी वाणी।</StoryVerse>
          </StoryStanza>
        </StoryPoem>
        
        <StoryPoem 
          title="सुभाषितम्" 
          author="भर्तृहरि"
          year="5th century CE"
          language="sanskrit"
          centered={true}
        >
          <StoryStanza language="sanskrit">
            <StoryVerse language="sanskrit">सत्यं ब्रूयात् प्रियं ब्रूयात्</StoryVerse>
            <StoryVerse language="sanskrit">न ब्रूयात् सत्यमप्रियम्।</StoryVerse>
            <StoryVerse language="sanskrit">प्रियं च नानृतं ब्रूयात्</StoryVerse>
            <StoryVerse language="sanskrit" isLast>एष धर्मः सनातनः॥</StoryVerse>
          </StoryStanza>
        </StoryPoem>
      </CardContent>
    </Card>
  );
};

export default PoetryExample;
