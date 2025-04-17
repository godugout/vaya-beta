
import { useState } from "react";
import { PageTransition } from "@/components/animation/PageTransition";
import { useImmersiveRecording } from "@/hooks/useImmersiveRecording";
import ImmersiveRecordingExperience from "@/components/immersive-recording/ImmersiveRecordingExperience";
import ImmersiveRecordingButton from "@/components/immersive-recording/ImmersiveRecordingButton";
import { Message } from "@/components/chat/types";
import { useToast } from "@/components/ui/use-toast";
import { useMemories } from "@/components/memory/useMemories";
import { MemoryFeedLayout } from "@/components/memory/MemoryFeedLayout";

const MemoryLane = () => {
  const { toast } = useToast();
  const { memories, addMemory } = useMemories();
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to Memory Lane. Share your memories and stories to preserve them for generations to come."
    }
  ]);
  
  const {
    isImmersiveMode,
    startImmersiveRecording,
    stopImmersiveRecording,
    handleRecordingComplete
  } = useImmersiveRecording({
    onSave: (data) => {
      // Add to chat as a message
      const newMessage: Message = {
        role: "user",
        content: data.transcription || "Audio memory",
        attachments: data.audioUrl ? [{ type: "audio", url: data.audioUrl }] : undefined
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      
      // Add to memories collection
      addMemory({
        id: crypto.randomUUID(),
        type: "audio",
        title: data.transcription ? data.transcription.slice(0, 50) + "..." : "Audio Memory",
        content: data.transcription || "",
        date: new Date().toISOString(),
        media: data.audioUrl ? [{ type: "audio", url: data.audioUrl }] : [],
        tags: ["audio", "memory"]
      });
      
      // Show success message
      toast({
        title: "Memory Saved",
        description: "Your memory has been saved and transcribed.",
      });
    }
  });

  return (
    <PageTransition location="memory-lane">
      <div className="min-h-screen bg-background">
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
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Memory Lane</h1>
              <p className="text-muted-foreground">Preserve and explore your family memories</p>
            </div>
            
            <ImmersiveRecordingButton 
              onClick={startImmersiveRecording} 
            />
          </div>
          
          <MemoryFeedLayout 
            memories={memories}
            chatMessages={chatMessages}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default MemoryLane;
