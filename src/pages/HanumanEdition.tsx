
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Loader2, Mic } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFamilyContextManagement } from "@/hooks/useFamilyContextManagement";
import { usePromptManager } from "@/components/chat/hooks/usePromptManager";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { PromptItem } from "@/components/chat/hooks/types";
import { Message } from "@/components/narra/types"; // Changed import source
import SuggestedPrompts from "@/components/narra/SuggestedPrompts";

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Hello! I'm here to help you capture and share your family stories. What would you like to talk about today?",
  },
];

// Add category to each prompt item to match the PromptItem type
const suggestedPrompts: PromptItem[] = [
  {
    id: "prompt-1",
    content: "Tell me about your childhood.",
    category: "personal"
  },
  {
    id: "prompt-2",
    content: "What are some of your favorite family traditions?",
    category: "family"
  },
  {
    id: "prompt-3",
    content: "What is your favorite memory?",
    category: "personal"
  },
  {
    id: "prompt-4",
    content: "Tell me about a time you overcame a challenge.",
    category: "personal"
  },
  {
    id: "prompt-5",
    content: "What are some of the most important lessons you've learned in life?",
    category: "wisdom"
  },
];

const HanumanEdition = () => {
  const { t, isSpanish } = useLanguage();
  const { toast } = useToast();
  const { familyContext } = useFamilyContextManagement();
  const { handleMorePrompts } = usePromptManager();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const {
    transcript,
    resetTranscript,
    listening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  // Speech recognition event handlers
  const handleStartListening = () => {
    startListening();
  };

  const handleStopListening = () => {
    stopListening();
  };

  // Update input with speech recognition transcript
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const assistantResponse: Message = {
        role: "assistant",
        content: `This is a simulated response to: ${input}. I am using the family context: ${JSON.stringify(
          familyContext
        )}`,
      };
      setMessages((prev) => [...prev, assistantResponse]);
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      resetTranscript();
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex flex-col h-screen">
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              message.role === "user" ? "justify-end" : ""
            }`}
          >
            {message.role === "assistant" && (
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="Narra" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            )}
            <Card
              className={`w-fit max-w-[80%] ${
                message.role === "user"
                  ? "bg-lovable-blue text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              <CardContent className="p-3 break-words">
                {message.content}
              </CardContent>
            </Card>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="Narra" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <Card className="bg-gray-100 dark:bg-gray-800">
              <CardContent className="p-3">
                <Loader2 className="h-4 w-4 animate-spin" />
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <SuggestedPrompts prompts={suggestedPrompts} onSelect={handlePromptSelect} isSpanish={isSpanish} />

      <div className="p-4">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pr-12"
            placeholder={t("Type your message...")}
          />
          <Button
            type="submit"
            className="absolute right-1 top-1 rounded-full"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>

        {hasRecognitionSupport ? (
          <div className="flex justify-center mt-2">
            <Button
              variant="outline"
              onClick={listening ? handleStopListening : handleStartListening}
              disabled={isLoading}
            >
              {listening ? (
                <>
                  {t("Stop Listening")}
                  <Mic className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  {t("Start Listening")}
                  <Mic className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <p className="text-center mt-2">
            {t("Speech recognition not supported in this browser.")}
          </p>
        )}

        <div className="flex justify-center mt-4">
          <Button
            variant="secondary"
            onClick={() => handleMorePrompts(setMessages, isSpanish)}
          >
            {t("More Prompts")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HanumanEdition;
