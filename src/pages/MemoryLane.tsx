import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import MemoryFeedLayout from "@/components/memory/MemoryFeedLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-outfit font-semibold text-gray-900">Family Memories</h1>
            <Button className="bg-vaya-primary hover:bg-vaya-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Memory
            </Button>
          </div>
          <MemoryFeedLayout />
        </div>
      </div>
    </div>
  );
};

export default MemoryLane;