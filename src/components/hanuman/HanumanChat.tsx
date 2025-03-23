
import React, { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Mic, Image, Sparkles, Loader2, Flower } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HanumanMessage } from "@/types/hanuman";

interface HanumanChatProps {
  messages: HanumanMessage[];
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleMorePrompts: () => void;
  isSpanish: boolean;
}

const HanumanChat: React.FC<HanumanChatProps> = ({
  messages,
  input,
  setInput,
  isLoading,
  handleSubmit,
  handleMorePrompts,
  isSpanish
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = React.useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="hanuman-card overflow-hidden h-full flex flex-col min-h-[600px]">
      <CardHeader className="border-b border-hanuman-gold/10 pb-3">
        <CardTitle className="flex items-center text-xl text-hanuman-gold">
          <Flower className="h-5 w-5 mr-2 text-hanuman-orange" />
          {isSpanish ? "Conversación Sagrada" : "Sacred Conversation"}
        </CardTitle>
      </CardHeader>
      
      <CardContent 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        ref={chatContainerRef}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-hanuman-primary/10"
            >
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-hanuman-primary/20 to-hanuman-accent/20 flex items-center justify-center">
                  <Avatar className="h-14 w-14 border-2 border-hanuman-primary/40">
                    <AvatarImage src="/lovable-uploads/bb9ac7a2-06a5-45e0-97a3-e0d2fa875c56.png" alt="Hanuman" />
                    <AvatarFallback className="bg-hanuman-primary text-white">
                      <Flower size={24} />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-hanuman-primary mb-2">
                {isSpanish ? "Comienza tu conversación sagrada" : "Begin your sacred conversation"}
              </h3>
              <p className="text-gray-300 mb-4">
                {isSpanish 
                  ? "Comparte las historias de tu familia y preserva tu herencia a través de un diálogo significativo" 
                  : "Share your family stories and preserve your heritage through meaningful dialogue"}
              </p>
              <div className="text-sm text-gray-400 bg-hanuman-primary/5 p-3 rounded-lg border border-hanuman-primary/10">
                {isSpanish 
                  ? "Selecciona una categoría o pregunta sugerida para empezar" 
                  : "Select a category or suggested prompt to begin"}
              </div>
            </motion.div>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 border-2 border-hanuman-orange/20 mt-1">
                    <AvatarImage src="/lovable-uploads/bb9ac7a2-06a5-45e0-97a3-e0d2fa875c56.png" alt="Hanuman" />
                    <AvatarFallback className="bg-hanuman-orange text-white">H</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-hanuman-orange text-white ml-auto"
                      : "bg-white/10 border border-hanuman-gold/10"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8 bg-hanuman-cosmic-purple/20 border-2 border-hanuman-cosmic-purple/20 mt-1">
                    <AvatarFallback>
                      {isSpanish ? "T" : "Y"}
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-3 mt-4"
              >
                <Avatar className="h-8 w-8 border-2 border-hanuman-orange/20 mt-1">
                  <AvatarImage src="/lovable-uploads/bb9ac7a2-06a5-45e0-97a3-e0d2fa875c56.png" alt="Hanuman" />
                  <AvatarFallback className="bg-hanuman-orange text-white">H</AvatarFallback>
                </Avatar>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-hanuman-gold/10">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-hanuman-orange" />
                    <span className="text-sm text-white/70">{isSpanish ? "Pensando..." : "Thinking..."}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </CardContent>
      
      <CardFooter className="p-4 border-t border-hanuman-gold/10 bg-black/30">
        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <div className="relative">
            <Textarea
              placeholder={isSpanish ? "Escribe tu mensaje..." : "Type your message..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[80px] resize-none pr-24 bg-white/5 border-hanuman-orange/20 focus:border-hanuman-orange"
              disabled={isLoading}
            />
            
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9 bg-white/5 hover:bg-white/10"
                onClick={() => setIsRecording(!isRecording)}
                disabled={isLoading}
              >
                <Mic className={`h-5 w-5 ${isRecording ? "text-hanuman-orange" : "text-white/70"}`} />
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9 bg-white/5 hover:bg-white/10"
                disabled={isLoading}
              >
                <Image className="h-5 w-5 text-white/70" />
              </Button>
              
              <Button
                type="submit"
                size="icon"
                className="rounded-full h-9 w-9 bg-hanuman-orange hover:bg-hanuman-orange/90 text-white"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs text-white/50">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 text-xs flex items-center gap-1 text-white/50 hover:text-hanuman-orange"
              onClick={handleMorePrompts}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isSpanish ? "Más ideas" : "More ideas"}</span>
            </Button>
            
            <div className="text-xs">
              {isSpanish ? "Edición Hanuman" : "Hanuman Edition"}
            </div>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};

export default HanumanChat;
