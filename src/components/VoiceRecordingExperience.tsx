
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Play, Pause, Trash2 } from "lucide-react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import RecordingButton from "@/components/audio/RecordingButton";
import WaveformVisualizer from "@/components/audio/WaveformVisualizer";
import AudioTimeline from "@/components/audio/AudioTimeline";
import TranscriptionDisplay from "@/components/audio/TranscriptionDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

  // Handle playback
  const togglePlayback = () => {
    if (!audioBlob) return;
    
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  const startPlayback = () => {
    if (!audioBlob) return;
    
    const url = URL.createObjectURL(audioBlob);
    const audio = new Audio(url);
    
    audio.onended = () => {
      setIsPlaying(false);
      URL.revokeObjectURL(url);
    };
    
    audio.play();
    setIsPlaying(true);
    
    // Haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const stopPlayback = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setAudioBlob(null);
    setIsPlaying(false);
    setTranscription(null);
    setAudioUrl(null);
    setHasSaved(false);
  };

  const handleSave = async () => {
    if (!audioBlob) return;
    
    setIsProcessing(true);
    try {
      // Upload audio to Supabase Storage
      const fileName = `memory-${Date.now()}.webm`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('memories')
        .upload(fileName, audioBlob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('memories')
        .getPublicUrl(fileName);
      
      setAudioUrl(publicUrl);

      // Get transcription
      if (!transcription) {
        await transcribeAudio();
      }

      // Provide haptic feedback on success
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }

      setHasSaved(true);
      
      toast({
        title: "Memory saved",
        description: "Your memory has been saved successfully",
      });

      // Call the callback with data
      if (onMemorySaved) {
        onMemorySaved({
          audioUrl: publicUrl,
          transcription: transcription || undefined
        });
      }

    } catch (error) {
      console.error('Error saving memory:', error);
      toast({
        variant: "destructive",
        title: "Failed to save",
        description: "There was an error saving your memory. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const transcribeAudio = async () => {
    if (!audioBlob) return;
    
    try {
      setIsProcessing(true);
      
      // Convert blob to base64
      const reader = new FileReader();
      const audioBase64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64data = reader.result as string;
          // Extract only the base64 part
          const base64Content = base64data.split(',')[1];
          resolve(base64Content);
        };
      });
      reader.readAsDataURL(audioBlob);
      
      const audioBase64 = await audioBase64Promise;
      
      // Call Supabase Edge Function for transcription
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { audio: audioBase64 }
      });
      
      if (error) throw error;
      
      setTranscription(data.text);
      return data.text;
      
    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        variant: "destructive",
        title: "Transcription failed",
        description: "We couldn't transcribe your audio. You can still save it.",
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  // Automatically transcribe when recording stops
  useEffect(() => {
    if (audioBlob && !transcription && !isProcessing) {
      transcribeAudio();
    }
  }, [audioBlob]);

  // Provide haptic feedback when recording starts/stops
  useEffect(() => {
    if (navigator.vibrate) {
      navigator.vibrate(isRecordingActive ? 100 : [100, 50, 100]);
    }
  }, [isRecordingActive]);

  return (
    <Card className="w-full max-w-md mx-auto shadow-md border border-gray-100">
      <CardContent className="p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">
            {isRecordingActive 
              ? "Recording..." 
              : audioBlob 
                ? "Review Your Memory" 
                : "Record Your Memory"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {isRecordingActive 
              ? "Speak clearly into your microphone" 
              : audioBlob 
                ? "Listen, transcript and save your memory" 
                : "Tap the microphone to start recording"}
          </p>
        </div>

        <WaveformVisualizer 
          isRecording={isRecordingActive} 
          audioBlob={audioBlob} 
        />

        <div className="flex justify-center">
          {!audioBlob ? (
            <RecordingButton 
              isRecording={isRecordingActive}
              onClick={isRecordingActive ? stopRecording : startRecording}
              disabled={isProcessing}
            />
          ) : (
            <div className="space-y-4 w-full">
              <AudioTimeline 
                audioBlob={audioBlob} 
                isPlaying={isPlaying} 
              />
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={togglePlayback}
                  className="rounded-full bg-lovable-teal hover:bg-lovable-teal-bright"
                  size="icon"
                  disabled={isProcessing}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-1" />
                  )}
                </Button>
                
                <Button
                  onClick={handleReset}
                  className="rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
                  size="icon"
                  disabled={isProcessing}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
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
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Save Memory"}
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
