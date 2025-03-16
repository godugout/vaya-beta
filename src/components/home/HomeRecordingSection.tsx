
import { useState } from "react";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { NarraStoryPrompt } from "@/components/narra/NarraStoryPrompt";

// Story prompts to choose from
const STORY_PROMPTS = [
  "Tell us about a cherished family tradition",
  "Share a story about a family member who inspired you",
  "Describe a memorable family gathering or celebration",
  "Tell us about a family recipe and the story behind it",
  "Share a challenge your family overcame together",
  "Describe a family heirloom and its significance"
];

// Get random prompts from the list
const getRandomPrompts = (count = 3) => {
  const shuffled = [...STORY_PROMPTS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const HomeRecordingSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [randomPrompts] = useState(() => getRandomPrompts());
  const [hasRecorded, setHasRecorded] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  
  // Track a user activity
  const trackActivity = async (activityType: string, metadata?: any) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;
      
      // Record the activity
      await supabase.from('user_activities').insert({
        user_id: userId || null, // Will be null for anonymous users
        activity_type: activityType,
        metadata,
        anonymous_id: localStorage.getItem('anonymous_id') || crypto.randomUUID()
      });
      
      // Set anonymous ID if not already set
      if (!localStorage.getItem('anonymous_id')) {
        const anonymousId = crypto.randomUUID();
        localStorage.setItem('anonymous_id', anonymousId);
      }
    } catch (error) {
      console.error("Failed to track activity:", error);
    }
  };

  // Handle prompt selection
  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    trackActivity("prompt_selected", { prompt });
  };

  // Handle when memory is saved
  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    setHasRecorded(true);
    setShowSignupPrompt(true);
    
    // Store recording details in local storage to retrieve after signup
    localStorage.setItem('pending_recording', JSON.stringify({
      audioUrl: data.audioUrl,
      transcription: data.transcription,
      createdAt: new Date().toISOString(),
      prompt: selectedPrompt
    }));
    
    trackActivity("story_recorded", { 
      hasTranscription: !!data.transcription,
      prompt: selectedPrompt
    });
  };

  // Handle signup navigation
  const handleSignupNavigation = () => {
    trackActivity("signup_prompted_from_recording");
    navigate('/auth');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6">
      {!hasRecorded ? (
        <>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold mb-3 text-white">
              Share Your Story
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Record a memory to preserve your family's legacy. Choose a prompt to get started or record your own story.
            </p>
          </div>
          
          {!selectedPrompt ? (
            <div className="space-y-3 mb-8">
              <p className="text-gray-400 text-sm font-medium">
                Select a prompt to get inspired:
              </p>
              {randomPrompts.map((prompt, index) => (
                <NarraStoryPrompt 
                  key={index}
                  prompt={prompt}
                  onClick={handlePromptSelect}
                />
              ))}
              
              <Button 
                variant="link" 
                className="text-gray-400 hover:text-white"
                onClick={() => handlePromptSelect("I'll share my own story")}
              >
                I'll share my own story
              </Button>
            </div>
          ) : (
            <Card className="bg-gray-900 border-gray-800 mb-6">
              <CardContent className="p-4">
                <p className="text-white italic">"{selectedPrompt}"</p>
                <Button 
                  variant="link" 
                  className="text-sm text-gray-400 p-0 h-auto mt-2"
                  onClick={() => setSelectedPrompt(null)}
                >
                  Choose a different prompt
                </Button>
              </CardContent>
            </Card>
          )}
          
          <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
        </>
      ) : (
        <motion.div 
          className="text-center py-12 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-white">
            Your Story Has Been Recorded!
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Sign up or login to access your recording, save it to your collection, 
            and start building your family's legacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button 
              size="lg" 
              className="bg-autumn hover:bg-autumn/90"
              onClick={handleSignupNavigation}
            >
              Sign Up to Access Your Story
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => {
                setHasRecorded(false);
                setSelectedPrompt(null);
                setShowSignupPrompt(false);
                trackActivity("started_new_recording");
              }}
            >
              Record Another Story
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
