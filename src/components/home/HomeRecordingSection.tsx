
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import { useActivityTracking } from "@/hooks/useActivityTracking";
import { ActivityTypes } from "@/hooks/useActivityTracking";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mic, Star, Heart, Lightbulb } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample story prompts
const STORY_PROMPTS = [
  { id: 1, prompt: "Share a memorable childhood experience that shaped who you are today." },
  { id: 2, prompt: "Describe a family tradition that holds special meaning to you." },
  { id: 3, prompt: "Tell us about a person who changed your life and why." },
  { id: 4, prompt: "Share a story about a challenge you overcame and what you learned." },
  { id: 5, prompt: "Describe a place that feels like home to you and why it matters." },
];

export const HomeRecordingSection = () => {
  const { trackActivity } = useActivityTracking();
  const [showAuth, setShowAuth] = useState(false);
  const [savedMemory, setSavedMemory] = useState<{ audioUrl?: string; transcription?: string } | null>(null);
  const [randomPrompt, setRandomPrompt] = useState(STORY_PROMPTS[0]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Select a random prompt on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * STORY_PROMPTS.length);
    setRandomPrompt(STORY_PROMPTS[randomIndex]);
    
    // Track page view
    trackActivity(ActivityTypes.PAGE_VIEW, { 
      page: "home",
      section: "recording"
    });
  }, []);

  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    setSavedMemory(data);
    setShowAuth(true);
    
    // Track successful recording
    trackActivity(ActivityTypes.STORY_RECORDED, {
      hasTranscription: !!data.transcription,
      source: "home_page"
    });
    
    toast({
      title: "Your story has been recorded!",
      description: "Sign up or log in to save it permanently and access it later.",
    });
  };

  const handleSignup = () => {
    trackActivity(ActivityTypes.SIGNUP_STARTED, { source: "post_recording" });
    navigate("/auth?source=recording");
  };

  const handleNewPrompt = () => {
    const currentIndex = STORY_PROMPTS.findIndex(p => p.id === randomPrompt.id);
    const nextIndex = (currentIndex + 1) % STORY_PROMPTS.length;
    setRandomPrompt(STORY_PROMPTS[nextIndex]);
    
    trackActivity(ActivityTypes.FEATURE_USED, { 
      feature: "prompt_refresh",
      source: "home_recording"
    });
  };

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Card className="border border-gray-800/20 bg-gray-900/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          {!savedMemory ? (
            <>
              <div className="mb-6 text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 mb-4">
                  <Lightbulb size={16} className="mr-2" />
                  <span>Prompt Inspiration</span>
                </div>
                <h3 className="text-xl text-gray-100 mb-2">{randomPrompt.prompt}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleNewPrompt}
                  className="text-gray-400 hover:text-white"
                >
                  Try another prompt
                </Button>
              </div>
              
              <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
              
              <div className="mt-4 text-center text-gray-400 text-sm">
                Your recording will be temporarily saved. Create an account to keep it forever.
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">Your Story Has Been Recorded!</h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  Sign up or log in to save your recording permanently and access it anytime.
                </p>
              </motion.div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleSignup}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign Up Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/auth?action=login&source=recording")}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Log In
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
