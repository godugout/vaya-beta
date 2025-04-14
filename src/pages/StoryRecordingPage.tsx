
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, MessageSquare, Share2 } from 'lucide-react';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import VoiceRecordingExperience from '@/components/voice-recording/VoiceRecordingExperience';
import { NarraConversation } from '@/components/narra/NarraConversation';
import { useToast } from '@/components/ui/use-toast';

const StoryRecordingPage = () => {
  const [activeTab, setActiveTab] = useState("voice");
  const { toast } = useToast();
  
  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    console.log("Memory saved:", data);
    toast({
      title: "Story saved!",
      description: "Your story has been saved successfully.",
      duration: 3000,
    });
  };

  const handleShare = () => {
    // Implement sharing functionality
    toast({
      title: "Share your stories",
      description: "Sharing functionality will be implemented soon!",
      duration: 3000,
    });
  };
  
  return (
    <MobileAppLayout className="space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold text-hanuman-text-primary mb-2">
          Your Sacred Stories
        </h1>
        <p className="text-hanuman-text-secondary text-sm max-w-sm mx-auto">
          Preserve your family's heritage through voice or conversation
        </p>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
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
                Story Chat
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="voice" className="p-4">
              <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
            </TabsContent>
            
            <TabsContent value="narra" className="p-0 h-[500px]">
              <NarraConversation />
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex justify-center"
      >
        <Button 
          onClick={handleShare}
          className="bg-gradient-to-r from-hanuman-orange to-hanuman-saffron text-white px-6 py-2 rounded-full"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Your Stories
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center text-xs text-hanuman-text-secondary mt-8 pb-8"
      >
        <p>
          All stories are securely stored and treated with the highest respect,
          honoring your family's sacred heritage.
        </p>
      </motion.div>
    </MobileAppLayout>
  );
};

export default StoryRecordingPage;
