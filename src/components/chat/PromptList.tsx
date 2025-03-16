
import { Button } from "@/components/ui/button";

interface PromptListProps {
  prompts: { en: string; es: string }[];
  isSpanish: boolean;
  colorClasses: {
    bg: string;
    text: string;
    border: string;
  };
  onPromptSelect: (prompt: string) => void;
}

const PromptList = ({ prompts, isSpanish, colorClasses, onPromptSelect }: PromptListProps) => {
  if (prompts.length === 0) {
    return (
      <div className="p-3 text-sm text-gray-500 text-center">
        Loading prompts...
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {prompts.map((prompt, index) => (
        <Button
          key={index}
          variant="ghost"
          className={`w-full justify-start text-left whitespace-normal h-auto py-3 hover:bg-opacity-10 text-sm ${colorClasses.text} hover:${colorClasses.bg}`}
          onClick={() => onPromptSelect(isSpanish ? prompt.es : prompt.en)}
        >
          <span className="line-clamp-2">
            {isSpanish ? prompt.es : prompt.en}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default PromptList;
