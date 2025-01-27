import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import VoiceRecorder from "@/components/VoiceRecorder";
import MemoryUpload from "@/components/MemoryUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto bg-white border-vaya-purple/10">
          <CardHeader>
            <CardTitle className="text-2xl font-outfit">Share Your Story</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="voice" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="voice" className="w-full">Voice Recording</TabsTrigger>
                <TabsTrigger value="upload" className="w-full">Upload Memory</TabsTrigger>
              </TabsList>
              <TabsContent value="voice">
                <VoiceRecorder />
              </TabsContent>
              <TabsContent value="upload">
                <MemoryUpload />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareStories;