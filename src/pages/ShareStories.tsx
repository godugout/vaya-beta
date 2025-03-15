
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import { Button } from "@/components/ui/button";
import { Mic, Upload, Hourglass, MessageSquare } from "lucide-react";

const ShareStories = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [demoMode, setDemoMode] = useState(true);
  
  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    console.log("Memory saved:", data);
    // Here you would typically do something with the saved memory
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Share Your Stories
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Preserve your memories with our voice recording experience
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="stories" size="sm" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              <span>Record Memory</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Ask Narra</span>
            </Button>
          </div>
        </div>
        
        <div className="max-w-md mx-auto bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
          <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
        </div>
        
        {/* Other features section (dimmed) */}
        <div className="mt-16 opacity-30 pointer-events-none">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Other Features (Currently Unavailable)
            </h3>
            <p className="text-gray-600">
              These sections are dimmed while we showcase the voice recording experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2 text-gray-800">Future Feature {i}</h4>
                <p className="text-gray-600">
                  This feature is currently under development.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareStories;
