
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MessageSquare } from "lucide-react";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import { NarraConversation } from "@/components/narra/NarraConversation";
import { MobileAppLayout } from "@/components/layout/MobileAppLayout";

const SacredVoiceExperience = () => {
  const [activeTab, setActiveTab] = useState("voice");
  
  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    console.log("Memory saved:", data);
  };
  
  return (
    <MobileAppLayout className="bg-pattern-lotus">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-heading font-bold tracking-tight mb-2 text-hanuman-text-primary">
            Sacred Voice Experience
          </h1>
          <p className="text-hanuman-text-secondary max-w-xl mx-auto text-sm">
            Capture and preserve your family's stories with the sacred voice recording
            experience or converse with Narra, your storytelling companion.
          </p>
        </div>
        
        <Card className="overflow-hidden border-hanuman-gold/20 bg-card-bg backdrop-blur-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 p-1 bg-hanuman-cosmic-blue/30">
              <TabsTrigger 
                value="voice" 
                className={`py-3 ${activeTab === 'voice' ? 'text-hanuman-gold' : 'text-hanuman-text-secondary'}`}
              >
                <Mic className="h-4 w-4 mr-2" />
                Voice Recording
              </TabsTrigger>
              <TabsTrigger 
                value="narra" 
                className={`py-3 ${activeTab === 'narra' ? 'text-hanuman-gold' : 'text-hanuman-text-secondary'}`}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Narra Conversation
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="voice" className="p-6">
              <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
            </TabsContent>
            
            <TabsContent value="narra" className="p-0 h-[500px]">
              <NarraConversation />
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="mt-6 text-center text-xs text-hanuman-text-secondary">
          <p>
            All stories are securely stored and treated with the highest respect,
            honoring your family's sacred heritage.
          </p>
        </div>
      </motion.div>
    </MobileAppLayout>
  );
};

export default SacredVoiceExperience;
