
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useAudioTranscription } from "@/components/voice-recording/hooks/useAudioTranscription";
import { RecordingButtonWithPulse } from "./RecordingButtonWithPulse";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, CheckCircle, RefreshCw, Volume2 } from "lucide-react";
import ResponsiveWaveform from "./ResponsiveWaveform";

interface ImmersiveVoiceRecorderProps {
  onRecordingComplete?: (blob: Blob, transcription?: string) => void;
  onCancel?: () => void;
  className?: string;
}

export const ImmersiveVoiceRecorder = ({
  onRecordingComplete,
  onCancel,
  className
}: ImmersiveVoiceRecorderProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Voice recorder hook
  const {
    isRecordingActive,
    audioBlob,
    startRecording,
    stopRecording,
    volume = 0
  } = useVoiceRecorder({
    silenceDetection: false,
    noiseFiltering: true
  });
  
  // Transcription hook
  const {
    transcription,
    isProcessing: isTranscribing,
    transcribeAudio
  } = useAudioTranscription();

  // Automatically hide controls after inactivity during recording
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

  // Handle recording actions
  const handleToggleRecording = () => {
    if (isRecordingActive) {
      stopRecording();
      // Provide haptic feedback when stopping
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    } else {
      startRecording();
      // Provide haptic feedback when starting
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    }
  };

  // Handle completing the recording
  const handleComplete = async () => {
    if (!audioBlob) return;
    
    setIsProcessing(true);
    
    try {
      // Transcribe if not already done
      if (!transcription) {
        await transcribeAudio(audioBlob);
      }
      
      // Call completion handler
      if (onRecordingComplete) {
        onRecordingComplete(audioBlob, transcription || undefined);
      }
      
      setIsSuccess(true);
      
      // Reset after showing success state
      setTimeout(() => {
        setIsSuccess(false);
        setIsProcessing(false);
      }, 2000);
      
    } catch (error) {
      console.error("Error processing recording:", error);
      setIsProcessing(false);
    }
  };

  // Calculate color based on voice intensity
  const getIntensityColor = (volume: number): string => {
    // Start with a soft orange (saffron) for low volume
    if (volume < 0.3) return "rgb(253, 186, 116)";
    // Move to deeper orange for medium volume
    if (volume < 0.6) return "rgb(251, 146, 60)";
    // Bright saffron for high volume
    if (volume < 0.8) return "rgb(249, 115, 22)";
    // Deep saffron/red for very high volume
    return "rgb(239, 68, 68)";
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300", 
      isRecordingActive ? "border-orange-300 shadow-lg" : "",
      className
    )}>
      <div 
        ref={containerRef} 
        className={cn(
          "relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950",
          isRecordingActive ? "bg-gradient-to-b from-orange-50/20 to-slate-100 dark:from-orange-900/10" : ""
        )}
      >
        {/* Decorative Hanuman-inspired elements - subtle mandala patterns */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 border-t border-l border-orange-200 rounded-tl-full"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 border-b border-r border-orange-200 rounded-br-full"></div>
          {isRecordingActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.07 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-80 h-80 border-2 border-orange-300 rounded-full"></div>
              <div className="absolute w-60 h-60 border border-orange-300 rounded-full"></div>
              <div className="absolute w-40 h-40 border border-orange-300 rounded-full"></div>
            </motion.div>
          )}
        </div>
        
        <CardContent className="p-6 flex flex-col items-center">
          {/* Main content area */}
          <div className="relative z-10 py-6 flex flex-col items-center w-full max-w-md mx-auto min-h-[300px]">
            
            {/* Waveform visualization */}
            <div className="w-full h-24 mb-6">
              <ResponsiveWaveform 
                isActive={isRecordingActive} 
                volume={volume}
                color={getIntensityColor(volume)}
              />
            </div>
            
            {/* Recording status */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isRecordingActive ? "recording" : "ready"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-4 text-center"
              >
                {isRecordingActive ? (
                  <div className="flex items-center gap-2 text-orange-600">
                    <span className="inline-block h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                    Recording your story...
                  </div>
                ) : audioBlob ? (
                  <div className="text-green-600">Recording complete</div>
                ) : (
                  <div className="text-slate-500">Ready to record your story</div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Large microphone button */}
            <div className="mb-8">
              <RecordingButtonWithPulse
                isRecording={isRecordingActive}
                onClick={handleToggleRecording}
                disabled={isProcessing || isTranscribing || isSuccess}
                size="lg"
              />
            </div>
            
            {/* Audio controls (only shown when recording is complete) */}
            <AnimatePresence>
              {audioBlob && !isRecordingActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="w-full space-y-4"
                >
                  {/* Audio preview */}
                  <div className="w-full bg-slate-50 border rounded-lg p-3 dark:bg-slate-900">
                    <audio 
                      src={URL.createObjectURL(audioBlob)} 
                      controls 
                      className="w-full"
                    />
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        stopRecording();
                        startRecording();
                      }}
                      disabled={isProcessing || isTranscribing || isSuccess}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Record Again
                    </Button>
                    
                    <Button
                      onClick={handleComplete}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                      disabled={isProcessing || isTranscribing || isSuccess}
                    >
                      {isProcessing || isTranscribing ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : isSuccess ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Saved!
                        </div>
                      ) : (
                        "Save Recording"
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
