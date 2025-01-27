import VoiceRecorder from "@/components/VoiceRecorder";
import MemoryUpload from "@/components/MemoryUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ShareStories = () => {
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
            <VoiceRecorder />
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