import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Play, FileText, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

type StoryType = "text" | "audio" | "photo" | "video";

interface BaseStory {
  id: string;
  title: string;
  description: string | null;
  story_type: StoryType;
  created_at: string;
  audio_url: string | null;
  user_id: string;
  family_id: string | null;
  user?: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
}

interface TextStory extends BaseStory {
  story_type: "text";
}

interface AudioStory extends BaseStory {
  story_type: "audio";
}

interface PhotoStory extends BaseStory {
  story_type: "photo";
}

interface VideoStory extends BaseStory {
  story_type: "video";
}

type Story = TextStory | AudioStory | PhotoStory | VideoStory;

interface FamilyStoriesSectionProps {
  familyId?: string;
  limit?: number;
  className?: string;
}

const FamilyStoriesSection = ({ familyId, limit = 9, className = "" }: FamilyStoriesSectionProps) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('stories')
          .select(`
            id, 
            title, 
            description, 
            story_type,
            audio_url,
            created_at,
            user_id,
            family_id,
            profiles:user_id(id, full_name, avatar_url)
          `)
          .order('created_at', { ascending: false });

        if (familyId) {
          query = query.eq('family_id', familyId);
        }
        
        if (limit) {
          query = query.limit(limit);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data) {
          const formattedStories = data.map(story => ({
            id: story.id,
            title: story.title,
            description: story.description,
            story_type: story.story_type as StoryType,
            audio_url: story.audio_url,
            created_at: story.created_at,
            user_id: story.user_id,
            family_id: story.family_id,
            user: story.profiles ? {
              id: story.profiles.id,
              name: story.profiles.full_name,
              avatar_url: story.profiles.avatar_url
            } : undefined
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
  }, [familyId, limit]);

  const handlePlay = (storyId: string, audioUrl: string) => {
    if (!audioUrl) return;
    
    if (currentlyPlaying === storyId) {
      if (audioElement) {
        audioElement.pause();
        setCurrentlyPlaying(null);
      }
    } else {
      if (audioElement) {
        audioElement.pause();
      }
      
      const audio = new Audio(audioUrl);
      audio.onended = () => setCurrentlyPlaying(null);
      audio.play().catch(err => console.error("Error playing audio:", err));
      setAudioElement(audio);
      setCurrentlyPlaying(storyId);
    }
  };

  const renderStoryContent = (story: Story) => {
    switch (story.story_type) {
      case "photo":
        return story.audio_url ? (
          <div className="w-full aspect-video overflow-hidden rounded-md mb-3">
            <img 
              src={story.audio_url} 
              alt={story.title}
              className="w-full h-full object-cover" 
            />
          </div>
        ) : null;
        
      case "audio":
        return (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 mb-3"
            onClick={(e) => {
              e.stopPropagation();
              if (story.audio_url) {
                handlePlay(story.id, story.audio_url);
              }
            }}
          >
            {currentlyPlaying === story.id ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Listen</span>
              </>
            )}
          </Button>
        );
        
      case "text":
      default:
        return null;
    }
  };

  const getStoryTypeIcon = (type: StoryType) => {
    switch (type) {
      case "photo":
        return <ImageIcon className="h-4 w-4 text-blue-500" />;
      case "audio":
        return <Play className="h-4 w-4 text-green-500" />;
      case "text":
      default:
        return <FileText className="h-4 w-4 text-amber-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4 space-y-3">
                <div className="w-full h-40 bg-gray-200 rounded-md" />
                <div className="flex items-center gap-2">
                  <div className="rounded-full h-8 w-8 bg-gray-200" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <StoryCard key={story.id} story={story} currentlyPlaying={currentlyPlaying} handlePlay={handlePlay} />
        ))}
      </div>
      
      {stories.length === 0 && (
        <div className="text-center py-12 bg-card dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-2">No stories found</h3>
          <p className="text-muted-foreground mb-6">
            Start capturing precious family stories
          </p>
          <Button className="bg-forest hover:bg-forest/90">
            Share Your First Story
          </Button>
        </div>
      )}
    </div>
  );
};

interface StoryCardProps {
  story: Story;
  currentlyPlaying: string | null;
  handlePlay: (storyId: string, audioUrl: string) => void;
}

const StoryCard = ({ story, currentlyPlaying, handlePlay }: StoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          {renderStoryContent(story)}
          
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={story.user?.avatar_url || ''} />
              <AvatarFallback>
                {story.user?.name?.substring(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="font-medium text-sm">{story.user?.name || 'Anonymous'}</div>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
            {getStoryTypeIcon(story.story_type)}
            <span>{format(new Date(story.created_at), "MMM d, yyyy")}</span>
          </div>
          
          <h3 className="text-lg font-medium mb-2">{story.title}</h3>
          
          {story.description && (
            <p className="text-gray-600 text-sm line-clamp-3">
              {story.description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
  
  function renderStoryContent(story: Story) {
    switch (story.story_type) {
      case "photo":
        return story.audio_url ? (
          <div className="w-full aspect-video overflow-hidden rounded-md mb-3">
            <img 
              src={story.audio_url} 
              alt={story.title}
              className="w-full h-full object-cover" 
            />
          </div>
        ) : null;
        
      case "audio":
        return (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 mb-3"
            onClick={(e) => {
              e.stopPropagation();
              if (story.audio_url) {
                handlePlay(story.id, story.audio_url);
              }
            }}
          >
            {currentlyPlaying === story.id ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Listen</span>
              </>
            )}
          </Button>
        );
        
      case "text":
      default:
        return null;
    }
  }
  
  function getStoryTypeIcon(type: StoryType) {
    switch (type) {
      case "photo":
        return <ImageIcon className="h-4 w-4 text-blue-500" />;
      case "audio":
        return <Play className="h-4 w-4 text-green-500" />;
      case "text":
      default:
        return <FileText className="h-4 w-4 text-amber-500" />;
    }
  }
};

export default FamilyStoriesSection;
