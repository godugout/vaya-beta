import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, MoreHorizontal, Mic } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import VoiceRecorder from "./VoiceRecorder";

interface Message {
  role: "assistant" | "user";
  content: string;
}

interface StoryPrompt {
  id: string;
  prompt: string;
  category: string;
  cultural_context: string | null;
}

const NarraChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Narra, your storytelling companion. I'd love to help you record and preserve your memories. What would you like to talk about today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [prompts, setPrompts] = useState<StoryPrompt[]>([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from("story_prompts")
        .select("*")
        .eq("active", true);

      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load story prompts",
        variant: "destructive",
      });
    }
  };

  const getNextPrompt = () => {
    if (prompts.length === 0) return null;
    const prompt = prompts[currentPromptIndex];
    setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
    return prompt;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    const nextPrompt = getNextPrompt();
    
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: nextPrompt 
          ? `${nextPrompt.prompt}${nextPrompt.cultural_context ? ` (${nextPrompt.cultural_context})` : ""}`
          : "That's interesting! Would you like to record this story? I can help guide you through the process.",
      },
    ]);
    
    setInput("");
  };

  const handleMorePrompts = () => {
    const nextPrompt = getNextPrompt();
    if (nextPrompt) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${nextPrompt.prompt}${nextPrompt.cultural_context ? ` (${nextPrompt.cultural_context})` : ""}`,
        },
      ]);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white border-vaya-chat-border shadow-lg">
      <CardHeader className="border-b border-vaya-chat-border">
        <CardTitle className="text-vaya-gray-800 flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-vaya-primary" />
          Chat with Narra
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === "assistant"
                      ? "bg-vaya-chat-bg text-vaya-gray-800 border border-vaya-chat-border"
                      : "bg-vaya-primary text-white"
                  } animate-fadeIn shadow-sm`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {isRecording ? (
          <div className="mt-4">
            <VoiceRecorder />
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="bg-white border-vaya-chat-border text-vaya-gray-800"
              />
              <Button
                onClick={handleSend}
                className="bg-vaya-primary hover:bg-vaya-primary/90 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setIsRecording(true)}
                className="bg-vaya-secondary hover:bg-vaya-secondary/90 text-white"
              >
                <Mic className="h-4 w-4 mr-2" />
                Record
              </Button>
            </div>
            <Button
              onClick={handleMorePrompts}
              variant="ghost"
              className="self-center text-vaya-gray-600 hover:text-vaya-gray-800 hover:bg-vaya-chat-hover"
            >
              <MoreHorizontal className="h-5 w-5 mr-2" />
              More prompts
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NarraChat;