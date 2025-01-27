import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Play, Pause } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MemoryUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
        const audioUrl = URL.createObjectURL(file);
        const audioElement = new Audio(audioUrl);
        setAudio(audioElement);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select an audio file.",
          variant: "destructive",
        });
      }
    }
  };

  const handlePlayPause = () => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        toast({
          title: "Playback Error",
          description: "There was an error playing this audio.",
          variant: "destructive",
        });
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-vaya-chat-bg rounded-lg shadow-lg animate-fadeIn">
      <div className="text-2xl font-semibold mb-4 text-gray-800">
        Upload Your Memory
      </div>
      <div className="space-y-4 w-full">
        <Button
          onClick={() => document.getElementById('file-upload')?.click()}
          className="bg-vaya-secondary hover:bg-vaya-secondary/90 text-white w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          Select Audio File
        </Button>
        <input
          type="file"
          id="file-upload"
          accept="audio/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        {selectedFile && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Selected: {selectedFile.name}</p>
            <Button
              onClick={handlePlayPause}
              variant="outline"
              className="border-vaya-secondary text-vaya-secondary hover:bg-vaya-secondary hover:text-white"
            >
              {isPlaying ? (
                <Pause className="mr-2 h-4 w-4" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              {isPlaying ? "Pause" : "Play"} Audio
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryUpload;