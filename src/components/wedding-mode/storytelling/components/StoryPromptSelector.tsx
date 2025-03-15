
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { gridUnits } from '../utils/themeUtils';

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
  themeButton: "forest" | "water" | "autumn";
}

export const StoryPromptSelector: React.FC<StoryPromptSelectorProps> = ({
  prompts,
  storyTitle,
  activePromptId,
  onSelectPrompt,
  themeButton
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  return (
    <div className="mb-4">
      <h3 className={cn(
        "text-xl font-medium mb-2",
        "font-heading tracking-tight"
      )}>
        {storyTitle}
      </h3>
      
      {/* Responsive layout for prompts */}
      <div className={cn(
        "flex flex-wrap gap-2",
        isMobile ? "grid grid-cols-2" : "flex-row",
        "mb-4"
      )} 
      style={{ 
        gap: gridUnits(1),
        marginBottom: gridUnits(3)
      }}>
        {prompts.map(prompt => (
          <Button 
            key={prompt.id}
            variant={activePromptId === prompt.id ? themeButton : "outline"}
            size={isMobile ? "sm" : "default"}
            onClick={() => onSelectPrompt(prompt.id)}
            className={cn(
              "transition-all duration-200 ease-in-out",
              "focus:ring-2 focus:ring-offset-2",
              activePromptId === prompt.id && "shadow-md transform"
            )}
            title={prompt.description}
          >
            <span className="truncate">
              {prompt.title}
            </span>
          </Button>
        ))}
      </div>
      
      {/* Show selected prompt description */}
      {activePromptId && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-body italic pl-2 border-l-2 border-gray-200 dark:border-gray-700">
          {prompts.find(p => p.id === activePromptId)?.description}
        </div>
      )}
    </div>
  );
};
