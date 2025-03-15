
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-950/20 to-purple-950/10 dark:from-indigo-950/40 dark:to-purple-950/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="page-bg-pattern"></div>
      
      {/* Cosmic background effect */}
      <div className="absolute inset-0 z-patterns">
        <CanvasRevealEffect 
          colors={[[155, 135, 245], [14, 165, 233], [214, 188, 250]]} 
          dotSize={1.5}
          animationSpeed={2}
          opacities={[0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.4]}
        />
      </div>
      
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-content">
        <div className="text-center mb-8 backdrop-card p-6 dark:bg-dark-background/30">
          <h2 className="text-3xl font-bold text-indigo-950 dark:text-indigo-50 drop-shadow-md z-text">
            Anjaneya Vault - Voice Recording
          </h2>
          <p className="mt-4 text-xl text-indigo-800 dark:text-indigo-200 z-text">
            Preserve your memories with our cosmic voice recording experience
          </p>
        </div>
        
        <div className="max-w-md mx-auto elevated-card bg-white/90 dark:bg-dark-background/80 backdrop-blur-lg p-6 border border-indigo-200/20 dark:border-indigo-200/10 shadow-xl z-cards">
          <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
        </div>
        
        {/* Dimmed content - other UI elements that are not part of the demo */}
        <div className="mt-16 opacity-30 pointer-events-none">
          <div className="text-center mb-8 z-text">
            <h3 className="text-2xl font-semibold text-indigo-900 dark:text-indigo-100">
              Other Features (Currently Unavailable)
            </h3>
            <p className="text-indigo-700 dark:text-indigo-200">
              These sections are dimmed while we showcase the voice recording experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-cards">
            {[1, 2, 3].map((i) => (
              <div key={i} className="elevated-card p-6">
                <h4 className="font-semibold text-lg mb-2 text-indigo-900 dark:text-indigo-100 z-text">Future Feature {i}</h4>
                <p className="text-indigo-700 dark:text-indigo-200 z-text">
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
