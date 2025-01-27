import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MemoryFeedLayout from "@/components/memory/MemoryFeedLayout";
import { Button } from "@/components/ui/button";
import { Camera, Plus } from "lucide-react";
import AddMemoryButton from "@/components/memory/AddMemoryButton";

const WildlifeCapsule = () => {
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
      <div className="bg-gradient-to-b from-vaya-accent-green/30 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-outfit font-bold text-vaya-gray-900">Wildlife Encounters</h1>
              <p className="text-vaya-gray-600 mt-2">
                Capture and share your amazing encounters with Costa Rica's diverse wildlife
              </p>
            </div>
            <AddMemoryButton />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white border-vaya-gray-200 shadow-sm">
          <CardHeader className="border-b border-vaya-gray-100">
            <CardTitle className="text-xl font-outfit text-vaya-gray-900">
              Recent Memories
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <MemoryFeedLayout />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WildlifeCapsule;