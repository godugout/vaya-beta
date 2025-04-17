
import { useState } from "react";
import VoiceRecorder from "@/components/VoiceRecorder";
import MemoryUpload from "@/components/MemoryUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateStory } from "./useStories";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ShareStories = () => {
  const [isRecording, setIsRecording] = useState(false);
  const createStory = useCreateStory();
  const { toast } = useToast();

  const handleMessageSent = async (message: { content: string; attachments?: { type: "audio" | "image"; url: string }[] }) => {
    try {
      // Check if user is authenticated
      const { data: user } = await supabase.auth.getUser();
      
      if (!user || !user.user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please log in to save your story.",
        });
        return;
      }

      if (message.attachments && message.attachments.length > 0) {
        const audioAttachment = message.attachments.find(a => a.type === "audio");
        
        if (audioAttachment) {
          // Create a new story in the database
          await createStory.mutateAsync({
            title: message.content.substring(0, 100) || "New Story",
            description: message.content,
            audio_url: audioAttachment.url,
            story_type: "audio",
            author_id: user.user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error saving story",
            description: "No audio attachment found.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error saving story",
          description: "No attachments found.",
        });
      }
    } catch (error) {
      console.error("Error saving story:", error);
      toast({
        variant: "destructive",
        title: "Error saving story",
        description: "There was a problem saving your story. Please try again.",
      });
    }
  };

  return (
    <Card className="bg-white border-vaya-purple/10">
      <CardHeader>
        <CardTitle className="text-gray-900 font-outfit">Share Your Story</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="voice" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="voice" className="w-full bg-vaya-secondary/10 data-[state=active]:bg-vaya-secondary data-[state=active]:text-white">
              Voice Recording
            </TabsTrigger>
            <TabsTrigger value="upload" className="w-full">Upload Memory</TabsTrigger>
          </TabsList>
          <TabsContent value="voice">
            <VoiceRecorder 
              onMessageSent={handleMessageSent}
              setIsRecording={setIsRecording}
            />
          </TabsContent>
          <TabsContent value="upload">
            <MemoryUpload />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ShareStories;
