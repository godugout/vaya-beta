
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PhotoMemory, StoryMemory, AudioMemory } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Bookmark, MessageSquare, Heart, Share2, Image, FileText, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { motion } from "framer-motion";

type Memory = PhotoMemory | StoryMemory | AudioMemory;
type FamilyId = string;

interface FamilyMemoryGalleryProps {
  className?: string;
}

const FamilyMemoryGallery = ({ className }: FamilyMemoryGalleryProps) => {
  const { toast } = useToast();
  const [selectedFamily, setSelectedFamily] = useState<FamilyId | "all">("all");
  const [families, setFamilies] = useState<{id: string, name: string}[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch families for the filter
    const fetchFamilies = async () => {
      try {
        const { data, error } = await supabase
          .from('families')
          .select('id, name');
        
        if (error) throw error;
        if (data) setFamilies(data);
      } catch (error) {
        console.error('Error fetching families:', error);
      }
    };

    fetchFamilies();
  }, []);

  useEffect(() => {
    const fetchMemories = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('memories')
          .select('*, profiles!user_id(full_name, avatar_url)')
          .order('created_at', { ascending: false });
        
        if (selectedFamily !== "all") {
          query = query.eq('family_id', selectedFamily);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data) {
          const formattedMemories = data.map(memory => {
            const baseMemory = {
              id: memory.id,
              type: memory.memory_type as 'photo' | 'story' | 'audio',
              title: memory.title,
              description: memory.description || '',
              content_url: memory.content_url,
              created_at: memory.created_at,
              user: memory.profiles ? {
                name: memory.profiles.full_name,
                avatar: memory.profiles.avatar_url
              } : undefined
            };
            
            if (memory.memory_type === 'photo') {
              return {
                ...baseMemory,
                type: 'photo',
                photo_url: memory.content_url,
                caption: memory.description
              } as PhotoMemory;
            } else if (memory.memory_type === 'audio') {
              return {
                ...baseMemory,
                type: 'audio',
                content: memory.description || '',
                duration: memory.metadata?.duration || 0
              } as AudioMemory;
            } else {
              return {
                ...baseMemory,
                type: 'story',
                duration: memory.metadata?.duration || 0
              } as StoryMemory;
            }
          });
          
          setMemories(formattedMemories);
        }
      } catch (error) {
        console.error('Error fetching memories:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load memories. Please try again."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMemories();
  }, [selectedFamily, toast]);

  const handleFamilyChange = (familyId: string) => {
    setSelectedFamily(familyId);
  };

  // Memory card renderer based on type
  const renderMemoryCard = (memory: Memory) => {
    const MemoryIcon = memory.type === 'photo' 
      ? Image 
      : memory.type === 'audio' 
        ? Music 
        : FileText;

    return (
      <motion.div 
        key={memory.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Card className="overflow-hidden h-full">
          <CardContent className="p-0">
            {memory.type === 'photo' && (
              <div className="relative">
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img 
                    src={(memory as PhotoMemory).photo_url || memory.content_url} 
                    alt={memory.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge 
                  className="absolute top-3 left-3 bg-black/60 text-white"
                >
                  {format(new Date(memory.created_at), "MMM d, yyyy")}
                </Badge>
              </div>
            )}
            
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={memory.user?.avatar || ''} />
                  <AvatarFallback>
                    {memory.user?.name?.substring(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{memory.user?.name || 'Anonymous'}</div>
                  {memory.type !== 'photo' && (
                    <div className="text-xs text-gray-500">
                      {format(new Date(memory.created_at), "MMM d, yyyy")}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 mb-2 text-sm text-gray-500">
                <MemoryIcon className="h-4 w-4" />
                <span className="capitalize">{memory.type} Memory</span>
              </div>
              
              <h3 className="text-lg font-medium mb-2">{memory.title}</h3>
              
              {memory.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {memory.description}
                </p>
              )}
              
              <div className="flex justify-between pt-3 border-t">
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Heart className="h-4 w-4 mr-1" />
                  <span className="text-xs">12</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span className="text-xs">4</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className={className}>
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Featured Family Memories</h2>
        
        <Tabs defaultValue="all" value={selectedFamily} onValueChange={handleFamilyChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Families</TabsTrigger>
            {families.map(family => (
              <TabsTrigger key={family.id} value={family.id}>
                {family.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full h-8 w-8 bg-gray-200" />
                    <div className="space-y-1">
                      <div className="h-3 w-24 bg-gray-200 rounded" />
                      <div className="h-2 w-16 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="h-5 w-3/4 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : memories.length === 0 ? (
        <div className="text-center py-12 bg-card dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-2">No memories found</h3>
          <p className="text-muted-foreground mb-6">
            {selectedFamily === "all" 
              ? "Start capturing memories for your family" 
              : "This family doesn't have any memories yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map(memory => renderMemoryCard(memory))}
        </div>
      )}
    </div>
  );
};

export default FamilyMemoryGallery;
