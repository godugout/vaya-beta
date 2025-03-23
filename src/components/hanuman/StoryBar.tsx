
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mic, StopCircle, Sparkles, MessageCircle, BookOpen, Image, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StoryBarProps {
  input: string;
  setInput: (input: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onPromptSelect: (prompt: string) => void;
  activeCategory: string;
  isRecording: boolean;
  toggleRecording: () => void;
  isLoading: boolean;
}

const StoryBar: React.FC<StoryBarProps> = ({
  input,
  setInput,
  onSendMessage,
  onPromptSelect,
  activeCategory,
  isRecording,
  toggleRecording,
  isLoading
}) => {
  const { isSpanish } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("text");

  // Sample prompts based on category (simplified for this component)
  const categoryPrompts: Record<string, string[]> = {
    family: [
      "Tell me about your grandparents and where they came from.",
      "What family traditions have been passed down through generations?",
    ],
    traditions: [
      "What special dishes are made for family celebrations?",
      "Are there any unique customs your family follows during festivals?",
    ],
    stories: [
      "What's your earliest childhood memory?",
      "Can you share a story about overcoming a challenge in your life?",
    ],
    wisdom: [
      "What's the best piece of advice you've received from an elder?",
      "What life lessons would you want to pass on to future generations?",
    ],
    celebrations: [
      "What was your favorite family celebration and why?",
      "How have family celebrations changed over the years?",
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(e);
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky bottom-0 left-0 right-0 z-20 border-t border-hanuman-orange/20 backdrop-blur-lg bg-gradient-to-b from-amber-900/20 via-amber-800/10 to-green-900/15 shadow-[0_-4px_20px_rgba(255,126,0,0.1)]"
    >
      <div className="container max-w-7xl mx-auto">
        <div className="p-3">
          {/* Mode Tabs */}
          <div className="mb-3">
            <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-black/20 border border-hanuman-orange/20">
                <TabsTrigger 
                  value="text" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-hanuman-primary/20 data-[state=active]:to-hanuman-saffron/20 data-[state=active]:border-hanuman-gold/20 data-[state=active]:text-hanuman-gold"
                >
                  <MessageCircle className="h-4 w-4 mr-1.5" />
                  <span>{isSpanish ? "Texto" : "Text"}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="voice" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-hanuman-primary/20 data-[state=active]:to-hanuman-saffron/20 data-[state=active]:border-hanuman-gold/20 data-[state=active]:text-hanuman-gold"
                >
                  <Mic className="h-4 w-4 mr-1.5" />
                  <span>{isSpanish ? "Voz" : "Voice"}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="prompts" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-hanuman-primary/20 data-[state=active]:to-hanuman-saffron/20 data-[state=active]:border-hanuman-gold/20 data-[state=active]:text-hanuman-gold"
                >
                  <Sparkles className="h-4 w-4 mr-1.5" />
                  <span>{isSpanish ? "Ideas" : "Prompts"}</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Text Input */}
          {activeTab === "text" && (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isSpanish ? "Comparte tu historia..." : "Share your story..."}
                className="flex-1 bg-black/30 border border-hanuman-orange/30 focus:border-hanuman-gold/50 placeholder:text-white/50 text-white"
                disabled={isLoading}
              />
              
              <Button 
                type="button"
                onClick={toggleRecording}
                className="bg-gradient-to-r from-hanuman-cosmic-purple/80 to-hanuman-cosmic-blue/80 hover:from-hanuman-cosmic-purple hover:to-hanuman-cosmic-blue text-white rounded-full"
                disabled={isLoading}
              >
                <Mic className="h-4 w-4" />
              </Button>
              
              <Button 
                type="submit"
                className="bg-gradient-to-r from-hanuman-primary/80 to-hanuman-saffron/80 hover:from-hanuman-primary hover:to-hanuman-saffron text-white rounded-full"
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          )}

          {/* Voice Recording */}
          {activeTab === "voice" && (
            <div className="p-3 bg-gradient-to-r from-hanuman-primary/10 to-hanuman-saffron/10 rounded-xl border border-hanuman-orange/20">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {isRecording ? (
                      <>
                        <div className="relative">
                          <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 h-3 w-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <p className="text-sm text-white">{isSpanish ? "Grabando..." : "Recording..."}</p>
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 text-hanuman-gold" />
                        <p className="text-sm text-white">{isSpanish ? "Listo para grabar" : "Ready to record"}</p>
                      </>
                    )}
                  </div>
                  
                  {isRecording && (
                    <div className="mt-2 flex items-center h-6 gap-0.5">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1 bg-hanuman-orange/60 rounded-full"
                          style={{ 
                            height: `${Math.max(3, Math.sin(i * 0.5) * 10 + Math.random() * 10)}px`,
                            animationDelay: `${i * 50}ms`,
                            animation: 'pulse 1s infinite'
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={toggleRecording} 
                  size="sm" 
                  className={`${
                    isRecording 
                      ? "bg-red-500 hover:bg-red-600" 
                      : "bg-gradient-to-r from-hanuman-primary to-hanuman-saffron"
                  } text-white rounded-full`}
                >
                  {isRecording ? (
                    <>
                      <StopCircle className="h-4 w-4 mr-1" />
                      <span>{isSpanish ? "Detener" : "Stop"}</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-1" />
                      <span>{isSpanish ? "Iniciar" : "Start"}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Prompts */}
          {activeTab === "prompts" && (
            <div className="space-y-2">
              <div className="flex gap-2 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-hanuman-orange/20 scrollbar-track-transparent">
                {categoryPrompts[activeCategory]?.map((prompt, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    size="sm" 
                    onClick={() => onPromptSelect(prompt)}
                    className="whitespace-nowrap text-xs bg-hanuman-orange/10 border-hanuman-orange/30 text-white hover:bg-hanuman-orange/20 flex-shrink-0"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-hanuman-gold/80 hover:text-hanuman-gold"
                >
                  <BookOpen className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">{isSpanish ? "Ver más ideas" : "More suggestions"}</span>
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-hanuman-gold/80 hover:text-hanuman-gold"
                  >
                    <Image className="h-3.5 w-3.5 mr-1" />
                    <span className="text-xs">{isSpanish ? "Añadir imagen" : "Add image"}</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-hanuman-gold/80 hover:text-hanuman-gold"
                  >
                    <PlusCircle className="h-3.5 w-3.5 mr-1" />
                    <span className="text-xs">{isSpanish ? "Crear historia" : "Create story"}</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StoryBar;
