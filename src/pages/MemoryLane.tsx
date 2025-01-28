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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Feed Column - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-2xl font-outfit font-semibold text-gray-900">Family Memories</h1>
            </div>
            <MemoryFeedLayout />
          </div>

          {/* Right Sidebar - 1/3 width */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-outfit font-semibold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600">
                Family highlights and upcoming events will appear here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Add Memory Button (Desktop) */}
      <div className="hidden md:block fixed bottom-8 right-8">
        <Button
          size="lg"
          className="rounded-full bg-vaya-primary hover:bg-vaya-primary/90 text-white shadow-lg"
          onClick={() => document.getElementById('add-memory-modal-trigger')?.click()}
        >
          <span>Add Memory</span>
          <Camera className="ml-2 h-6 w-6" />
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
  );
};

export default MemoryLane;