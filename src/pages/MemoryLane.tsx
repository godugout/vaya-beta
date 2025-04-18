
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/animation/PageTransition";
import { useImmersiveRecording } from "@/hooks/useImmersiveRecording";
import ImmersiveRecordingExperience from "@/components/immersive-recording/ImmersiveRecordingExperience";
import { Message } from "@/components/chat/types";
import { useToast } from "@/components/ui/use-toast";
import { useMemories } from "@/components/memory/useMemories";
import MemoryFeedLayout from "@/components/memory/MemoryFeedLayout";
import { Memory } from "@/components/memory/types";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FamilyMemoryGallery from "@/components/memory/FamilyMemoryGallery";
import FamilyStoriesSection from "@/components/stories/FamilyStoriesSection";
import AddMemoryModal from "@/components/memory/AddMemoryModal";
import MemoryCreationHub from "@/components/memory/MemoryCreationHub";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const MemoryLane = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useMemories();
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to Memory Lane. Share your memories and stories to preserve them for generations to come."
    }
  ]);
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'feed' | 'gallery' | 'stories'>('feed');
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  
  // Check for auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  // Function to add a new memory to the database
  const addMemory = async (memory: Partial<Memory>) => {
    if (!session?.user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save memories.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Convert Memory to database format
      const dbMemory = {
        user_id: session.user.id,
        memory_type: memory.type,
        title: memory.title || "New Memory",
        description: memory.description || "",
        content_url: memory.content_url,
        metadata: {
          ...(memory.type === 'audio' || memory.type === 'story' 
            ? { duration: (memory as any).duration || 0 } 
            : {})
        }
      };
      
      // Insert into database
      const { data, error } = await supabase
        .from('memories')
        .insert(dbMemory)
        .select()
        .single();
        
      if (error) throw error;
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["memories"] });
      
      toast({
        title: "Memory Saved",
        description: "Your memory has been successfully saved.",
      });
      
      return data;
    } catch (error) {
      console.error("Error saving memory:", error);
      toast({
        title: "Error Saving Memory",
        description: "There was a problem saving your memory. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };
  
  const {
    isImmersiveMode,
    startImmersiveRecording,
    stopImmersiveRecording,
    handleRecordingComplete
  } = useImmersiveRecording({
    onSave: async (data) => {
      // Add to chat as a message
      const newMessage: Message = {
        role: "user",
        content: data.transcription || "Audio memory",
        attachments: data.audioUrl ? [{ type: "audio", url: data.audioUrl }] : undefined
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      
      // Add to memories collection
      await addMemory({
        type: "audio",
        content_url: data.audioUrl || "",
        title: data.transcription ? data.transcription.slice(0, 50) + "..." : "Audio Memory",
        description: data.transcription || "",
        created_at: new Date().toISOString(),
        metadata: { duration: 60 }, // Placeholder duration
      });
    }
  });

  // Extract memories from all pages
  const memories = data?.pages.flatMap((page) => page.memories) ?? [];

  return (
    <PageTransition location="memory-lane">
      <div className="min-h-screen bg-background text-foreground">
        {/* Display immersive recording experience when active */}
        {isImmersiveMode && (
          <ImmersiveRecordingExperience
            onComplete={handleRecordingComplete}
            onCancel={stopImmersiveRecording}
            guidanceText={[
              "Share your memory or story...",
              "Take your time to reflect...",
              "Your voice creates your legacy...",
              "Future generations will hear your story..."
            ]}
          />
        )}
        
        {/* Memory Lane Header */}
        <div className="w-full pt-16 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Memory Lane</h1>
                <p className="text-muted-foreground">Preserve and explore your family memories</p>
              </div>
              <Button 
                onClick={() => setShowMemoryModal(true)}
                className="bg-water hover:bg-water/90 shadow-md"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Memory
              </Button>
            </div>
          </div>
        </div>
        
        {/* Regular Memory Lane content */}
        <div className="container mx-auto py-8 px-4">
          {/* Memory Creation Hub */}
          <div className="mb-8">
            <MemoryCreationHub 
              onStartImmersiveRecording={startImmersiveRecording}
              onOpenMemoryModal={() => setShowMemoryModal(true)}
            />
          </div>
          
          {/* View Type Tabs */}
          <Tabs 
            defaultValue="feed" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as 'feed' | 'gallery' | 'stories')}
            className="mb-6"
          >
            <TabsList>
              <TabsTrigger value="feed">Timeline Feed</TabsTrigger>
              <TabsTrigger value="gallery">Memory Gallery</TabsTrigger>
              <TabsTrigger value="stories">Family Stories</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {activeTab === 'feed' && (
            <MemoryFeedLayout 
              memories={memories}
              chatMessages={chatMessages}
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
          
          {activeTab === 'gallery' && (
            <FamilyMemoryGallery />
          )}
          
          {activeTab === 'stories' && (
            <FamilyStoriesSection limit={9} />
          )}
        </div>
      </div>
      
      {/* Memory Modal */}
      {showMemoryModal && (
        <AddMemoryModal
          open={showMemoryModal}
          onOpenChange={setShowMemoryModal}
        />
      )}
    </PageTransition>
  );
};

export default MemoryLane;
