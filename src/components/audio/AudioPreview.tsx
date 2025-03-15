
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface AudioPreviewProps {
  audioBlob: Blob;
  disabled?: boolean;
}

const AudioPreview = ({ audioBlob, disabled }: AudioPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

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
    <Button
      onClick={togglePlayback}
      variant="outline"
      className="w-full border-[#6C5CE7] text-[#6C5CE7] hover:bg-[#6C5CE7] hover:text-white dark:border-[#8F84EB] dark:text-[#8F84EB] dark:hover:bg-[#8F84EB]"
      disabled={disabled}
    >
      {isPlaying ? (
        <Pause className="mr-2 h-4 w-4" />
      ) : (
        <Play className="mr-2 h-4 w-4" />
      )}
      {isPlaying ? "Pause" : "Play"} Recording
    </Button>
  );
};

export default AudioPreview;
