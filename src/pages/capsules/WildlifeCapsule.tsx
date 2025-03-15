
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MemoryFeedLayout from "@/components/memory/MemoryFeedLayout";
import AddMemoryButton from "@/components/memory/AddMemoryButton";
import VoiceRecordingExperience from "@/components/VoiceRecordingExperience";
import { useState } from "react";

const WildlifeCapsule = () => {
  const navigate = useNavigate();
  const [showRecordingExperience, setShowRecordingExperience] = useState(false);

  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    console.log("Memory saved:", data);
    setShowRecordingExperience(false);
    // Here you would typically refresh the memory feed or add the new memory to the list
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-vaya-accent-green/30 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-outfit font-bold text-vaya-gray-900">Wildlife Encounters</h1>
              <p className="text-vaya-gray-600 mt-2">
                Capture and share your amazing encounters with Costa Rica's diverse wildlife
              </p>
            </div>
            <button 
              onClick={() => setShowRecordingExperience(true)}
              className="px-4 py-2 bg-vaya-accent-green text-white rounded-lg flex items-center gap-2 hover:bg-vaya-accent-green/90 transition-colors"
            >
              <span>Add Memory</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showRecordingExperience ? (
          <div className="max-w-md mx-auto mb-8">
            <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
          </div>
        ) : (
          <Card className="bg-white border-vaya-gray-200 shadow-sm">
            <CardHeader className="border-b border-vaya-gray-100">
              <CardTitle className="text-xl font-outfit text-vaya-gray-900">
                Recent Memories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <MemoryFeedLayout />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WildlifeCapsule;
