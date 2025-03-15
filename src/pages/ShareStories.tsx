
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import Hero from "@/components/Hero";
import VoiceRecordingExperience from "@/components/VoiceRecordingExperience";

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
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Voice Recording Experience
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Try our new streamlined voice recording interface
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
        </div>
        
        {/* Dimmed content - other UI elements that are not part of the demo */}
        <div className="mt-16 opacity-30 pointer-events-none">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-700">
              Other Features (Currently Unavailable)
            </h3>
            <p className="text-gray-500">
              These sections are dimmed while we showcase the voice recording experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-2">Future Feature {i}</h4>
                <p className="text-gray-500">
                  This feature is currently under development.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareStories;
