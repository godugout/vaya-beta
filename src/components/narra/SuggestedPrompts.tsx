
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PromptItem } from '@/components/chat/hooks/types';
import { allPrompts } from '@/data/hanumanPrompts';

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
  className?: string;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  onSelectPrompt,
  className = '',
}) => {
  // Get a random selection of 3 prompts
  const getRandomPrompts = (count: number = 3): PromptItem[] => {
    const shuffled = [...allPrompts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const suggestedPrompts = getRandomPrompts();

  return (
    <Card className={`p-4 ${className}`}>
      <h3 className="text-lg font-medium mb-3">Try asking about:</h3>
      <div className="flex flex-col gap-2">
        {suggestedPrompts.map((prompt) => (
          <Button
            key={prompt.id}
            variant="ghost"
            className="justify-start text-left hover:bg-muted"
            onClick={() => onSelectPrompt(prompt.content.en)}
          >
            {prompt.content.en}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default SuggestedPrompts;
