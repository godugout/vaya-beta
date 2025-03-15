
import React, { useState } from 'react';
import { Mic, Image, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface StoryEditorProps {
  storyContent: string;
  isRecording: boolean;
  themeStyles: {
    borderAccent: string;
    bgAccent: string;
    button: string;
  };
  onContentChange: (content: string) => void;
  onToggleRecording: () => void;
  onSubmit: () => void;
}

export const StoryEditor: React.FC<StoryEditorProps> = ({
  storyContent,
  isRecording,
  themeStyles,
  onContentChange,
  onToggleRecording,
  onSubmit
}) => {
  return (
    <div className={cn(
      "border rounded-lg p-4 transition-all",
      isRecording ? `${themeStyles.borderAccent} ring-4 ring-red-500/10` : ""
    )}>
      <Textarea
        placeholder="Share your story or memory..."
        className="min-h-[150px] border-0 focus-visible:ring-0 px-0 py-2 resize-none"
        value={storyContent}
        onChange={(e) => onContentChange(e.target.value)}
      />
      
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={onToggleRecording}
            className={isRecording ? `${themeStyles.bgAccent} text-white` : ""}
          >
            <Mic size={18} />
          </Button>
          <Button variant="outline" size="icon">
            <Image size={18} />
          </Button>
        </div>
        
        <Button 
          variant={themeStyles.button}
          disabled={!storyContent.trim()}
          onClick={onSubmit}
        >
          Share Story
          <Send size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
