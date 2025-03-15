
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useAudioTranscription } from "@/components/voice-recording/hooks/useAudioTranscription";
import { useAudioPlayback } from "@/components/voice-recording/hooks/useAudioPlayback";
import { useMemorySaving } from "@/components/voice-recording/hooks/useMemorySaving";
import { useToast } from "@/components/ui/use-toast";
import TranscriptionDisplay from "@/components/audio/TranscriptionDisplay";
import AudioTimeline from "@/components/audio/AudioTimeline";

// Import the extracted smaller components
import { EnhancedRecordingButton } from "./EnhancedRecordingButton";
import { FadeIn } from "@/components/animation/FadeIn";
import { StaggeredContainer } from "@/components/animation/StaggeredContainer";
import RecordingStatus from "./RecordingStatus";
import AudioControls from "./AudioControls";
import SaveMemoryButton from "./SaveMemoryButton";
import ProcessingIndicator from "./ProcessingIndicator";
import WaveformVisualizer from "./WaveformVisualizer";
import SuccessMessage from "./SuccessMessage";

interface VoiceRecordingExperienceProps {
  onMemorySaved?: (data: { 
    audioUrl?: string; 
    transcription?: string;
  }) => void;
}

const VoiceRecordingExperience = ({ onMemorySaved }: VoiceRecordingExperienceProps) => {
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
    transcribeAudio
  } = useAudioTranscription();
  
  const { 
    isPlaying, 
    togglePlayback, 
    setIsPlaying 
  } = useAudioPlayback(audioBlob);
  
  const {
    isProcessing,
    hasSaved,
    saveMemory,
    resetSavedState
  } = useMemorySaving({ onMemorySaved });

  // Derived recording state for the button
  const getRecordingState = () => {
    if (isProcessing || isTranscribing) return 'processing';
    if (isRecordingActive) return 'recording';
    return 'idle';
  };

  const handleRecordingAction = () => {
    if (isRecordingActive) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleReset = () => {
    setAudioBlob(null);
    setIsPlaying(false);
    resetSavedState();
  };

  const handleSave = async () => {
    if (audioBlob) {
      await saveMemory(audioBlob, transcription);
      toast({
        title: "Memory saved successfully",
        description: "Your memory has been saved and can be accessed in your collection.",
      });
    }
  };

  // Automatically transcribe when recording stops
  useEffect(() => {
    if (audioBlob && !transcription && !isTranscribing) {
      transcribeAudio(audioBlob);
    }
  }, [audioBlob, transcription, isTranscribing, transcribeAudio]);

  // Provide haptic feedback when recording starts/stops
  useEffect(() => {
    if (navigator.vibrate) {
      navigator.vibrate(isRecordingActive ? 100 : [100, 50, 100]);
    }
  }, [isRecordingActive]);

  return (
    <Card className="w-full max-w-md mx-auto shadow-md border border-gray-100">
      <CardContent className="p-6 space-y-6">
        <FadeIn>
          <RecordingStatus 
            isRecordingActive={isRecordingActive} 
            hasAudioBlob={!!audioBlob} 
          />
        </FadeIn>

        <WaveformVisualizer isRecording={isRecordingActive} />

        <div className="flex justify-center">
          {!audioBlob ? (
            <EnhancedRecordingButton 
              state={getRecordingState()}
              onClick={handleRecordingAction}
              disabled={isProcessing || isTranscribing}
              size="md"
            />
          ) : (
            <StaggeredContainer 
              className="space-y-4 w-full" 
              animation="fade"
              staggerDelay={0.1}
            >
              <AudioTimeline 
                audioBlob={audioBlob} 
                isPlaying={isPlaying} 
              />
              
              <AudioControls 
                isPlaying={isPlaying}
                togglePlayback={togglePlayback}
                handleReset={handleReset}
                isProcessing={isProcessing || isTranscribing}
              />
            </StaggeredContainer>
          )}
        </div>

        <ProcessingIndicator 
          isProcessing={isProcessing} 
          isTranscribing={isTranscribing} 
        />

        {audioBlob && !hasSaved && !isProcessing && !isTranscribing && (
          <SaveMemoryButton 
            handleSave={handleSave}
            isProcessing={isProcessing}
            isTranscribing={isTranscribing}
          />
        )}

        <SuccessMessage hasSaved={hasSaved} />

        {transcription && (
          <FadeIn delay={0.2}>
            <TranscriptionDisplay transcription={transcription} />
          </FadeIn>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceRecordingExperience;
