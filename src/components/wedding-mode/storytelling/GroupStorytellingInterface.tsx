
import React, { useState } from 'react';
import { Users, BookOpenText, Mic, Send, Image, Clock, ArrowRight } from 'lucide-react';
import { useWeddingMode } from '../WeddingModeProvider';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { SuccessAnimation } from '@/components/animation/SuccessAnimation';

interface StoryPrompt {
  id: string;
  title: string;
  description: string;
}

interface StoryContribution {
  id: string;
  contributorName: string;
  contributorAvatar?: string;
  content: string;
  timestamp: Date;
}

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
  
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      button: 'autumn',
      borderAccent: 'border-autumn',
      bgAccent: 'bg-autumn',
    },
    modern: {
      accent: 'text-water',
      button: 'water',
      borderAccent: 'border-water',
      bgAccent: 'bg-water',
    },
    rustic: {
      accent: 'text-forest',
      button: 'forest',
      borderAccent: 'border-forest',
      bgAccent: 'bg-forest',
    }
  };
  
  const currentTheme = themeStyles[theme];
  
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
              <AnimatedContainer variant="scale" className="py-12 text-center">
                <SuccessAnimation 
                  size="lg" 
                  message="Your story has been added to the collection!" 
                />
                <Button 
                  variant="link" 
                  className={cn("mt-4", currentTheme.accent)}
                  onClick={() => setSubmittedStory(false)}
                >
                  Add another story
                </Button>
              </AnimatedContainer>
            ) : (
              <>
                <div className="mb-4">
                  <h3 className="text-xl font-medium mb-2">{storyTitle}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {allPrompts.map(prompt => (
                      <Button 
                        key={prompt.id}
                        variant={activePromptId === prompt.id ? currentTheme.button : "outline"}
                        size="sm"
                        onClick={() => selectPrompt(prompt.id)}
                      >
                        {prompt.title}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className={cn(
                  "border rounded-lg p-4 transition-all",
                  isRecording ? `${currentTheme.borderAccent} ring-4 ring-red-500/10` : ""
                )}>
                  <Textarea
                    placeholder="Share your story or memory..."
                    className="min-h-[150px] border-0 focus-visible:ring-0 px-0 py-2 resize-none"
                    value={storyContent}
                    onChange={(e) => setStoryContent(e.target.value)}
                  />
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={handleToggleRecording}
                        className={isRecording ? `${currentTheme.bgAccent} text-white` : ""}
                      >
                        <Mic size={18} />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Image size={18} />
                      </Button>
                    </div>
                    
                    <Button 
                      variant={currentTheme.button}
                      disabled={!storyContent.trim()}
                      onClick={handleSubmit}
                    >
                      Share Story
                      <Send size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="browse">
            <div className="space-y-4">
              {allContributions.map((contribution) => (
                <AnimatedContainer 
                  key={contribution.id} 
                  variant="fade" 
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={contribution.contributorAvatar} />
                      <AvatarFallback className={cn("text-white", currentTheme.bgAccent)}>
                        {contribution.contributorName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">{contribution.contributorName}</h4>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Clock size={12} className="mr-1" />
                          {contribution.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{contribution.content}</p>
                    </div>
                  </div>
                </AnimatedContainer>
              ))}
              
              <div className="text-center pt-4">
                <Button variant="outline" className="gap-2">
                  View More Stories <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </AnimatedContainer>
    </div>
  );
};
