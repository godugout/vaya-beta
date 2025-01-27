import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import VoiceRecorder from "@/components/VoiceRecorder";
import MemoryFeed from "@/components/MemoryFeed";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Mic } from "lucide-react";

const MemoryLane = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setSession(session);
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#222222]">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mic className="h-6 w-6 text-[#8B5CF6]" />
              Share Your Story
            </CardTitle>
            <CardDescription className="text-gray-400">
              Record your memories with the help of Narra, your AI storytelling assistant.
              She'll guide you through prompts and help you capture your stories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VoiceRecorder />
          </CardContent>
        </Card>
        
        <div className="mt-12">
          <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
            <CardHeader>
              <CardTitle className="text-white">Your Stories</CardTitle>
              <CardDescription className="text-gray-400">
                Listen to your recorded memories and stories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemoryFeed />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemoryLane;