import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import MemoryFeedLayout from "@/components/memory/MemoryFeedLayout";
import ShareStories from "@/components/stories/ShareStories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="min-h-screen bg-white">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="memories" className="w-full">
          <TabsList className="w-full mb-8">
            <TabsTrigger value="memories" className="w-full">Memory Feed</TabsTrigger>
            <TabsTrigger value="share" className="w-full">Share Stories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="memories">
            <Card className="bg-white border-vaya-purple/10">
              <CardContent className="p-6">
                <MemoryFeedLayout />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="share">
            <ShareStories />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MemoryLane;