
import { useState } from "react";
import { Message } from "../types";

export const useNarraConversation = (initialMessages: Message[] = []) => {
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.length > 0
      ? initialMessages
      : [
          {
            id: "welcome",
            role: "assistant",
            content:
              "¡Hola! I'm Narra, your storytelling companion. I'd love to help you capture and share your family's stories and traditions. What would you like to talk about today?",
            timestamp: new Date(),
          },
        ]
  );

  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: input,
        timestamp: new Date(),
      };

      setMessages([...messages, newUserMessage]);
      setInput("");

      // Simulate AI processing
      setIsProcessing(true);

      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Thank you for sharing that with me. I'd love to hear more about your family. Could you tell me about a special family tradition?",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Simulate a recorded message
    const recordedMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: "This is a transcription of my recorded audio message.",
      timestamp: new Date(),
      attachments: [
        {
          type: "audio",
          url: "/placeholder.svg", // This would be the actual audio URL
        },
      ],
    };

    setMessages([...messages, recordedMessage]);

    // Simulate AI processing
    setIsProcessing(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Thank you for sharing that audio. I loved hearing your story. Is there anything else you'd like to tell?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);

    // Simulate AI processing
    setIsProcessing(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "That's a great question. I'd love to explore that topic with you. Could you share more details?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  return {
    messages,
    input,
    setInput,
    isRecording,
    isProcessing,
    handleSendMessage,
    startRecording,
    stopRecording,
    handleSuggestedPrompt,
  };
};
