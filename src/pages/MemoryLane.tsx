import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import VoiceRecorder from "@/components/VoiceRecorder";
import MemoryUpload from "@/components/MemoryUpload";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MemoryLane = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const handleCreateFamily = async () => {
    try {
      const { data: family, error: familyError } = await supabase
        .from('families')
        .insert([
          { name: 'My Family', description: 'Our shared memories' }
        ])
        .select()
        .single();

      if (familyError) throw familyError;

      if (family) {
        const { error: memberError } = await supabase
          .from('family_members')
          .insert([
            { 
              family_id: family.id, 
              user_id: session.user.id,
              role: 'admin'
            }
          ]);

        if (memberError) throw memberError;

        toast({
          title: "Family group created!",
          description: "You can now start inviting family members.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create family group. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#222222]">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Record Your Story</h2>
            <VoiceRecorder />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Share Memories</h2>
            <MemoryUpload />
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            onClick={handleCreateFamily}
            size="lg" 
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all duration-300"
          >
            <Users className="mr-2 h-5 w-5" />
            Create Family Group
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemoryLane;