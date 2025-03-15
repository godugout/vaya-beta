
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
    <div className="min-h-screen bg-gradient-to-b from-dark-background-orange/90 to-dark-background-red/80 dark:from-dark-background-orange dark:to-dark-background-red relative">
      {/* Background pattern with fixed position and lower z-index */}
      <div 
        className="fixed inset-0 bg-pattern-lines opacity-10 z-0" 
        style={{ pointerEvents: 'none' }}
      ></div>
      
      {/* Cosmic background effect with fixed position */}
      <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
        <CanvasRevealEffect 
          colors={[[255, 118, 117], [108, 92, 231], [255, 160, 90]]} 
          dotSize={1.5}
          animationSpeed={1.2}
          opacities={[0.05, 0.08, 0.1, 0.12, 0.15, 0.15]}
        />
      </div>
      
      {/* Main content with higher z-index */}
      <div className="relative z-10">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8 backdrop-blur-sm bg-dark-background-surface/20 p-6 rounded-xl border border-[#FF7675]/20 shadow-lg">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              Anjaneya Vault - Voice Recording
            </h2>
            <p className="mt-4 text-xl text-white/90">
              Preserve your memories with our cosmic voice recording experience
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-dark-background-surface/30 backdrop-blur-xl p-6 border border-[#FF7675]/30 rounded-xl shadow-2xl">
            <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
          </div>
          
          {/* Dimmed content - other UI elements that are not part of the demo */}
          <div className="mt-16 opacity-30 pointer-events-none">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white">
                Other Features (Currently Unavailable)
              </h3>
              <p className="text-white/80">
                These sections are dimmed while we showcase the voice recording experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-dark-background-surface/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <h4 className="font-semibold text-lg mb-2 text-white">Future Feature {i}</h4>
                  <p className="text-white/70">
                    This feature is currently under development.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareStories;
