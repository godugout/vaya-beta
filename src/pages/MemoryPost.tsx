import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MessageSquare, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoryMemoryCard } from "@/components/memory/StoryMemoryCard";
import { PhotoMemoryCard } from "@/components/memory/PhotoMemoryCard";
import { AudioMemoryCard } from "@/components/memory/AudioMemoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Memory, MemoryRecord, StoryMemory, PhotoMemory, AudioMemory } from "@/components/memory/types";
import { supabase } from "@/integrations/supabase/client";

const convertToMemory = (record: MemoryRecord): Memory => {
  const baseMemory: Memory = {
    id: record.id,
    type: record.memory_type,
    content_url: record.content_url,
    created_at: record.created_at,
    title: record.title,
    description: record.description,
    metadata: record.metadata,
  };

  if (record.memory_type === 'photo') {
    return {
      ...baseMemory,
      type: 'photo',
      photo_url: record.content_url,
      caption: record.description,
    } as PhotoMemory;
  } else if (record.memory_type === 'audio') {
    return {
      ...baseMemory,
      type: 'audio',
      content: record.description || '',
      duration: record.metadata?.duration || 0,
    } as AudioMemory;
  } else {
    // Story type
    return {
      ...baseMemory,
      type: 'story',
      duration: record.metadata?.duration || 0,
    } as StoryMemory;
  }
};

const MemoryPost = () => {
  const { id } = useParams();

  const { data: memory, isLoading, error } = useQuery({
    queryKey: ["memory", id],
    queryFn: async () => {
      if (!id) throw new Error("Memory ID is required");
      
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      if (!data) throw new Error("Memory not found");
      
      return convertToMemory(data as unknown as MemoryRecord);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center">
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !memory) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Memory not found</h1>
          <p className="text-muted-foreground mb-4">This memory might have been removed or you don't have access to it.</p>
          <Link to="/memory-lane">
            <Button variant="outline">Return to Memory Lane</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/memory-lane"
                className="flex items-center text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Memory Lane
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {memory.type === "story" ? (
            <StoryMemoryCard memory={memory as StoryMemory} />
          ) : memory.type === "photo" ? (
            <PhotoMemoryCard memory={memory as PhotoMemory} />
          ) : memory.type === "audio" ? (
            <AudioMemoryCard memory={memory as AudioMemory} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MemoryPost;
