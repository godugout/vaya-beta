
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useAudioTranscription } from "@/components/voice-recording/hooks/useAudioTranscription";
import { useAudioPlayback } from "@/components/voice-recording/hooks/useAudioPlayback";
import { useMemorySaving } from "@/components/voice-recording/hooks/useMemorySaving";
import TranscriptionDisplay from "@/components/audio/TranscriptionDisplay";
import AudioTimeline from "@/components/audio/AudioTimeline";

// Import new animation components
import { EnhancedRecordingButton } from "./EnhancedRecordingButton";
import { AnimatedWavePath } from "@/components/audio/waveform/AnimatedWavePath";
import { FadeIn } from "@/components/animation/FadeIn";
import { StaggeredContainer } from "@/components/animation/StaggeredContainer";
import { LoadingIndicator } from "@/components/animation/LoadingIndicator";
import { SuccessAnimation } from "@/components/animation/SuccessAnimation";

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
          <div className="text-center mb-6">
            <h3 className={`text-xl font-semibold mb-2 ${
              isRecordingActive 
                ? "text-red-500" 
                : audioBlob 
                  ? "text-blue-600" 
                  : "text-gray-800"
            }`}>
              {isRecordingActive 
                ? "Recording..." 
                : audioBlob 
                  ? "Review Your Memory" 
                  : "Record Your Memory"}
            </h3>
            <p className="text-base text-gray-600 mt-1 max-w-xs mx-auto">
              {isRecordingActive 
                ? "Speak clearly into your microphone" 
                : audioBlob 
                  ? "Listen, transcribe and save your memory" 
                  : "Tap the microphone to start recording"}
            </p>
          </div>
        </FadeIn>

        <div className="h-24 w-full flex items-center justify-center">
          <AnimatedWavePath 
            isRecording={isRecordingActive} 
            intensity={0.7}
            size="md"
          />
        </div>

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
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={togglePlayback}
                  className="rounded-full bg-ui-orange hover:bg-ui-orange/90 shadow"
                  size="icon"
                  disabled={isProcessing || isTranscribing}
                >
                  <motion.span
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    {isPlaying ? (
                      <motion.svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.3 }}
                      >
                        <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
                        <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
                      </motion.svg>
                    ) : (
                      <motion.svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M5 3L19 12L5 21V3Z" 
                          fill="currentColor"
                        />
                      </motion.svg>
                    )}
                  </motion.span>
                </Button>
                
                <Button
                  onClick={handleReset}
                  className="rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
                  size="icon"
                  disabled={isProcessing || isTranscribing}
                >
                  <motion.svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <path 
                      d="M3 6H5H21" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </Button>
              </div>
            </StaggeredContainer>
          )}
        </div>

        {(isProcessing || isTranscribing) && (
          <FadeIn>
            <LoadingIndicator 
              variant="dots" 
              message={isProcessing ? "Saving your memory..." : "Transcribing your audio..."} 
              className="mt-4"
            />
          </FadeIn>
        )}

        {audioBlob && !hasSaved && !isProcessing && !isTranscribing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="pt-4"
          >
            <Button
              onClick={handleSave}
              className="w-full bg-lovable-magenta hover:bg-lovable-magenta-bright"
              disabled={isProcessing || isTranscribing}
            >
              <motion.span
                whileTap={{ scale: 0.97 }}
                className="flex items-center"
              >
                Save Memory
              </motion.span>
            </Button>
          </motion.div>
        )}

        {hasSaved && (
          <FadeIn>
            <SuccessAnimation 
              message="Your memory has been saved successfully!" 
              className="mt-4"
            />
          </FadeIn>
        )}

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
