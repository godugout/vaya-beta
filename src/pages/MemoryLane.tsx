import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import MemoryFeedLayout from "@/components/memory/MemoryFeedLayout";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import AddMemoryButton from "@/components/memory/AddMemoryButton";

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
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-outfit font-semibold text-gray-900">Family Memories</h1>
          </div>
          <MemoryFeedLayout />

          {/* Floating Add Memory Button (Desktop) */}
          <div className="hidden md:block fixed bottom-8 right-8">
            <Button
              size="lg"
              className="rounded-full bg-vaya-primary hover:bg-vaya-primary/90 text-white shadow-lg"
              onClick={() => document.getElementById('add-memory-modal-trigger')?.click()}
            >
              <Camera className="h-6 w-6" />
              <span>Add Memory</span>
            </Button>
          </div>

          {/* Mobile CTA Bar */}
          <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40">
            <AddMemoryButton 
              className="w-full justify-center"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryLane;