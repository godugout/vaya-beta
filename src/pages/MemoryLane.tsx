
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
import { Button } from "@/components/ui/button";
import { Mic, Plus, File, Image } from "lucide-react";
import { motion } from "framer-motion";
import AddMemoryButton from "@/components/memory/AddMemoryButton";

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
        
        {/* Regular Memory Lane content */}
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Memory Lane</h1>
              <p className="text-muted-foreground">Preserve and explore your family memories</p>
            </div>
          </div>
          
          {/* New Memory Actions Bar */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 mb-8 border border-white/10 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Create New Memory</h3>
                <p className="text-sm text-muted-foreground mb-4">Choose how you want to preserve your memories</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button 
                    onClick={() => startImmersiveRecording()}
                    variant="default" 
                    size="lg"
                    className="flex items-center justify-center gap-2 h-auto py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    <Mic className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Voice Recording</div>
                      <div className="text-xs opacity-90">Tell your story</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      /* Text memory handler */
                    }}
                    variant="secondary" 
                    size="lg"
                    className="flex items-center justify-center gap-2 h-auto py-6"
                  >
                    <File className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Text Memory</div>
                      <div className="text-xs opacity-90">Write your memory</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      /* Photo memory handler */
                    }}
                    variant="outline" 
                    size="lg"
                    className="flex items-center justify-center gap-2 h-auto py-6"
                  >
                    <Image className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Photo Memory</div>
                      <div className="text-xs opacity-90">Upload images</div>
                    </div>
                  </Button>
                </div>
              </div>
              
              {/* Quick Actions Column */}
              <div className="md:w-64 flex flex-col justify-center items-center bg-gradient-to-b from-autumn/10 to-autumn/5 rounded-lg p-4">
                <AddMemoryButton 
                  size="lg"
                  className="w-full mb-3"
                />
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startImmersiveRecording}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Mic className="h-5 w-5" />
                  <span>Immersive Recording</span>
                </motion.button>
              </div>
            </div>
          </div>
          
          <MemoryFeedLayout 
            memories={memories}
            chatMessages={chatMessages}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default MemoryLane;
