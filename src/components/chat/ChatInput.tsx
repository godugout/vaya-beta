
import { Paperclip, Mic, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const ChatInput = ({ value, onChange, onSubmit }: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-500"
        >
          <Mic size={20} />
        </Button>
        
        <Button 
          size="icon" 
          className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
          onClick={onSubmit}
          disabled={!value.trim()}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};
