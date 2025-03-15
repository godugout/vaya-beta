
import React, { useState } from 'react';
import { Users, BookOpenText } from 'lucide-react';
import { useWeddingMode } from '../WeddingModeProvider';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { getThemeStyles } from './utils/themeUtils';
import { StoryPromptSelector, StoryPrompt } from './components/StoryPromptSelector';
import { StoryEditor } from './components/StoryEditor';
import { StoryContributions, StoryContribution } from './components/StoryContributions';
import { SuccessMessage } from './components/SuccessMessage';

interface GroupStorytellingInterfaceProps {
  storyTitle?: string;
  prompts?: StoryPrompt[];
  contributions?: StoryContribution[];
  onContribute?: (content: string) => void;
}

export const GroupStorytellingInterface: React.FC<GroupStorytellingInterfaceProps> = ({
  storyTitle = "Our First Meeting",
  prompts = [],
  contributions = [],
  onContribute
}) => {
  const { theme } = useWeddingMode();
  const [storyContent, setStoryContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activePromptId, setActivePromptId] = useState<string | null>(null);
  const [submittedStory, setSubmittedStory] = useState(false);
  
  // Mock data if no prompts are provided
  const defaultPrompts: StoryPrompt[] = [
    { id: '1', title: 'First Impression', description: 'What was your first impression of the couple?' },
    { id: '2', title: 'Favorite Memory', description: 'What is your favorite memory with the couple?' },
    { id: '3', title: 'Love Story', description: 'What part of their love story inspires you?' },
    { id: '4', title: 'Wishes', description: 'What wishes do you have for their future together?' },
  ];
  
  const allPrompts = prompts.length > 0 ? prompts : defaultPrompts;
  
  // Mock data if no contributions are provided
  const defaultContributions: StoryContribution[] = [
    {
      id: '1',
      contributorName: 'Aunt Mary',
      content: 'I remember when they first met at my dinner party. They couldn't stop talking to each other all night!',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: '2',
      contributorName: 'Uncle John',
      content: 'Their first dance at our family reunion was something special. Everyone could see the chemistry.',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    },
  ];
  
  const allContributions = contributions.length > 0 ? contributions : defaultContributions;
  
  const currentTheme = getThemeStyles(theme);
  
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };
  
  const handleSubmit = () => {
    if (storyContent.trim()) {
      if (onContribute) {
        onContribute(storyContent);
      }
      setSubmittedStory(true);
      setStoryContent('');
      setTimeout(() => setSubmittedStory(false), 3000);
    }
  };
  
  const selectPrompt = (promptId: string) => {
    const prompt = allPrompts.find(p => p.id === promptId);
    if (prompt) {
      setActivePromptId(promptId);
      setStoryContent(prev => prev ? prev : prompt.description);
    }
  };
  
  const handleResetForm = () => {
    setSubmittedStory(false);
  };
  
  return (
    <div className="p-6">
      <AnimatedContainer variant="fade" className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <BookOpenText size={40} className={cn("mx-auto mb-2", currentTheme.accent)} />
          <h2 className="text-3xl font-heading font-bold">Collaborative Story</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Share your memories and well-wishes for the couple
          </p>
        </div>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="create">Add Your Story</TabsTrigger>
            <TabsTrigger value="browse">Browse Stories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-6">
            {submittedStory ? (
              <SuccessMessage 
                accentClass={currentTheme.accent}
                onAddAnother={handleResetForm}
              />
            ) : (
              <>
                <StoryPromptSelector
                  prompts={allPrompts}
                  storyTitle={storyTitle}
                  activePromptId={activePromptId}
                  onSelectPrompt={selectPrompt}
                  themeButton={currentTheme.button}
                />
                
                <StoryEditor
                  storyContent={storyContent}
                  isRecording={isRecording}
                  themeStyles={currentTheme}
                  onContentChange={setStoryContent}
                  onToggleRecording={handleToggleRecording}
                  onSubmit={handleSubmit}
                />
              </>
            )}
          </TabsContent>
          
          <TabsContent value="browse">
            <StoryContributions 
              contributions={allContributions}
              themeStyles={currentTheme}
            />
          </TabsContent>
        </Tabs>
      </AnimatedContainer>
    </div>
  );
};
