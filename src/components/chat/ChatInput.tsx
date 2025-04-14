
import { Paperclip, Mic, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ChatInputProps {
  // Support the old API
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  
  // Support the new API
  input?: string;
  setInput?: (value: string) => void;
  handleSend?: () => void;
  handleMorePrompts?: () => void;
  setIsRecording?: (isRecording: boolean) => void;
  isSpanish?: boolean;
}

export const ChatInput = ({
  // Handle both old and new API
  value,
  onChange,
  onSubmit,
  input,
  setInput,
  handleSend,
  handleMorePrompts,
  setIsRecording,
  isSpanish
}: ChatInputProps) => {
  // Use whichever values are provided
  const currentValue = input ?? value ?? '';
  const handleChange = (newValue: string) => {
    if (setInput) setInput(newValue);
    if (onChange) onChange(newValue);
  };
  
  const handleSubmit = () => {
    if (handleSend) handleSend();
    if (onSubmit) onSubmit();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-3 bg-white border-t border-gray-200">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-500"
        >
          <Paperclip size={20} />
        </Button>
        
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-gray-100 border-0 rounded-full py-2.5 px-4 focus:ring-2 focus:ring-indigo-500"
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-500"
          onClick={() => setIsRecording && setIsRecording(true)}
        >
          <Mic size={20} />
        </Button>
        
        <Button 
          size="icon" 
          className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
          onClick={handleSubmit}
          disabled={!currentValue.trim()}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};
