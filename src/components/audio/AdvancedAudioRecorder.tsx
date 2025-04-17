
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Square, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { useAdvancedAudioRecorder } from "@/hooks/useAdvancedAudioRecorder";
import { cn } from "@/lib/utils";

interface AdvancedAudioRecorderProps {
  onRecordingComplete?: (blob: Blob) => void;
  className?: string;
}

const AdvancedAudioRecorder = ({ 
  onRecordingComplete, 
  className 
}: AdvancedAudioRecorderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const {
    isRecording,
    audioBlob,
    volume,
    duration,
    startRecording,
    stopRecording
  } = useAdvancedAudioRecorder({
    sampleRate: 48000,
    bitDepth: 16,
    silenceThreshold: 0.1,
    silenceTimeout: 2000
  });

  const handlePlayback = () => {
    if (!audioBlob) return;

    if (isPlaying && audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.onended = () => {
        setIsPlaying(false);
        setAudioElement(null);
      };
      audio.play();
      setAudioElement(audio);
      setIsPlaying(true);
    }
  };

  const handleComplete = () => {
    if (audioBlob && onRecordingComplete) {
      onRecordingComplete(audioBlob);
    }
  };

  return (
    <Card className={cn("p-4", className)}>
      <div className="space-y-4">
        {/* Waveform Visualization */}
        <div className="h-24 bg-black/5 rounded-lg overflow-hidden">
          <motion.div
            className="h-full flex items-center justify-center"
            animate={{
              opacity: isRecording ? 1 : 0.5
            }}
          >
            <div className="flex items-center gap-0.5 h-full p-4">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-forest rounded-full"
                  animate={{
                    height: isRecording 
                      ? `${Math.max(15, Math.min(100, volume * 100 + Math.random() * 30))}%`
                      : "20%"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.5
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recording Duration */}
        <div className="text-center text-sm text-gray-500">
          {isRecording ? (
            <span>Recording: {duration.toFixed(1)}s</span>
          ) : audioBlob ? (
            <span>Recording Complete</span>
          ) : (
            <span>Ready to Record</span>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!audioBlob ? (
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              size="icon"
              className={cn(
                "h-12 w-12 rounded-full",
                isRecording && "bg-red-500 hover:bg-red-600"
              )}
            >
              {isRecording ? (
                <Square className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
          ) : (
            <>
              <Button
                onClick={handlePlayback}
                size="icon"
                variant="outline"
                className="h-12 w-12 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>
              <Button
                onClick={handleComplete}
                className="bg-forest hover:bg-forest/90"
              >
                Save Recording
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AdvancedAudioRecorder;
