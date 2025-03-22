
import { useState } from "react";
import VoiceRecorder from "@/components/VoiceRecorder";
import MemoryUpload from "@/components/MemoryUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActivityTracking } from "@/hooks/useActivityTracking";
import { ActivityTypes } from "@/hooks/useActivityTracking";
import { FadeIn } from '@/components/animation/FadeIn';

const ShareStories = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { trackActivity } = useActivityTracking();

  const handleMessageSent = (message: { content: string; attachments?: { type: "audio" | "image"; url: string }[] }) => {
    // Track this activity
    trackActivity(ActivityTypes.STORY_RECORDED, {
      contentLength: message.content.length,
      hasAudio: message.attachments?.some(a => a.type === "audio") || false,
      hasImage: message.attachments?.some(a => a.type === "image") || false,
      source: "share_stories_page"
    });

    console.log("Message sent:", message);
  };

  return (
    <FadeIn>
      <Card className="border-hanuman-orange/20 shadow-sm">
        <CardHeader>
          <CardTitle className="text-hanuman-orange font-heading">Share Your Story</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="voice" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger 
                value="voice" 
                className="w-full data-[state=active]:bg-hanuman-orange data-[state=active]:text-white"
                onClick={() => trackActivity(ActivityTypes.FEATURE_USED, { feature: "voice_recording", source: "share_stories" })}
              >
                Voice Recording
              </TabsTrigger>
              <TabsTrigger 
                value="upload" 
                className="w-full"
                onClick={() => trackActivity(ActivityTypes.FEATURE_USED, { feature: "memory_upload", source: "share_stories" })}
              >
                Upload Memory
              </TabsTrigger>
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
    </FadeIn>
  );
};

export default ShareStories;
