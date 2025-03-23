
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HanumanMessage } from "@/types/hanuman";
import { Mic, Send, StopCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessages from "@/components/hanuman/ChatMessages";
import SuggestedPrompts from "@/components/hanuman/SuggestedPrompts";

interface EnhancedHanumanChatProps {
  activeCategory: string;
}

export const EnhancedHanumanChat: React.FC<EnhancedHanumanChatProps> = ({ activeCategory }) => {
  const [messages, setMessages] = useState<HanumanMessage[]>([
    { role: "assistant", content: "Namaste! I am your guide to exploring your family's heritage and stories. How may I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample prompts based on category
  const categoryPrompts: Record<string, string[]> = {
    family: [
      "Tell me about your grandparents and where they came from.",
      "What family traditions have been passed down through generations?",
      "Do you know the story of how your parents or grandparents met?"
    ],
    traditions: [
      "What special dishes are made for family celebrations?",
      "Are there any unique customs your family follows during festivals?",
      "How do you celebrate major life events in your family?"
    ],
    stories: [
      "What's your earliest childhood memory?",
      "Can you share a story about overcoming a challenge in your life?",
      "Do you have a favorite family vacation memory?"
    ],
    wisdom: [
      "What's the best piece of advice you've received from an elder?",
      "What life lessons would you want to pass on to future generations?",
      "How has your family's wisdom helped you navigate life's challenges?"
    ],
    celebrations: [
      "What was your favorite family celebration and why?",
      "How have family celebrations changed over the years?",
      "Are there any unique ways your family celebrates holidays?"
    ]
  };

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Effect to update suggestions when category changes
  useEffect(() => {
    // Add a "category change" message when the user switches categories
    if (messages.length > 0 && activeCategory) {
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: `Now exploring: ${getCategoryName(activeCategory)}. You can ask me anything about this topic or try one of the suggested prompts below.` 
        }
      ]);
    }
  }, [activeCategory]);

  const getCategoryName = (categoryId: string): string => {
    const category = categoryPrompts[categoryId];
    return category ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : categoryId;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: input }]);
    
    // Simulate AI response
    setIsLoading(true);
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: `I've received your question about "${input}". This is a placeholder response in our demo interface. In the full version, you would receive a thoughtful, AI-generated response based on your family context and the selected category.` 
        }
      ]);
      setIsLoading(false);
    }, 1500);
    
    setInput("");
    
    // Focus the input after sending
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    // Simulate recording end and transcription after 3 seconds
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInput("This is a simulated transcription from your voice recording.");
      }, 3000);
    }
  };

  return (
    <Card className="hanuman-chat-container bg-black/30 backdrop-blur-sm rounded-lg border border-hanuman-orange/20 h-[75vh] flex flex-col overflow-hidden">
      {/* Chat header with subtle shine effect */}
      <div className="p-4 border-b border-hanuman-orange/20 bg-gradient-to-r from-black/40 via-hanuman-orange/10 to-black/40">
        <h2 className="text-lg font-semibold text-hanuman-gold flex items-center">
          <span className="mr-2">🕉️</span> 
          Family Stories Explorer
        </h2>
        <p className="text-sm text-white/70">
          Share and discover your family's unique journey through time
        </p>
      </div>
      
      {/* Chat message area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </div>
      
      {/* Suggested prompts */}
      <div className="px-4 py-2 border-t border-hanuman-orange/20 bg-black/20">
        <p className="text-xs text-hanuman-gold mb-2">Suggested questions:</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <AnimatePresence mode="sync">
            {categoryPrompts[activeCategory]?.map((prompt, index) => (
              <motion.div
                key={prompt}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handlePromptSelect(prompt)}
                  className="whitespace-nowrap text-xs bg-hanuman-orange/10 border-hanuman-orange/30 text-white hover:bg-hanuman-orange/20"
                >
                  {prompt}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Input area with recording visualization */}
      <div className="border-t border-hanuman-orange/20 p-4 bg-black/40">
        {isRecording && (
          <div className="mb-2 p-2 bg-hanuman-orange/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 h-3 w-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <p className="text-sm text-white">Recording in progress...</p>
                </div>
                
                {/* Simple waveform visualization */}
                <div className="mt-2 flex items-center h-8 gap-0.5">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-hanuman-orange/60 rounded-full"
                      style={{ 
                        height: `${Math.max(3, Math.sin(i * 0.5) * 15 + Math.random() * 15)}px`,
                        animationDelay: `${i * 50}ms`,
                        animation: 'pulse 1s infinite'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={toggleRecording} 
                size="sm" 
                variant="destructive"
                className="ml-2"
              >
                <StopCircle className="h-4 w-4 mr-1" />
                Stop
              </Button>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-black/30 border-hanuman-orange/30 focus:border-hanuman-gold/50 text-white"
            disabled={isRecording}
          />
          
          {!isRecording ? (
            <>
              <Button 
                type="button"
                onClick={toggleRecording}
                className="bg-hanuman-purple/80 hover:bg-hanuman-purple text-white"
              >
                <Mic className="h-4 w-4" />
              </Button>
              
              <Button 
                type="submit"
                className="bg-hanuman-orange/80 hover:bg-hanuman-orange text-white"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </>
          ) : null}
        </form>
      </div>
    </Card>
  );
};
