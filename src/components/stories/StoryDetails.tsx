import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStory } from "@/components/stories/useStories";
import { LoadingIndicator } from "@/components/animation/LoadingIndicator";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Play, Pause } from "lucide-react";
import { format } from "date-fns";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ContentAssociations } from "@/components/associations/ContentAssociations";
import { AddContentAssociation } from "@/components/associations/AddContentAssociation";
import { TagInput } from "@/components/tags/TagInput";
import { useContentTags, useTagManagement } from "@/components/tags/hooks/useTagManagement";
import { PopularTags } from "@/components/tags/PopularTags";
import { EmotionAnalysisSection } from "@/components/emotion-detection/EmotionAnalysisSection";
import { EmotionTag } from "@/components/emotion-detection/EmotionTag";
import { EmotionType } from "@/components/emotion-detection/types";
import { useEmotionTags, useUpdatePrimaryEmotion } from "./hooks/useEmotionTags";

export const StoryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useStory(id);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const story = data?.pages[0]?.story;
  const storyTags = data?.pages[0]?.tags || [];
  
  const { addTag, removeTag } = useTagManagement('story');
  
  const { data: contentTags = [] } = useContentTags('story', id);
  const { data: emotionTagsData } = useEmotionTags(id);
  const updatePrimaryEmotion = useUpdatePrimaryEmotion();
  
  const primaryEmotion = emotionTagsData?.emotionTags?.find(tag => tag.is_primary)?.emotion as EmotionType || 'nostalgia';
  const primaryConfidence = emotionTagsData?.emotionTags?.find(tag => tag.is_primary)?.confidence || 0.7;

  const togglePlayback = () => {
    if (story?.audio_url) {
      if (!audioRef.current) {
        audioRef.current = new Audio(story.audio_url);
        audioRef.current.onended = () => setIsPlaying(false);
      }

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

  const handleAddTag = (tag: string) => {
    if (id) {
      addTag.mutate({ contentId: id, tag });
    }
  };

  const handleRemoveTag = (tagId: string) => {
    removeTag.mutate(tagId);
  };

  const handleEmotionChange = (emotion: EmotionType) => {
    if (id) {
      updatePrimaryEmotion.mutate({ storyId: id, emotion });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingIndicator size="lg" />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-medium mb-2">Story Not Found</h2>
        <p className="text-gray-600">The story you're looking for could not be found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{story.title}</CardTitle>
          <div className="flex items-center gap-2">
            {primaryEmotion && (
              <EmotionTag
                emotion={primaryEmotion}
                confidence={primaryConfidence}
              />
            )}
            {story.is_featured && (
              <Badge className="bg-blue-100 text-blue-800">Featured</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {story.description && (
            <p className="text-gray-700 mb-6">{story.description}</p>
          )}
          
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <CalendarDays className="h-4 w-4" />
            <span>Created on {format(new Date(story.created_at), "MMMM d, yyyy")}</span>
          </div>
          
          {story.description && (
            <div className="mb-6">
              <EmotionAnalysisSection
                text={story.description}
                audioUrl={story.audio_url}
                initialEmotion={primaryEmotion}
                onEmotionChange={handleEmotionChange}
              />
            </div>
          )}
          
          {story.audio_url && (
            <div className="mb-6">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={togglePlayback}
              >
                {isPlaying ? (
                  <><Pause className="h-4 w-4" /> Pause Audio</>
                ) : (
                  <><Play className="h-4 w-4" /> Play Audio</>
                )}
              </Button>
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Tags</h3>
            <TagInput
              contentType="story"
              contentId={story.id}
              title={story.title}
              description={story.description}
              existingTags={storyTags}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
            />
          </div>
          
          <div className="mb-6">
            <PopularTags limit={8} />
          </div>
          
          <div className="flex justify-end">
            <AddContentAssociation
              sourceType="story"
              sourceId={story.id}
              sourceTitle={story.title}
              buttonLabel="Link Content"
            />
          </div>
        </CardContent>
      </Card>
      
      <ContentAssociations 
        contentType="story" 
        contentId={story.id}
        title="Related Content" 
      />
    </div>
  );
};
