
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MemoryFeedLayout from "@/components/memory/MemoryFeedLayout";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import { useState } from "react";
import { Leaf, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { useMemories } from "@/components/memory/useMemories";

const WildlifeCapsule = () => {
  const navigate = useNavigate();
  const [showRecordingExperience, setShowRecordingExperience] = useState(false);
  
  // Get wildlife memories data
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useMemories();

  // Extract memories from all pages
  const memories = data?.pages.flatMap((page) => page.memories) ?? [];

  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    console.log("Memory saved:", data);
    setShowRecordingExperience(false);
    // Here you would typically refresh the memory feed or add the new memory to the list
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-vaya-accent-green/20 to-white">
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-vaya-accent-green/20 p-2 rounded-lg">
                  <Leaf className="h-5 w-5 text-vaya-accent-green" />
                </div>
                <h1 className="text-3xl font-heading font-semibold text-vaya-text-primary">Wildlife Encounters</h1>
              </div>
              <p className="text-vaya-text-secondary mt-2 font-body pl-12">
                Capture and share your amazing encounters with Costa Rica's diverse wildlife
              </p>
            </div>
            <motion.button 
              onClick={() => setShowRecordingExperience(true)}
              className="px-5 py-3 bg-vaya-accent-green text-white rounded-xl flex items-center gap-2 hover:bg-vaya-accent-green/90 transition-colors shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mic className="h-5 w-5" />
              <span className="font-medium">Add Memory</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showRecordingExperience ? (
          <motion.div 
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-vaya-gray-200 shadow-sm overflow-hidden">
              <CardHeader className="border-b border-vaya-gray-100">
                <CardTitle className="text-xl font-heading text-vaya-text-primary flex items-center gap-2">
                  <Mic className="h-5 w-5 text-vaya-accent-green" />
                  Record Your Wildlife Memory
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="bg-white border-vaya-gray-200 shadow-sm overflow-hidden rounded-xl">
              <CardHeader className="border-b border-vaya-gray-100 bg-vaya-gray-50/50">
                <CardTitle className="text-xl font-heading text-vaya-text-primary">
                  Recent Wildlife Memories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <MemoryFeedLayout 
                  memories={memories}
                  chatMessages={[]}
                  isLoading={isLoading}
                  hasNextPage={hasNextPage || false}
                  fetchNextPage={fetchNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WildlifeCapsule;
