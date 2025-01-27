import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Play, Pause, Send, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface VoiceRecorderProps {
  onMessageSent: (message: { content: string; attachments?: { type: string; url: string }[] }) => void;
  setIsRecording: (value: boolean) => void;
}

const VoiceRecorder = ({ onMessageSent, setIsRecording }: VoiceRecorderProps) => {
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecordingActive(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not access microphone. Please check your permissions.",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecordingActive) {
      mediaRecorderRef.current.stop();
      setIsRecordingActive(false);
    }
  };

  const togglePlayback = () => {
    if (!audioBlob) return;

    if (!audioElementRef.current) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audioElementRef.current = audio;
      audio.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSend = async () => {
    if (!audioBlob) return;

    setIsProcessing(true);
    try {
      // Upload audio file to Supabase Storage
      const fileName = `${crypto.randomUUID()}.webm`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('stories')
        .upload(fileName, audioBlob);

      if (uploadError) throw uploadError;

      // Get public URL for the audio file
      const { data: { publicUrl } } = supabase.storage
        .from('stories')
        .getPublicUrl(fileName);

      // Send message with audio attachment
      // Note: We're temporarily setting the content to a placeholder since we're not using transcription
      onMessageSent({
        content: "Audio message",
        attachments: [{ type: 'audio', url: publicUrl }],
      });

      // Reset recorder state
      setIsRecording(false);
      setAudioBlob(null);
      
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

  const handleCancel = () => {
    setAudioBlob(null);
    setIsRecording(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        {!audioBlob ? (
          <Button
            onClick={isRecordingActive ? stopRecording : startRecording}
            className={`${
              isRecordingActive
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                : "bg-vaya-secondary hover:bg-vaya-secondary/90"
            } text-white w-full`}
          >
            {isRecordingActive ? (
              <Square className="mr-2 h-4 w-4" />
            ) : (
              <Mic className="mr-2 h-4 w-4" />
            )}
            {isRecordingActive ? "Stop Recording" : "Start Recording"}
          </Button>
        ) : (
          <div className="space-y-2">
            <Button
              onClick={togglePlayback}
              variant="outline"
              className="w-full border-vaya-secondary text-vaya-secondary hover:bg-vaya-secondary hover:text-white"
              disabled={isProcessing}
            >
              {isPlaying ? (
                <Pause className="mr-2 h-4 w-4" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              {isPlaying ? "Pause" : "Play"} Recording
            </Button>
            
            <div className="flex gap-2">
              <Button
                onClick={handleSend}
                className="flex-1 bg-vaya-secondary hover:bg-vaya-secondary/90 text-white"
                disabled={isProcessing}
              >
                <Send className="mr-2 h-4 w-4" />
                {isProcessing ? "Sending..." : "Send"}
              </Button>
              
              <Button
                onClick={handleCancel}
                variant="destructive"
                disabled={isProcessing}
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