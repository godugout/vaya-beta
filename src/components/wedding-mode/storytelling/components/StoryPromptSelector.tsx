
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface StoryPrompt {
  id: string;
  title: string;
  description: string;
}

interface StoryPromptSelectorProps {
  prompts: StoryPrompt[];
  storyTitle: string;
  activePromptId: string | null;
  onSelectPrompt: (promptId: string) => void;
  themeButton: "forest" | "water" | "autumn"; // Use literal types instead of string
}

export const StoryPromptSelector: React.FC<StoryPromptSelectorProps> = ({
  prompts,
  storyTitle,
  activePromptId,
  onSelectPrompt,
  themeButton
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-medium mb-2">{storyTitle}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {prompts.map(prompt => (
          <Button 
            key={prompt.id}
            variant={activePromptId === prompt.id ? themeButton : "outline"}
            size="sm"
            onClick={() => onSelectPrompt(prompt.id)}
          >
            {prompt.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
