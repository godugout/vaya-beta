
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface Story {
  id: string;
  title: string;
  description: string | null;
  audio_url: string;
  created_at: string;
  author: {
    id: string;
    name: string;
    avatar_url: string | null;
  } | null;
  family: {
    id: string;
    name: string;
  } | null;
}

interface FamilyStoriesSectionProps {
  limit?: number;
  className?: string;
}

const FamilyStoriesSection = ({ limit = 6, className = "" }: FamilyStoriesSectionProps) => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('stories')
          .select(`
            id, 
            title, 
            description, 
            audio_url, 
            created_at,
            author_id, 
            family_id,
            profiles!author_id(id, full_name, avatar_url),
            families!family_id(id, name)
          `)
          .order('created_at', { ascending: false })
          .limit(limit);
        
        if (error) throw error;
        
        if (data) {
          const formattedStories = data.map(story => ({
            id: story.id,
            title: story.title,
            description: story.description,
            audio_url: story.audio_url,
            created_at: story.created_at,
            author: story.profiles ? {
              id: story.profiles.id,
              name: story.profiles.full_name,
              avatar_url: story.profiles.avatar_url
            } : null,
            family: story.families ? {
              id: story.families.id,
              name: story.families.name
            } : null
          }));
          
          setStories(formattedStories);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStories();
  }, [limit]);

  const handlePlay = (storyId: string, audioUrl: string) => {
    if (currentlyPlaying === storyId) {
      // Already playing this story, pause it
      if (audioElement) {
        audioElement.pause();
        setCurrentlyPlaying(null);
      }
    } else {
      // Stop any currently playing audio
      if (audioElement) {
        audioElement.pause();
      }
      
      // Play the new audio
      const audio = new Audio(audioUrl);
      audio.onended = () => setCurrentlyPlaying(null);
      audio.play().catch(err => console.error("Error playing audio:", err));
      setAudioElement(audio);
      setCurrentlyPlaying(storyId);
    }
  };

  const navigateToStory = (storyId: string) => {
    navigate(`/story/${storyId}`);
  };

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h2 className="text-2xl font-semibold mb-4">Family Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-full h-10 w-10 bg-gray-200" />
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-3 w-32 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Family Stories</h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => navigate('/share-stories')}
        >
          <span>View All</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <motion.div 
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer"
            onClick={() => navigateToStory(story.id)}
          >
            <Card className="h-full hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={story.author?.avatar_url || ''} />
                    <AvatarFallback>
                      {story.author?.name?.substring(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{story.author?.name || 'Anonymous'}</div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(story.created_at), "MMM d, yyyy")}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-2">{story.title}</h3>
                
                {story.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {story.description}
                  </p>
                )}
                
                <div className="flex justify-between items-center pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(story.id, story.audio_url);
                    }}
                  >
                    {currentlyPlaying === story.id ? (
                      <>
                        <Pause className="h-4 w-4" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        <span>Listen</span>
                      </>
                    )}
                  </Button>
                  
                  {story.family && (
                    <div className="text-xs text-gray-500">
                      {story.family.name}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {stories.length === 0 && (
        <div className="text-center py-12 bg-card dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-2">No stories yet</h3>
          <p className="text-muted-foreground mb-6">Start sharing your family stories</p>
        </div>
      )}
    </div>
  );
};

export default FamilyStoriesSection;
