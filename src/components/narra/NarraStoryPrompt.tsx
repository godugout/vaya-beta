
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface NarraStoryPromptProps {
  prompt: string;
  onClick: (prompt: string) => void;
}

export const NarraStoryPrompt = ({ prompt, onClick }: NarraStoryPromptProps) => {
  return (
    <Button
      variant="outline"
      className="w-full justify-between group hover:border-lovable-blue hover:text-lovable-blue transition-colors text-left h-auto py-3"
      onClick={() => onClick(prompt)}
    >
      <span className="text-sm">{prompt}</span>
      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Button>
  );
};
