
import React, { useState, useRef, useEffect } from "react";
import { HanumanMessage } from "@/types/hanuman";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessages from "@/components/hanuman/ChatMessages";
import StoryBar from "@/components/hanuman/StoryBar";
import useHanumanChat from "@/hooks/useHanumanChat";
import { MessageCircle, Sparkles, Mic, Volume2, Image as ImageIcon, FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface EnhancedHanumanChatProps {
  activeCategory: string;
}

export const EnhancedHanumanChat: React.FC<EnhancedHanumanChatProps> = ({ activeCategory }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [expandedMode, setExpandedMode] = useState<string | null>(null);
  
  // Use our hook for chat functionality
  const {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit,
    handlePromptSelect
  } = useHanumanChat();

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
      const categoryName = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
      // Use the hook's method to update messages
      handlePromptSelect(`Tell me about ${activeCategory}`);
    }
  }, [activeCategory]);

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
    <div className="relative h-[76vh] flex flex-col backdrop-blur-sm bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-green-900/15 rounded-2xl shadow-[0_0_40px_rgba(255,126,0,0.15)] border border-hanuman-orange/20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-hanuman-primary/10 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-hanuman-green/10 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      {/* Chat header with subtle shine effect */}
      <div className="p-4 border-b border-hanuman-orange/20 bg-gradient-to-r from-black/40 via-hanuman-orange/10 to-black/40 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-hanuman-gold flex items-center">
              <span className="mr-2">🕉️</span> 
              Family Stories Explorer
            </h2>
            <p className="text-sm text-white/70">
              Share and discover your family's unique journey through time
            </p>
          </div>
          
          <div className="flex gap-2">
            <Tabs defaultValue="message" className="w-fit">
              <TabsList className="bg-black/30 p-1 border border-hanuman-orange/10">
                <TabsTrigger 
                  value="message" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-hanuman-primary/20 data-[state=active]:to-hanuman-saffron/20 data-[state=active]:border-hanuman-gold/20 data-[state=active]:text-hanuman-gold"
                >
                  <MessageCircle className="h-4 w-4 mr-1.5" />
                  <span>Text</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="talk" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-hanuman-primary/20 data-[state=active]:to-hanuman-saffron/20 data-[state=active]:border-hanuman-gold/20 data-[state=active]:text-hanuman-gold"
                >
                  <Mic className="h-4 w-4 mr-1.5" />
                  <span>Voice</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Chat message area */}
      <div 
        ref={chatContainerRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 scrollbar-thin scrollbar-thumb-hanuman-orange/20 scrollbar-track-transparent"
      >
        <ChatMessages messages={messages} isLoading={isLoading} />
      </div>
      
      {/* Expanded Interaction Area */}
      <AnimatePresence>
        {expandedMode && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-amber-900/20 via-amber-800/15 to-green-900/20 border-t border-hanuman-orange/20 p-4"
          >
            {expandedMode === 'prompts' && (
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="p-3 rounded-xl bg-black/30 border border-hanuman-gold/20 hover:border-hanuman-gold/40 cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-hanuman-primary/10 hover:to-hanuman-saffron/10"
                    onClick={() => {
                      const prompts = [
                        "Tell me about your family traditions during festivals",
                        "Share a story about your grandparents",
                        "What family recipes have been passed down generations?",
                        "Describe a meaningful family heirloom"
                      ];
                      handlePromptSelect(prompts[i]);
                      setExpandedMode(null);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-hanuman-gold mt-0.5" />
                      <div>
                        <p className="text-sm text-white">
                          {[
                            "Share a family tradition",
                            "Tell a grandparent story",
                            "Describe a family recipe",
                            "Talk about a family heirloom"
                          ][i]}
                        </p>
                        <p className="text-xs text-white/60 mt-1">
                          {[
                            "What customs do you celebrate together?",
                            "What memories stand out from your grandparents?",
                            "What dishes connect your family through generations?",
                            "What objects hold special meaning in your family?"
                          ][i]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {expandedMode === 'voice' && (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center ${isRecording ? 'bg-red-500' : 'bg-gradient-to-r from-hanuman-orange to-hanuman-saffron'}`}>
                    <Mic className="h-10 w-10 text-white" />
                    {isRecording && (
                      <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping"></div>
                    )}
                  </div>
                </div>
                <button 
                  className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-hanuman-primary to-hanuman-saffron text-white font-medium"
                  onClick={toggleRecording}
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </button>
                <p className="text-sm text-white/70 mt-2">
                  {isRecording ? 
                    "Recording your voice... speak clearly" : 
                    "Click to start recording your family story"
                  }
                </p>
              </div>
            )}
            
            {expandedMode === 'media' && (
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-black/30 border border-hanuman-gold/20 hover:border-hanuman-gold/40 cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-hanuman-primary/10 hover:to-hanuman-saffron/10">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-8 w-8 text-hanuman-gold" />
                    <div>
                      <p className="text-sm font-medium text-white">Upload Images</p>
                      <p className="text-xs text-white/60">Share photos from your family collection</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-xl bg-black/30 border border-hanuman-gold/20 hover:border-hanuman-gold/40 cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-hanuman-primary/10 hover:to-hanuman-saffron/10">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-hanuman-gold" />
                    <div>
                      <p className="text-sm font-medium text-white">Upload Documents</p>
                      <p className="text-xs text-white/60">Share letters, recipes, or written memories</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Story Bar (Footer) - Updated to be more interactive */}
      <div className="sticky bottom-0 left-0 right-0 z-20 border-t border-hanuman-orange/20 backdrop-blur-lg bg-gradient-to-b from-amber-900/30 via-amber-800/20 to-green-900/20 shadow-[0_-4px_20px_rgba(255,126,0,0.1)]">
        <div className="p-3">
          {/* Mode Tabs */}
          <div className="flex items-center mb-2 space-x-1.5">
            <button 
              onClick={() => setExpandedMode(expandedMode === 'text' ? null : 'text')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
                expandedMode === 'text' 
                  ? 'bg-gradient-to-r from-hanuman-primary/30 to-hanuman-saffron/30 text-white' 
                  : 'bg-black/20 text-white/80 hover:bg-black/30'
              } transition-all duration-200`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Text</span>
            </button>
            
            <button 
              onClick={() => setExpandedMode(expandedMode === 'voice' ? null : 'voice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
                expandedMode === 'voice' 
                  ? 'bg-gradient-to-r from-hanuman-primary/30 to-hanuman-saffron/30 text-white' 
                  : 'bg-black/20 text-white/80 hover:bg-black/30'
              } transition-all duration-200`}
            >
              <Mic className="h-4 w-4" />
              <span>Voice</span>
            </button>
            
            <button 
              onClick={() => setExpandedMode(expandedMode === 'prompts' ? null : 'prompts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
                expandedMode === 'prompts' 
                  ? 'bg-gradient-to-r from-hanuman-primary/30 to-hanuman-saffron/30 text-white' 
                  : 'bg-black/20 text-white/80 hover:bg-black/30'
              } transition-all duration-200`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Prompts</span>
            </button>
            
            <button 
              onClick={() => setExpandedMode(expandedMode === 'media' ? null : 'media')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
                expandedMode === 'media' 
                  ? 'bg-gradient-to-r from-hanuman-primary/30 to-hanuman-saffron/30 text-white' 
                  : 'bg-black/20 text-white/80 hover:bg-black/30'
              } transition-all duration-200`}
            >
              <ImageIcon className="h-4 w-4" />
              <span>Media</span>
            </button>
          </div>
          
          <StoryBar
            input={input}
            setInput={setInput}
            onSendMessage={handleSubmit}
            onPromptSelect={handlePromptSelect}
            activeCategory={activeCategory}
            isRecording={isRecording}
            toggleRecording={toggleRecording}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
