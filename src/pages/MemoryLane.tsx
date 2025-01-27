import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import MemoryFeed from "@/components/MemoryFeed";
import NarraChat from "@/components/NarraChat";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const MemoryLane = () => {
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
        <div className="mb-12">
          <NarraChat />
        </div>
        
        <div className="mt-12">
          <Card className="bg-white border-vaya-purple/10">
            <CardHeader>
              <CardTitle className="text-gray-900 font-outfit">Your Stories</CardTitle>
              <CardDescription className="text-gray-500">
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