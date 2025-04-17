
import React, { useState, useEffect } from 'react';
import { Mic, Image, Send, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { useAudioTranscription } from '@/components/voice-recording/hooks/useAudioTranscription';
import { useToast } from '@/components/ui/use-toast';
import AudioPreview from '@/components/audio/AudioPreview';
import TranscriptionDisplay from '@/components/audio/TranscriptionDisplay';

interface StoryEditorProps {
  storyContent: string;
  isRecording: boolean;
  themeStyles: {
    borderAccent: string;
    bgAccent: string;
    button: "forest" | "water" | "autumn"; // Use literal types instead of string
  };
  onContentChange: (content: string) => void;
  onToggleRecording: () => void;
  onSubmit: () => void;
}

export const StoryEditor: React.FC<StoryEditorProps> = ({
  storyContent,
  isRecording,
  themeStyles,
  onContentChange,
  onToggleRecording,
  onSubmit
}) => {
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
    isProcessing: isTranscribing,
    transcribeAudio,
    setTranscription
  } = useAudioTranscription();

  // Manage recording state
  useEffect(() => {
    if (isRecording !== isRecordingActive) {
      if (isRecording) {
        startRecording();
      } else if (isRecordingActive) {
        stopRecording();
      }
    }
  }, [isRecording, isRecordingActive, startRecording, stopRecording]);

  // Sync external recording state with internal state
  const handleToggleRecording = () => {
    if (isTranscribing) return;
    
    onToggleRecording();
    
    if (audioBlob) {
      setAudioBlob(null);
      setTranscription(null);
    }
  };
  
  // Manually trigger transcription
  const handleTranscribe = async () => {
    if (audioBlob && !isRecordingActive && !transcription) {
      const text = await transcribeAudio(audioBlob);
      if (text) {
        onContentChange(storyContent ? `${storyContent}\n${text}` : text);
      }
    }
  };

  return (
    <div className={cn(
      "border rounded-lg p-4 transition-all",
      isRecording ? `${themeStyles.borderAccent} ring-4 ring-red-500/10` : ""
    )}>
      <Textarea
        placeholder="Share your story or memory..."
        className="min-h-[150px] border-0 focus-visible:ring-0 px-0 py-2 resize-none"
        value={storyContent}
        onChange={(e) => onContentChange(e.target.value)}
      />
      
      {audioBlob && !isRecording && (
        <div className="mt-2 mb-4">
          <AudioPreview audioBlob={audioBlob} disabled={isTranscribing} />
          
          {!transcription && !isTranscribing && (
            <Button 
              onClick={handleTranscribe} 
              variant="outline" 
              size="sm" 
              className="mt-2 w-full"
              disabled={isTranscribing}
            >
              Transcribe Audio
            </Button>
          )}
          
          {isTranscribing && (
            <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
              <Loader size={14} className="animate-spin mr-2" />
              Transcribing your audio...
            </div>
          )}
          
          {transcription && (
            <TranscriptionDisplay 
              transcription={transcription} 
              isGenerating={isTranscribing} 
            />
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleToggleRecording}
            className={isRecording ? `${themeStyles.bgAccent} text-white` : ""}
            disabled={isTranscribing}
          >
            <Mic size={18} className={isTranscribing ? "animate-pulse" : ""} />
          </Button>
          <Button variant="outline" size="icon">
            <Image size={18} />
          </Button>
        </div>
        
        <Button 
          variant={themeStyles.button}
          disabled={!storyContent.trim() || isTranscribing}
          onClick={onSubmit}
        >
          Share Story
          <Send size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
