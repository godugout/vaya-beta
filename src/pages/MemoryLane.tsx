import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import MemoryFeedLayout from "@/components/memory/MemoryFeedLayout";
import AddMemoryButton from "@/components/memory/AddMemoryButton";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1400px] mx-auto">
          {/* Main Feed Column - Takes up 8/12 on large screens */}
          <div className="lg:col-span-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-outfit font-semibold text-gray-900">Family Memories</h1>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="hidden md:flex border-2 border-vaya-memories hover:bg-vaya-memories/10 text-vaya-memories"
                  onClick={() => navigate("/narra")}
                >
                  Ask Family Anything
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Button>
                <AddMemoryButton 
                  className="hidden md:flex"
                  size="default"
                />
              </div>
            </div>
            <MemoryFeedLayout />
          </div>

          {/* Sidebar Column - Takes up 4/12 on large screens */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
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

      {/* Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 border-2 border-vaya-memories hover:bg-vaya-memories/10 text-vaya-memories"
            onClick={() => navigate("/narra")}
          >
            Ask Family
            <MessageCircle className="ml-2 h-5 w-5" />
          </Button>
          <AddMemoryButton 
            className="flex-1"
            size="default"
          />
        </div>
      </div>
    </div>
  );
};

export default MemoryLane;