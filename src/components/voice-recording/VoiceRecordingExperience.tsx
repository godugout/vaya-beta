
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useAudioTranscription } from "@/components/voice-recording/hooks/useAudioTranscription";
import { useAudioPlayback } from "@/components/voice-recording/hooks/useAudioPlayback";
import { useMemorySaving } from "@/components/voice-recording/hooks/useMemorySaving";
import { useToast } from "@/components/ui/use-toast";
import TranscriptionDisplay from "@/components/audio/TranscriptionDisplay";
import AudioTimeline from "@/components/audio/AudioTimeline";

// Import the extracted smaller components
import { FadeIn } from "@/components/animation/FadeIn";
import { StaggeredContainer } from "@/components/animation/StaggeredContainer";
import RecordingStatus from "./RecordingStatus";
import AudioControls from "./AudioControls";
import SaveMemoryButton from "./SaveMemoryButton";
import ProcessingIndicator from "./ProcessingIndicator";
import SuccessMessage from "./SuccessMessage";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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
  
  const handleTranscribe = async () => {
    if (audioBlob && !transcription && !isTranscribing) {
      toast({
        title: "Transcribing...",
        description: "Your recording is being transcribed.",
      });
      
      await transcribeAudio(audioBlob);
    }
  };

  // Provide haptic feedback when recording starts/stops
  useEffect(() => {
    if (navigator.vibrate) {
      navigator.vibrate(isRecordingActive ? 100 : [100, 50, 100]);
    }
  }, [isRecordingActive]);

  return (
    <div className="bg-[#131c2c] rounded-lg p-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-white mb-2">Record Your Memory</h3>
        <p className="text-sm text-gray-400">Tap the microphone to start recording</p>
      </div>
      
      {!audioBlob ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8" />
          
          <button
            onClick={handleRecordingAction}
            disabled={isProcessing || isTranscribing}
            className={`h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isRecordingActive 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ 
                scale: isRecordingActive ? [1, 1.1, 1] : 1,
                transition: { 
                  repeat: isRecordingActive ? Infinity : 0, 
                  duration: 1.5 
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                {isRecordingActive ? (
                  <rect x="5" y="5" width="14" height="14" rx="2" ry="2" />
                ) : (
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                )}
                {!isRecordingActive && <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>}
                {!isRecordingActive && <line x1="12" y1="19" x2="12" y2="22"></line>}
              </svg>
            </motion.div>
          </button>
        </div>
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
          
          {!transcription && !isTranscribing && (
            <Button 
              onClick={handleTranscribe} 
              variant="secondary"
              className="w-full"
              disabled={isProcessing}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Transcribe Recording
            </Button>
          )}
          
          {!hasSaved && !isProcessing && (
            <SaveMemoryButton 
              handleSave={handleSave}
              isProcessing={isProcessing}
              isTranscribing={isTranscribing}
            />
          )}
          
          <ProcessingIndicator 
            isProcessing={isProcessing} 
            isTranscribing={isTranscribing} 
          />
          
          <SuccessMessage hasSaved={hasSaved} />
          
          {transcription && (
            <TranscriptionDisplay transcription={transcription} />
          )}
        </StaggeredContainer>
      )}
    </div>
  );
};

export default VoiceRecordingExperience;
