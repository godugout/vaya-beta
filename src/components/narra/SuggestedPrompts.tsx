
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PromptItem } from "@/components/chat/hooks/types";
import { Sparkles } from "lucide-react";

interface SuggestedPromptsProps {
  prompts: PromptItem[];
  onSelect: (prompt: string) => void;
  isSpanish?: boolean;
}

const SuggestedPrompts = ({ prompts, onSelect, isSpanish = false }: SuggestedPromptsProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const displayPrompts = expanded ? prompts : prompts.slice(0, 3);
  
  return (
    <Card className="bg-black/40 border-white/10 backdrop-blur-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-autumn" />
          <h3 className="text-sm font-medium text-white">
            {isSpanish ? "Sugerencias de Preguntas" : "Suggested Prompts"}
          </h3>
        </div>
        
        <div className="flex flex-col gap-2">
          {displayPrompts.map((prompt) => (
            <Button
              key={prompt.id}
              variant="ghost"
              size="sm"
              className="justify-start text-left text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => onSelect(prompt.content)}
            >
              {prompt.content}
            </Button>
          ))}
        </div>
        
        {prompts.length > 3 && (
          <Button
            variant="link"
            className="mt-2 text-xs text-autumn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? (isSpanish ? "Mostrar menos" : "Show less")
              : (isSpanish ? "Mostrar más" : "Show more")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SuggestedPrompts;
