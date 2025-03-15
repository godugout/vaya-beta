
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import Hero from "@/components/Hero";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
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
    <div className="min-h-screen bg-gradient-to-b from-dark-background-orange/80 to-dark-background-red/70 dark:from-dark-background-orange dark:to-dark-background-red/90 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-lines opacity-20 z-0"></div>
      
      {/* Cosmic background effect */}
      <div className="absolute inset-0 z-patterns">
        <CanvasRevealEffect 
          colors={[[255, 118, 117], [108, 92, 231], [255, 160, 90]]} 
          dotSize={1.5}
          animationSpeed={2}
          opacities={[0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.4, 0.4]}
        />
      </div>
      
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-content">
        <div className="text-center mb-8 backdrop-blur-md bg-dark-background-surface/10 p-6 rounded-xl border border-[#FF7675]/20">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg z-text">
            Anjaneya Vault - Voice Recording
          </h2>
          <p className="mt-4 text-xl text-white/90 z-text">
            Preserve your memories with our cosmic voice recording experience
          </p>
        </div>
        
        <div className="max-w-md mx-auto bg-dark-background-surface/30 backdrop-blur-xl p-6 border border-[#FF7675]/30 rounded-xl shadow-2xl z-cards">
          <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
        </div>
        
        {/* Dimmed content - other UI elements that are not part of the demo */}
        <div className="mt-16 opacity-30 pointer-events-none">
          <div className="text-center mb-8 z-text">
            <h3 className="text-2xl font-semibold text-white">
              Other Features (Currently Unavailable)
            </h3>
            <p className="text-white/80">
              These sections are dimmed while we showcase the voice recording experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-cards">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-dark-background-surface/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                <h4 className="font-semibold text-lg mb-2 text-white z-text">Future Feature {i}</h4>
                <p className="text-white/70 z-text">
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
