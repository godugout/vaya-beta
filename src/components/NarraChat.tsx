import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send } from "lucide-react";
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

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    // Get next prompt
    const nextPrompt = getNextPrompt();
    
    // Add Narra's response
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

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#2A2A2A] border-[#3A3A3A]">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-[#8B5CF6]" />
          Chat with Narra
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "assistant"
                      ? "bg-[#3A3A3A] text-white"
                      : "bg-[#8B5CF6] text-white"
                  }`}
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
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="bg-[#3A3A3A] border-[#4A4A4A] text-white"
            />
            <Button
              onClick={handleSend}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
            >
              <Send className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleStartRecording}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
            >
              Start Recording
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NarraChat;