
import React, { useState, useRef } from 'react';
import { Send, Mic, Paperclip, User, UserCircle2, Loader } from 'lucide-react';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { useAudioTranscription } from '@/hooks/useAudioTranscription';
import { useToast } from '@/components/ui/use-toast';
import AudioPreview from '@/components/audio/AudioPreview';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AidaChatProps {
  initialMessages?: Message[];
}

export const AidaChat: React.FC<AidaChatProps> = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
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
  
  // Scroll to bottom of chat when messages change
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };
  
  // Scroll when messages change
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Handle voice recording state
  React.useEffect(() => {
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
  React.useEffect(() => {
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
  
  const handleSend = () => {
    if (!input.trim() && !audioBlob) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim() || "🎤 Voice message",
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setAudioBlob(null);
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm Aida, your memory companion. I'm here to help you capture and preserve stories.",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
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
          {messages.map((message) => (
            <div 
              key={message.id} 
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
                  {message.content}
                </div>
                <div className={`aida-message-time ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
            disabled={isRecording}
          />
          <button 
            className="absolute right-0 p-2 text-black"
            onClick={isRecording ? toggleRecording : handleSend}
          >
            {isRecording ? (
              <div className="h-5 w-5 rounded-full bg-red-500 animate-pulse"></div>
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
        <div className="flex justify-between mt-3">
          <button 
            className={`p-2 ${isRecording ? 'text-red-500' : ''}`}
            onClick={toggleRecording}
            disabled={isTranscribing}
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
