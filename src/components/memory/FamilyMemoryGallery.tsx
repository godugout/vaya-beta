import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Image as ImageIcon, FileText } from "lucide-react";
import { motion } from "framer-motion";

type MemoryType = "text" | "photo" | "audio" | "video";

interface BaseMemory {
  id: string;
  title: string;
  description: string | null;
  memory_type: MemoryType;
  created_at: string;
  content_url: string | null;
  user_id: string;
  family_id: string | null;
  user?: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
}

interface TextMemory extends BaseMemory {
  memory_type: "text";
}

interface PhotoMemory extends BaseMemory {
  memory_type: "photo";
}

interface AudioMemory extends BaseMemory {
  memory_type: "audio";
}

interface VideoMemory extends BaseMemory {
  memory_type: "video";
}

type Memory = TextMemory | PhotoMemory | AudioMemory | VideoMemory;

interface FamilyMemoryGalleryProps {
  familyId?: string;
  limit?: number;
  className?: string;
}

const FamilyMemoryGallery = ({ familyId, limit = 12, className = "" }: FamilyMemoryGalleryProps) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | MemoryType>("all");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchMemories = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('memories')
          .select(`
            id, 
            title, 
            description, 
            memory_type,
            content_url,
            created_at,
            user_id,
            family_id,
            profiles(id, full_name, avatar_url)
          `)
          .order('created_at', { ascending: false });

        if (familyId) {
          query = query.eq('family_id', familyId);
        }
        
        if (activeTab !== "all") {
          query = query.eq('memory_type', activeTab);
        }
        
        if (limit) {
          query = query.limit(limit);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data) {
          const formattedMemories = data.map(memory => ({
            id: memory.id,
            title: memory.title,
            description: memory.description,
            memory_type: memory.memory_type as MemoryType,
            content_url: memory.content_url,
            created_at: memory.created_at,
            user_id: memory.user_id,
            family_id: memory.family_id,
            user: memory.profiles?.[0] ? {
              id: memory.profiles[0].id,
              name: memory.profiles[0].full_name,
              avatar_url: memory.profiles[0].avatar_url
            } : undefined
          }));
          
          setMemories(formattedMemories);
        }
      } catch (error) {
        console.error('Error fetching memories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMemories();
  }, [familyId, activeTab, limit]);

  const handlePlay = (memoryId: string, audioUrl: string) => {
    if (!audioUrl) return;
    
    if (currentlyPlaying === memoryId) {
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
      setCurrentlyPlaying(memoryId);
    }
  };

  const renderMemoryContent = (memory: Memory) => {
    switch (memory.memory_type) {
      case "photo":
        return memory.content_url ? (
          <div className="w-full aspect-video overflow-hidden rounded-md mb-3">
            <img 
              src={memory.content_url} 
              alt={memory.title}
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
              if (memory.content_url) {
                handlePlay(memory.id, memory.content_url);
              }
            }}
          >
            {currentlyPlaying === memory.id ? (
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
        );
        
      case "text":
      default:
        return null;
    }
  };

  const getMemoryTypeIcon = (type: MemoryType) => {
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
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="photo">Photos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>
        </Tabs>
        
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
      <Tabs 
        defaultValue="all" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "all" | MemoryType)}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="photo">Photos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map(memory => (
              <MemoryCard key={memory.id} memory={memory} currentlyPlaying={currentlyPlaying} handlePlay={handlePlay} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="text" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.filter(m => m.memory_type === "text").map(memory => (
              <MemoryCard key={memory.id} memory={memory} currentlyPlaying={currentlyPlaying} handlePlay={handlePlay} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="photo" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.filter(m => m.memory_type === "photo").map(memory => (
              <MemoryCard key={memory.id} memory={memory} currentlyPlaying={currentlyPlaying} handlePlay={handlePlay} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="audio" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.filter(m => m.memory_type === "audio").map(memory => (
              <MemoryCard key={memory.id} memory={memory} currentlyPlaying={currentlyPlaying} handlePlay={handlePlay} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {memories.length === 0 && (
        <div className="text-center py-12 bg-card dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-2">No memories found</h3>
          <p className="text-muted-foreground mb-6">
            Start capturing precious family memories
          </p>
          <Button className="bg-forest hover:bg-forest/90">
            Add Your First Memory
          </Button>
        </div>
      )}
    </div>
  );
};

interface MemoryCardProps {
  memory: Memory;
  currentlyPlaying: string | null;
  handlePlay: (memoryId: string, audioUrl: string) => void;
}

const MemoryCard = ({ memory, currentlyPlaying, handlePlay }: MemoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          {renderMemoryContent(memory)}
          
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={memory.user?.avatar_url || ''} />
              <AvatarFallback>
                {memory.user?.name?.substring(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="font-medium text-sm">{memory.user?.name || 'Anonymous'}</div>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
            {getMemoryTypeIcon(memory.memory_type)}
            <span>{format(new Date(memory.created_at), "MMM d, yyyy")}</span>
          </div>
          
          <h3 className="text-lg font-medium mb-2">{memory.title}</h3>
          
          {memory.description && (
            <p className="text-gray-600 text-sm line-clamp-3">
              {memory.description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
  
  function renderMemoryContent(memory: Memory) {
    switch (memory.memory_type) {
      case "photo":
        return memory.content_url ? (
          <div className="w-full aspect-video overflow-hidden rounded-md mb-3">
            <img 
              src={memory.content_url} 
              alt={memory.title}
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
              if (memory.content_url) {
                handlePlay(memory.id, memory.content_url);
              }
            }}
          >
            {currentlyPlaying === memory.id ? (
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
        );
        
      case "text":
      default:
        return null;
    }
  }
  
  function getMemoryTypeIcon(type: MemoryType) {
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

export default FamilyMemoryGallery;
