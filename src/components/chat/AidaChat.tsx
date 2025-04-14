
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, User, UserCircle2, Loader } from 'lucide-react';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { useAudioTranscription } from '@/hooks/useAudioTranscription';
import { useToast } from '@/components/ui/use-toast';
import AudioPreview from '@/components/audio/AudioPreview';
import { chatMessageService, ChatMessage } from '@/services/chatMessageService';
import { supabase } from '@/integrations/supabase/client';

interface AidaChatProps {
  initialMessages?: ChatMessage[];
}

export const AidaChat: React.FC<AidaChatProps> = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const {
    isRecordingActive,
    audioBlob,
    startRecording,
    stopRecording,
    setAudioBlob
  } = useVoiceRecorder();
  
  const {
    transcription,
    isProcessing: isTranscriptionProcessing,
    transcribeAudio
  } = useAudioTranscription();
  
  // Load messages from database on mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const loadedMessages = await chatMessageService.getMessages(conversationId);
        if (loadedMessages.length > 0) {
          setMessages(loadedMessages);
          // Use the conversation_id from the first message
          if (loadedMessages[0].conversation_id) {
            setConversationId(loadedMessages[0].conversation_id);
          }
        } else if (initialMessages.length > 0) {
          // If no messages in DB but we have initial messages, save them
          const newConversationId = crypto.randomUUID();
          setConversationId(newConversationId);
          
          // Save initial messages to database
          for (const message of initialMessages) {
            await chatMessageService.addMessage({
              ...message,
              conversation_id: newConversationId
            });
          }
          
          setMessages(initialMessages);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
        // Use initial messages as fallback
        setMessages(initialMessages);
      }
    };
    
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        loadMessages();
      } else {
        // Not authenticated, use initial messages only
        setMessages(initialMessages);
      }
    };
    
    checkAuth();
  }, [initialMessages]);
  
  // Scroll to bottom of chat when messages change
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };
  
  // Scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Handle voice recording state
  useEffect(() => {
    if (isRecording !== isRecordingActive) {
      if (isRecording) {
        startRecording();
        toast({
          title: "Recording started",
          description: "Speak clearly into your microphone"
        });
      } else if (isRecordingActive) {
        stopRecording();
      }
    }
  }, [isRecording, isRecordingActive, startRecording, stopRecording, toast]);
  
  // Handle transcription when recording stops
  useEffect(() => {
    const processAudio = async () => {
      if (audioBlob && !isRecordingActive && !transcription) {
        setIsTranscribing(true);
        try {
          const text = await transcribeAudio(audioBlob);
          if (text) {
            setInput(text);
          }
        } catch (error) {
          console.error('Transcription error:', error);
          toast({
            title: "Transcription failed",
            description: "Could not transcribe audio. Please try again.",
            variant: "destructive"
          });
        } finally {
          setIsTranscribing(false);
        }
      }
    };
    
    processAudio();
  }, [audioBlob, isRecordingActive, transcription, transcribeAudio, toast]);
  
  const handleSend = async () => {
    if ((!input.trim() && !audioBlob) || isSending) return;
    
    try {
      setIsSending(true);
      
      // Create conversation ID if it doesn't exist
      if (!conversationId) {
        setConversationId(crypto.randomUUID());
      }
      
      // Upload audio if exists
      let audioUrl = '';
      if (audioBlob) {
        try {
          const filePath = `chat-audio/${Date.now()}.webm`;
          const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, audioBlob);
          
          if (!uploadError) {
            const { data } = supabase.storage
              .from('media')
              .getPublicUrl(filePath);
            
            audioUrl = data.publicUrl;
          }
        } catch (error) {
          console.error('Error uploading audio:', error);
        }
      }
      
      // Add user message
      const userMessage: ChatMessage = {
        content: input.trim() || "🎤 Voice message",
        sender: 'user',
        conversation_id: conversationId,
        metadata: audioUrl ? { audioUrl } : {}
      };
      
      // Add to UI immediately
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setAudioBlob(null);
      
      // Save to database
      const savedUserMessage = await chatMessageService.addMessage(userMessage);
      
      // Simulate assistant response
      setMessages(prev => {
        // Replace the temporary user message with the saved one
        const updatedMessages = prev.map(msg => 
          msg === userMessage ? savedUserMessage : msg
        );
        return updatedMessages;
      });
      
      // Add assistant thinking indicator
      const assistantThinking: ChatMessage = {
        content: "Thinking...",
        sender: 'assistant',
        conversation_id: conversationId,
        metadata: { isThinking: true }
      };
      
      setMessages(prev => [...prev, assistantThinking]);
      
      // Simulate AI processing time
      setTimeout(async () => {
        // Generate assistant response
        const assistantMessage: ChatMessage = {
          content: "I'm Aida, your memory companion. I'm here to help you capture and preserve stories.",
          sender: 'assistant',
          conversation_id: conversationId
        };
        
        // Save assistant response to database
        const savedAssistantMessage = await chatMessageService.addMessage(assistantMessage);
        
        // Update UI with real message
        setMessages(prev => prev.filter(msg => !msg.metadata?.isThinking).concat(savedAssistantMessage));
        
      }, 1500);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error sending message',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const toggleRecording = () => {
    if (isTranscribing || isTranscriptionProcessing) return;
    setIsRecording(!isRecording);
  };
  
  const cancelRecording = () => {
    if (audioBlob) {
      setAudioBlob(null);
    }
    setIsRecording(false);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="aida-chat-header">
        <div className="flex items-center">
          <div className="mr-2">
            <UserCircle2 size={24} />
          </div>
          <div className="font-medium">Aida</div>
          <div className="text-xs text-[#8A898C] ml-2">Online</div>
        </div>
      </div>
      
      <div className="aida-chat-body flex-1 overflow-y-auto" ref={chatBodyRef}>
        <div className="flex flex-col space-y-4 p-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'assistant' && (
                <div className="mr-2 self-end">
                  <UserCircle2 size={28} className="text-[#8A898C]" />
                </div>
              )}
              <div>
                <div 
                  className={`aida-bubble ${message.sender === 'user' ? 'aida-bubble-user' : 'aida-bubble-assistant'}`}
                >
                  {message.metadata?.isThinking ? (
                    <div className="flex items-center">
                      <Loader size={16} className="animate-spin mr-2" />
                      Thinking...
                    </div>
                  ) : (
                    <>
                      {message.content}
                      {message.metadata?.audioUrl && (
                        <div className="mt-2">
                          <audio 
                            src={message.metadata.audioUrl} 
                            controls 
                            className="w-full h-8"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className={`aida-message-time ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.created_at 
                    ? new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                </div>
              </div>
              {message.sender === 'user' && (
                <div className="ml-2 self-end">
                  <User size={24} className="text-[#8A898C]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="aida-chat-footer p-4">
        {audioBlob && !isRecording ? (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Review Recording</span>
              <button 
                className="text-red-500 text-sm"
                onClick={cancelRecording}
              >
                Cancel
              </button>
            </div>
            <AudioPreview 
              audioBlob={audioBlob} 
              disabled={isTranscribing}
            />
            {isTranscribing && (
              <div className="flex items-center justify-center mt-2">
                <Loader size={16} className="animate-spin mr-2" />
                <span className="text-sm text-gray-500">Transcribing...</span>
              </div>
            )}
          </div>
        ) : null}
        
        <div className="flex items-center relative">
          <input
            type="text"
            className="aida-input flex-1 pr-10"
            placeholder={isRecording ? "Recording..." : "Type your message..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            disabled={isRecording || isSending}
          />
          <button 
            className="absolute right-0 p-2 text-black"
            onClick={isRecording ? toggleRecording : handleSend}
            disabled={isSending}
          >
            {isRecording ? (
              <div className="h-5 w-5 rounded-full bg-red-500 animate-pulse"></div>
            ) : isSending ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
        <div className="flex justify-between mt-3">
          <button 
            className={`p-2 ${isRecording ? 'text-red-500' : ''}`}
            onClick={toggleRecording}
            disabled={isTranscribing || isSending}
          >
            <Mic size={20} />
          </button>
          <button className="p-2">
            <Paperclip size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
