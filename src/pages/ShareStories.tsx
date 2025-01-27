import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import NarraChat from "@/components/NarraChat";
import Hero from "@/components/Hero";
import { PromptIdeas } from "@/components/stories/PromptIdeas";

const ShareStories = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <NarraChat />
        </div>
      </div>
      <PromptIdeas />
    </div>
  );
};

export default ShareStories;