
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MessageSquare } from "lucide-react";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import { NarraConversation } from "@/components/narra/NarraConversation";

const SacredVoiceExperience = () => {
  const [activeTab, setActiveTab] = useState("voice");
  
  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    console.log("Memory saved:", data);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-pattern-lotus">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">
            Sacred Voice Experience
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Capture and preserve your family's stories with the sacred voice recording
            experience or converse with Narra, your storytelling companion.
          </p>
        </div>
        
        <Card className="overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="voice" className="py-3">
                <Mic className="h-4 w-4 mr-2" />
                Voice Recording
              </TabsTrigger>
              <TabsTrigger value="narra" className="py-3">
                <MessageSquare className="h-4 w-4 mr-2" />
                Narra Conversation
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="voice" className="p-6">
              <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
            </TabsContent>
            
            <TabsContent value="narra" className="p-0 h-[600px]">
              <NarraConversation />
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            All stories are securely stored and treated with the highest respect,
            honoring your family's sacred heritage.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SacredVoiceExperience;
