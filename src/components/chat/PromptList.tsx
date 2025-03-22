
import { Button } from "@/components/ui/button";
import { PromptItem } from "./hooks/types";

interface PromptListProps {
  prompts: PromptItem[];
  onSelect: (prompt: string) => void;
}

const PromptList = ({ prompts, onSelect }: PromptListProps) => {
  if (prompts.length === 0) {
    return (
      <div className="p-3 text-sm text-gray-500 text-center">
        No prompts available
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {prompts.map((prompt) => (
        <Button
          key={prompt.id}
          variant="ghost"
          className="w-full justify-start text-left whitespace-normal h-auto py-3 hover:bg-opacity-10 text-sm"
          onClick={() => onSelect(prompt.content)}
        >
          <span className="line-clamp-2">
            {prompt.content}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default PromptList;
