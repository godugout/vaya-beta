import { useState, useEffect } from "react";
import { PageTransition } from "@/components/animation/PageTransition";
import { useImmersiveRecording } from "@/hooks/useImmersiveRecording";
import { Message } from "@/components/chat/types";
import { useToast } from "@/components/ui/use-toast";
import { useMemories } from "@/components/memory/useMemories";
import { Memory } from "@/components/memory/types";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import AddMemoryModal from "@/components/memory/AddMemoryModal";
import MemoryCreationHub from "@/components/memory/MemoryCreationHub";
import MemoryLaneHeader from "@/components/memory/MemoryLaneHeader";
import MemoryTabs from "@/components/memory/MemoryTabs";
import ImmersiveRecordingWrapper from "@/components/memory/ImmersiveRecordingWrapper";

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
      
      const { data, error } = await supabase
        .from('memories')
        .insert(dbMemory)
        .select()
        .single();
        
      if (error) throw error;
      
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
      const newMessage: Message = {
        role: "user",
        content: data.transcription || "Audio memory",
        attachments: data.audioUrl ? [{ type: "audio", url: data.audioUrl }] : undefined
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      
      await addMemory({
        type: "audio",
        content_url: data.audioUrl || "",
        title: data.transcription ? data.transcription.slice(0, 50) + "..." : "Audio Memory",
        description: data.transcription || "",
        created_at: new Date().toISOString(),
        metadata: { duration: 60 },
      });
    }
  });

  const memories = data?.pages.flatMap((page) => page.memories) ?? [];

  return (
    <PageTransition location="memory-lane">
      <div className="min-h-screen bg-background text-foreground">
        <ImmersiveRecordingWrapper 
          isActive={isImmersiveMode}
          onComplete={handleRecordingComplete}
          onCancel={stopImmersiveRecording}
        />
        
        <MemoryLaneHeader onNewMemory={() => setShowMemoryModal(true)} />
        
        <div className="container mx-auto py-8 px-4">
          <div className="mb-8">
            <MemoryCreationHub 
              onStartImmersiveRecording={startImmersiveRecording}
              onOpenMemoryModal={() => setShowMemoryModal(true)}
            />
          </div>
          
          <MemoryTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            memories={memories}
            chatMessages={chatMessages}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      </div>
      
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
