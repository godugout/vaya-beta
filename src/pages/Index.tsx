import Hero from "@/components/Hero";
import VoiceRecorder from "@/components/VoiceRecorder";
import MemoryUpload from "@/components/MemoryUpload";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-vaya-green">
      <Hero />
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <VoiceRecorder />
        <MemoryUpload />
      </div>
    </div>
  );
}

export default Index;