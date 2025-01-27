import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import MemoryFeed from "@/components/MemoryFeed";
import NarraChat from "@/components/NarraChat";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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
        <div className="mb-12">
          <NarraChat />
        </div>
        
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