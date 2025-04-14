
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, FileText, AudioLines, Video, Plus, Loader } from 'lucide-react';
import { storyService, UserStory } from '@/services/storyService';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

export function StoryGallery() {
  const [stories, setStories] = useState<UserStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadStories = async () => {
      try {
        setLoading(true);
        const data = await storyService.getStories(true);
        setStories(data);
      } catch (error) {
        console.error('Error loading stories:', error);
        toast({
          title: 'Error loading stories',
          description: 'Failed to load stories. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadStories();
  }, [toast]);
  
  const getStoryTypeIcon = (story: UserStory) => {
    if (!story.media) return <FileText />;
    
    const fileType = story.media.file_type;
    if (fileType.startsWith('audio/')) return <AudioLines />;
    if (fileType.startsWith('video/')) return <Video />;
    return <FileText />;
  };
  
  const togglePlayback = (story: UserStory) => {
    if (playingId === story.id) {
      setPlayingId(null);
    } else {
      setPlayingId(story.id);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }
  
  if (stories.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">No stories yet</h3>
        <p className="text-sm text-gray-500 mb-4">
          Start capturing your memories by creating your first story
        </p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Story
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <Card key={story.id} className="overflow-hidden flex flex-col">
          <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
            {story.media && story.media.file_type.startsWith('video/') ? (
              <video 
                src={story.media.file_path} 
                poster={story.media.thumbnail_path}
                className="w-full h-full object-cover"
                controls
              />
            ) : story.media && story.media.thumbnail_path ? (
              <img 
                src={story.media.thumbnail_path} 
                alt={story.title}
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200">
                {getStoryTypeIcon(story)}
              </div>
            )}
            
            {story.media && story.media.file_type.startsWith('audio/') && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-2 right-2 rounded-full bg-black/60 text-white hover:bg-black/80"
                onClick={() => togglePlayback(story)}
              >
                {playingId === story.id ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
              </Button>
            )}
          </div>
          
          <CardContent className="flex-grow p-4">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span className="flex items-center">
                {getStoryTypeIcon(story)}
                <span className="ml-1">
                  {story.created_at && new Date(story.created_at).toLocaleDateString()}
                </span>
              </span>
            </div>
            
            <h3 className="font-medium text-lg mb-2 line-clamp-2">{story.title}</h3>
            
            {story.content && (
              <p className="text-gray-600 line-clamp-3">{story.content}</p>
            )}
          </CardContent>
          
          <CardFooter className="p-4 pt-0">
            <Button variant="outline" className="w-full" onClick={() => togglePlayback(story)}>
              View Story
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default StoryGallery;
