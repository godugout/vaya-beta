
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useAudioTranscription } from "@/components/voice-recording/hooks/useAudioTranscription";
import AudioPreview from "./audio/AudioPreview";
import RecordingControls from "./audio/RecordingControls";
import TranscriptionDisplay from "./audio/TranscriptionDisplay";

interface VoiceRecorderProps {
  onMessageSent: (message: { content: string; attachments?: { type: string; url: string }[] }) => void;
  setIsRecording: (value: boolean) => void;
}

const VoiceRecorder = ({ onMessageSent, setIsRecording }: VoiceRecorderProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const { toast } = useToast();
  
  const {
    isRecordingActive,
    audioBlob,
    startRecording,
    stopRecording,
    setAudioBlob
  } = useVoiceRecorder();
  
  const { transcribeAudio } = useAudioTranscription();

  const handleSend = async () => {
    if (!audioBlob) return;

    setIsProcessing(true);
    try {
      // If no transcription yet, generate one before sending
      if (!transcription) {
        setIsTranscribing(true);
        const text = await transcribeAudio(audioBlob);
        setTranscription(text);
        setIsTranscribing(false);
      }
      
      const fileName = `${crypto.randomUUID()}.webm`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('stories')
        .upload(fileName, audioBlob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('stories')
        .getPublicUrl(fileName);

      onMessageSent({
        content: transcription || "Audio message",
        attachments: [{ type: 'audio', url: publicUrl }],
      });

      setIsRecording(false);
      setAudioBlob(null);
      setTranscription(null);
      
      toast({
        title: "Success",
        description: "Your voice message has been sent!",
      });

    } catch (error) {
      console.error('Error processing audio:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your voice message. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTranscribe = async () => {
    if (!audioBlob) return;
    
    setIsTranscribing(true);
    try {
      const text = await transcribeAudio(audioBlob);
      setTranscription(text);
      toast({
        title: "Transcription complete",
        description: "Your recording has been transcribed.",
      });
    } catch (error) {
      console.error('Error transcribing audio:', error);
      toast({
        variant: "destructive",
        title: "Transcription failed",
        description: "Failed to transcribe your recording. Please try again.",
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleCancel = () => {
    setAudioBlob(null);
    setTranscription(null);
    setIsRecording(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        {!audioBlob ? (
          <RecordingControls
            isRecordingActive={isRecordingActive}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
          />
        ) : (
          <div className="space-y-4">
            <AudioPreview 
              audioBlob={audioBlob}
              disabled={isProcessing || isTranscribing}
            />
            
            {transcription ? (
              <TranscriptionDisplay transcription={transcription} />
            ) : (
              <Button
                onClick={handleTranscribe}
                className="w-full"
                disabled={isTranscribing}
                variant="outline"
              >
                {isTranscribing ? "Transcribing..." : "Generate Transcription"}
              </Button>
            )}
            
            <div className="flex gap-2">
              <Button
                onClick={handleSend}
                className="flex-1 bg-vaya-secondary hover:bg-vaya-secondary/90 text-white"
                disabled={isProcessing || isTranscribing}
              >
                <Send className="mr-2 h-4 w-4" />
                {isProcessing ? "Sending..." : "Send"}
              </Button>
              
              <Button
                onClick={handleCancel}
                variant="destructive"
                disabled={isProcessing || isTranscribing}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
