import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Play, Pause } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
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
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        {!isRecording ? (
          <Button
            onClick={startRecording}
            className="bg-vaya-secondary hover:bg-vaya-secondary/90 text-white w-full"
          >
            <Mic className="mr-2 h-4 w-4" />
            Start Recording
          </Button>
        ) : (
          <Button
            onClick={stopRecording}
            variant="destructive"
            className="w-full"
          >
            <Square className="mr-2 h-4 w-4" />
            Stop Recording
          </Button>
        )}

        {audioBlob && !isRecording && (
          <Button
            onClick={togglePlayback}
            variant="outline"
            className="w-full border-vaya-secondary text-vaya-secondary hover:bg-vaya-secondary hover:text-white"
          >
            {isPlaying ? (
              <Pause className="mr-2 h-4 w-4" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            {isPlaying ? "Pause" : "Play"} Recording
          </Button>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;