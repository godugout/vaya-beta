
import { useState, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Image, FileText, AudioLines } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type StoryType = "audio" | "photo" | "transcript";

export interface StoryCardProps {
  id: string;
  title: string;
  content: string;
  type: StoryType;
  audioUrl?: string;
  imageUrl?: string;
  date: string;
  author?: {
    name: string;
    avatar?: string;
  };
  className?: string;
}

export const StoryCard = ({
  id,
  title,
  content,
  type,
  audioUrl,
  imageUrl,
  date,
  author,
  className,
}: StoryCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayback = () => {
    if (!audioRef.current && audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderCardIcon = () => {
    switch (type) {
      case "audio":
        return <AudioLines className="h-5 w-5 text-vaya-secondary" />;
      case "photo":
        return <Image className="h-5 w-5 text-vaya-accent-orange" />;
      case "transcript":
        return <FileText className="h-5 w-5 text-vaya-accent-teal" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.3 }}
      className={cn("h-full", className)}
    >
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200 rounded-xl overflow-hidden">
        {type === "photo" && imageUrl && (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            {audioUrl && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-3 right-3 rounded-full bg-black/60 hover:bg-black/80 text-white"
                onClick={togglePlayback}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
              </Button>
            )}
          </div>
        )}

        <CardContent className={cn("flex-grow p-4", type === "photo" ? "pt-3" : "pt-4")}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              {renderCardIcon()}
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-2 line-clamp-2">{title}</h3>
          
          {type === "transcript" ? (
            <p className="text-gray-600 line-clamp-4 font-story">{content}</p>
          ) : (
            <p className="text-gray-600 line-clamp-2">{content}</p>
          )}
        </CardContent>

        {(type === "audio" || (type === "transcript" && audioUrl)) && (
          <CardFooter className="p-4 pt-0">
            <Button
              variant={type === "audio" ? "default" : "outline"}
              size="sm"
              className="w-full gap-2"
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {isPlaying ? "Pause Audio" : "Play Audio"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};
