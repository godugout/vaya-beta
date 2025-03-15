
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import RecordingButton from "@/components/audio/RecordingButton";
import WaveformVisualizer from "@/components/audio/WaveformVisualizer";
import AudioTimeline from "@/components/audio/AudioTimeline";
import TranscriptionDisplay from "@/components/audio/TranscriptionDisplay";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useAudioTranscription } from "@/components/voice-recording/hooks/useAudioTranscription";
import { useAudioPlayback } from "@/components/voice-recording/hooks/useAudioPlayback";
import { useMemorySaving } from "@/components/voice-recording/hooks/useMemorySaving";
import AudioControls from "@/components/voice-recording/AudioControls";
import RecordingStatus from "@/components/voice-recording/RecordingStatus";

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

  const handleReset = () => {
    setAudioBlob(null);
    setIsPlaying(false);
    resetSavedState();
  };

  const handleSave = async () => {
    if (audioBlob) {
      await saveMemory(audioBlob, transcription);
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
        <RecordingStatus 
          isRecordingActive={isRecordingActive} 
          hasAudioBlob={!!audioBlob} 
        />

        <WaveformVisualizer 
          isRecording={isRecordingActive} 
          audioBlob={audioBlob} 
        />

        <div className="flex justify-center">
          {!audioBlob ? (
            <RecordingButton 
              isRecording={isRecordingActive}
              onClick={isRecordingActive ? stopRecording : startRecording}
              disabled={isProcessing || isTranscribing}
            />
          ) : (
            <div className="space-y-4 w-full">
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
            </div>
          )}
        </div>

        {audioBlob && !hasSaved && (
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
              {isProcessing || isTranscribing ? "Processing..." : "Save Memory"}
            </Button>
          </motion.div>
        )}

        {transcription && (
          <TranscriptionDisplay transcription={transcription} />
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceRecordingExperience;
