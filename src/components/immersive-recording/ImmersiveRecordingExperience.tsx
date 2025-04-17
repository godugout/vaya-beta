
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useAudioTranscription } from "@/components/voice-recording/hooks/useAudioTranscription";
import { useToast } from "@/components/ui/use-toast";
import { RecordingState } from "../voice-recording/EnhancedRecordingButton";
import OracleAnimation from "./OracleAnimation";
import ImmersiveControls from "./ImmersiveControls";
import AudioWaveform from "./AudioWaveform";
import { cn } from "@/lib/utils";

interface ImmersiveRecordingExperienceProps {
  onComplete?: (data: { audioBlob: Blob; transcription?: string }) => void;
  onCancel?: () => void;
  guidanceText?: string[];
}

const ImmersiveRecordingExperience = ({
  onComplete,
  onCancel,
  guidanceText = [
    "Share your memory or story...",
    "Take your time to reflect...",
    "Your voice creates your legacy..."
  ]
}: ImmersiveRecordingExperienceProps) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [currentGuidanceIndex, setCurrentGuidanceIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showExitPrompt, setShowExitPrompt] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const {
    isRecordingActive,
    audioBlob,
    startRecording,
    stopRecording,
    volume,
    duration
  } = useVoiceRecorder({
    silenceDetection: false,
    noiseFiltering: true,
    quality: 'high'
  });
  
  const {
    transcription,
    isProcessing: isTranscribing,
    transcribeAudio
  } = useAudioTranscription();

  // Rotate through guidance text periodically during recording
  useEffect(() => {
    if (isRecordingActive) {
      const interval = setInterval(() => {
        setCurrentGuidanceIndex(prev => 
          (prev + 1) % guidanceText.length
        );
      }, 10000); // Change every 10 seconds
      
      return () => clearInterval(interval);
    }
  }, [isRecordingActive, guidanceText.length]);

  // Automatically hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      
      timeout = setTimeout(() => {
        if (isRecordingActive) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      clearTimeout(timeout);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isRecordingActive]);

  // Handle recording state changes
  useEffect(() => {
    if (isRecordingActive) {
      setRecordingState("recording");
    } else if (isTranscribing) {
      setRecordingState("processing");
    } else {
      setRecordingState("idle");
    }
  }, [isRecordingActive, isTranscribing]);

  // Handle key presses for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isRecordingActive) {
          setShowExitPrompt(true);
        } else {
          onCancel?.();
        }
      } else if (e.code === 'Space' && !isTranscribing) {
        e.preventDefault();
        toggleRecording();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecordingActive, isTranscribing]);

  const toggleRecording = () => {
    if (isRecordingActive) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleCancel = () => {
    if (isRecordingActive) {
      setShowExitPrompt(true);
    } else {
      onCancel?.();
    }
  };

  const handleConfirmCancel = () => {
    if (isRecordingActive) {
      stopRecording();
    }
    setShowExitPrompt(false);
    onCancel?.();
  };

  const handleComplete = async () => {
    if (!audioBlob) return;
    
    setRecordingState("processing");
    
    try {
      // Only transcribe if we don't already have a transcription
      if (!transcription) {
        await transcribeAudio(audioBlob);
      }
      
      onComplete?.({ 
        audioBlob, 
        transcription 
      });
      
      toast({
        title: "Memory Recorded",
        description: "Your memory has been successfully captured.",
      });
      
    } catch (error) {
      console.error("Error processing recording:", error);
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: "There was a problem processing your recording.",
      });
    } finally {
      setRecordingState("idle");
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-[#080C14] bg-opacity-95 z-50 flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient waveforms */}
      <div className="absolute inset-0 opacity-20">
        <AudioWaveform 
          isActive={true}
          amplitude={0.3}
          color="rgba(108, 92, 231, 0.5)"
          speed={0.5}
        />
      </div>
      
      {/* Central oracle animation */}
      <div className="relative z-10 w-64 h-64 md:w-96 md:h-96">
        <OracleAnimation 
          isRecording={isRecordingActive}
          volume={volume}
          duration={duration}
        />
      </div>
      
      {/* User's active waveform */}
      {isRecordingActive && (
        <div className="absolute inset-x-0 bottom-0 h-40">
          <AudioWaveform 
            isActive={isRecordingActive}
            amplitude={volume || 0.5}
            color="rgba(255, 118, 117, 0.7)"
            speed={1.2}
          />
        </div>
      )}
      
      {/* Guidance text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGuidanceIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="absolute top-16 left-0 right-0 text-center text-white text-xl md:text-2xl font-light"
        >
          {guidanceText[currentGuidanceIndex]}
        </motion.div>
      </AnimatePresence>
      
      {/* Recording info (time, etc) */}
      {isRecordingActive && (
        <div className="absolute top-32 left-0 right-0 flex justify-center">
          <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full text-white flex items-center">
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-red-500"></span>
            <span>Recording: {Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, '0')}</span>
          </div>
        </div>
      )}
      
      {/* Controls */}
      <div 
        className={cn(
          "absolute bottom-8 left-0 right-0 flex justify-center transition-opacity duration-500",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <ImmersiveControls
          recordingState={recordingState}
          hasRecording={!!audioBlob}
          onToggleRecording={toggleRecording}
          onCancel={handleCancel}
          onComplete={handleComplete}
        />
      </div>
      
      {/* Exit confirmation */}
      <AnimatePresence>
        {showExitPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center z-30"
          >
            <div className="bg-gray-900 rounded-xl p-6 max-w-md text-center">
              <h3 className="text-xl text-white mb-4">Exit Recording?</h3>
              <p className="text-gray-300 mb-6">
                Your recording will be lost. Are you sure you want to exit?
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => setShowExitPrompt(false)}
                  className="px-4 py-2 rounded-md bg-gray-700 text-white"
                >
                  Continue Recording
                </button>
                <button 
                  onClick={handleConfirmCancel}
                  className="px-4 py-2 rounded-md bg-red-600 text-white"
                >
                  Exit & Discard
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImmersiveRecordingExperience;
