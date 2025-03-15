
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import Hero from "@/components/Hero";
import VoiceRecordingExperience from "@/components/VoiceRecordingExperience";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

const ShareStories = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [demoMode, setDemoMode] = useState(true);
  
  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    console.log("Memory saved:", data);
    // Here you would typically do something with the saved memory
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950/20 to-purple-950/10 relative overflow-hidden">
      {/* Cosmic background effect */}
      <div className="absolute inset-0 z-0">
        <CanvasRevealEffect 
          colors={[[155, 135, 245], [14, 165, 233], [214, 188, 250]]} 
          dotSize={1.5}
          animationSpeed={2}
          opacities={[0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.4]}
        />
      </div>
      
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-50 drop-shadow-md">
            Anjaneya Vault - Voice Recording
          </h2>
          <p className="mt-4 text-xl text-indigo-200">
            Preserve your memories with our cosmic voice recording experience
          </p>
        </div>
        
        <div className="max-w-md mx-auto backdrop-blur-sm bg-white/10 p-6 rounded-xl border border-indigo-200/20 shadow-xl">
          <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
        </div>
        
        {/* Dimmed content - other UI elements that are not part of the demo */}
        <div className="mt-16 opacity-30 pointer-events-none">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-indigo-100">
              Other Features (Currently Unavailable)
            </h3>
            <p className="text-indigo-200">
              These sections are dimmed while we showcase the voice recording experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-indigo-200/10 shadow-md">
                <h4 className="font-semibold text-lg mb-2 text-indigo-100">Future Feature {i}</h4>
                <p className="text-indigo-200">
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
