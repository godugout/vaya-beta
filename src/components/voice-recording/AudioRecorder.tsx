
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, PlayCircle, PauseCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob, url: string) => void;
  className?: string;
}

export const AudioRecorder = ({ onRecordingComplete, className }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        
        setAudioBlob(audioBlob);
        setAudioUrl(url);
        
        // Stop all tracks from the stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const togglePlayback = () => {
    if (!audioUrl) return;
    
    if (!audioElementRef.current) {
      const audio = new Audio(audioUrl);
      audioElementRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
      };
    }
    
    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };
  
  const handleSave = () => {
    if (audioBlob && audioUrl) {
      onRecordingComplete(audioBlob, audioUrl);
    }
  };
  
  const resetRecording = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    
    setAudioBlob(null);
    setAudioUrl(null);
    setIsPlaying(false);
  };
  
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {!audioBlob ? (
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          className={cn(
            "rounded-full h-16 w-16 flex items-center justify-center",
            isRecording 
              ? "bg-red-500 hover:bg-red-600 animate-pulse" 
              : "bg-blue-600 hover:bg-blue-700"
          )}
          variant="default"
          size="icon"
        >
          {isRecording ? (
            <Square className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
      ) : (
        <div className="space-y-4 w-full">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <PauseCircle className="h-6 w-6 text-blue-600" />
              ) : (
                <PlayCircle className="h-6 w-6 text-blue-600" />
              )}
            </Button>
            
            <div className="flex-1 mx-2">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-600 rounded-full"
                  animate={{ width: isPlaying ? "100%" : "0%" }}
                  transition={{ duration: isPlaying ? 3 : 0, ease: "linear" }}
                />
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-gray-500"
              onClick={resetRecording}
            >
              Reset
            </Button>
          </div>
          
          <Button
            className="w-full bg-forest hover:bg-forest/90"
            onClick={handleSave}
          >
            Save Recording
          </Button>
        </div>
      )}
      
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
        {isRecording 
          ? "Recording in progress..." 
          : audioBlob 
            ? "Review your recording" 
            : "Tap to start recording"}
      </div>
    </div>
  );
};

export default AudioRecorder;
