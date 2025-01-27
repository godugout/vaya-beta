import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import NarraChat from "@/components/NarraChat";
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
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-vaya-chat-border">
            <CardHeader>
              <CardTitle className="text-2xl font-outfit">Chat with Narra</CardTitle>
            </CardHeader>
            <CardContent>
              <NarraChat />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShareStories;