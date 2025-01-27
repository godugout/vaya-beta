import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import VoiceRecorder from "@/components/VoiceRecorder";
import MemoryUpload from "@/components/MemoryUpload";
import MemoryFeed from "@/components/MemoryFeed";
import { Button } from "@/components/ui/button";
import { Users, Mic, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mic className="h-6 w-6 text-[#8B5CF6]" />
                Record Your Story
              </CardTitle>
              <CardDescription className="text-gray-400">
                Share your memories through voice recordings. Perfect for preserving stories, 
                experiences, and family history.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VoiceRecorder />
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="h-6 w-6 text-[#8B5CF6]" />
                Share Memories
              </CardTitle>
              <CardDescription className="text-gray-400">
                Upload photos, videos, or audio files to preserve and share with your family.
                Add tags to make memories easily searchable.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemoryUpload />
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12">
          <Card className="bg-[#2A2A2A] border-[#3A3A3A] mb-8">
            <CardHeader>
              <CardTitle className="text-white">Recent Memories</CardTitle>
              <CardDescription className="text-gray-400">
                Browse through your family's latest stories and photos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemoryFeed />
            </CardContent>
          </Card>

          <div className="text-center">
            <Card className="inline-block bg-[#2A2A2A] border-[#3A3A3A] p-6">
              <CardHeader>
                <CardTitle className="text-white">Create Your Family Group</CardTitle>
                <CardDescription className="text-gray-400">
                  Start by creating a family group to share memories with your loved ones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleCreateFamily}
                  size="lg" 
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all duration-300"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Create Family Group
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryLane;