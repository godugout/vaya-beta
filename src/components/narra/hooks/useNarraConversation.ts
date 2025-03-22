
import { useState, useCallback } from "react";
import { Message } from "../types";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useAudioTranscription } from "@/components/voice-recording/hooks/useAudioTranscription";

export const useNarraConversation = (initialMessages: Message[] = []) => {
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.length > 0
      ? initialMessages
      : [
          {
            id: "welcome",
            role: "assistant",
            content: "I'm Narra, your family storytelling companion. I'd love to help you record memories and stories. What would you like to share today?",
            timestamp: new Date(),
          },
        ]
  );
  
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const {
    isRecordingActive,
    audioBlob,
    startRecording,
    stopRecording,
  } = useVoiceRecorder();
  
  const { transcribeAudio } = useAudioTranscription();

  // Send a text message
  const handleSendMessage = useCallback(() => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "Thank you for sharing that. Would you like to elaborate more or perhaps record a voice memory about this topic?",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, response]);
      setIsProcessing(false);
    }, 1500);
  }, [input]);

  // Handle voice recording
  const handleVoiceRecording = useCallback(async () => {
    if (isRecordingActive) {
      stopRecording();
      
      if (audioBlob) {
        setIsProcessing(true);
        
        try {
          // Transcribe the audio
          const transcription = await transcribeAudio(audioBlob);
          
          // Add the message with audio and transcription
          const userMessage: Message = {
            id: `user-voice-${Date.now()}`,
            role: "user",
            content: transcription || "Audio message",
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, userMessage]);
          
          // Simulate AI response
          setTimeout(() => {
            const response: Message = {
              id: `assistant-${Date.now()}`,
              role: "assistant",
              content: "I've saved your voice memory. Would you like to share more details about this story?",
              timestamp: new Date(),
            };
            
            setMessages((prev) => [...prev, response]);
            setIsProcessing(false);
          }, 1500);
          
        } catch (error) {
          console.error("Error processing voice recording:", error);
        } finally {
          setIsProcessing(false);
        }
      }
    } else {
      startRecording();
    }
  }, [isRecordingActive, audioBlob, stopRecording, transcribeAudio, startRecording]);

  // Handle suggested prompt
  const handleSuggestedPrompt = useCallback((prompt: string) => {
    setInput(prompt);
  }, []);

  return {
    messages,
    input,
    setInput,
    isRecording: isRecordingActive,
    isProcessing,
    handleSendMessage,
    startRecording: startRecording,
    stopRecording: handleVoiceRecording,
    handleSuggestedPrompt
  };
};
