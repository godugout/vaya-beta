
import { useState, useEffect, useRef } from "react";
import { Mic, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface TranscriptionInputProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onRequestVoice?: () => void;
  isRecording?: boolean;
  className?: string;
  maxLength?: number;
  disabled?: boolean;
}

export const TranscriptionInput = ({
  value: externalValue,
  placeholder = "Type or record your story...",
  onChange,
  onRequestVoice,
  isRecording = false,
  className,
  maxLength,
  disabled = false,
}: TranscriptionInputProps) => {
  const [value, setValue] = useState(externalValue || "");
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
      setCharCount(externalValue.length);
    }
  }, [externalValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    
    setValue(newValue);
    setCharCount(newValue.length);
    onChange?.(newValue);
  };

  const handleCopy = () => {
    if (!value) return;
    
    navigator.clipboard.writeText(value).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: "The transcription has been copied to your clipboard.",
        });
      },
      () => {
        toast({
          title: "Failed to copy",
          description: "Could not copy text to clipboard.",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "min-h-32 resize-y rounded-xl p-4 text-base",
            isRecording && "border-red-500 pr-12"
          )}
          disabled={disabled || isRecording}
        />
        
        {isRecording ? (
          <div className="absolute right-3 top-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white">
                <Mic className="h-4 w-4" />
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="absolute right-3 top-3 flex gap-2">
            {value && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleCopy}
                disabled={disabled}
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
            
            {onRequestVoice && (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={onRequestVoice}
                disabled={disabled}
              >
                <Mic className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
      
      {maxLength && (
        <div className="flex justify-end">
          <span className={cn(
            "text-xs",
            charCount > maxLength * 0.9 
              ? charCount >= maxLength 
                ? "text-red-500" 
                : "text-amber-500" 
              : "text-gray-500"
          )}>
            {charCount} / {maxLength}
          </span>
        </div>
      )}
    </div>
  );
};
