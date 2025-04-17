
import { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface FamilyStoryCardProps {
  title: string;
  description: string;
  author: string;
  audioUrl?: string;
  storyId?: string;
  className?: string;
}

const FamilyStoryCard = ({ 
  title, 
  description, 
  author, 
  audioUrl,
  storyId,
  className 
}: FamilyStoryCardProps) => {
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
        audioRef.current.play().catch(err => {
          console.error("Error playing audio:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="h-full overflow-hidden hover:shadow-md transition-all duration-200">
        <CardContent className="p-5">
          <h3 className="font-medium text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">By {author}</span>
            
            <div className="flex items-center gap-2">
              {audioUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5"
                  onClick={togglePlayback}
                >
                  {isPlaying ? (
                    <><Pause className="h-3.5 w-3.5" /> Pause</>
                  ) : (
                    <><Play className="h-3.5 w-3.5 ml-0.5" /> Play</>
                  )}
                </Button>
              )}
              
              {storyId && (
                <Link to={`/story/${storyId}`}>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FamilyStoryCard;
