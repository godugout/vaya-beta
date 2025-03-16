
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Users, Key, BookOpen, Image } from "lucide-react";
import { FamilySecretManager } from "@/components/family/FamilySecretManager";
import { FamilyDetailHeader } from "@/components/family/FamilyDetailHeader";
import { FamilyMembersTab } from "@/components/family/FamilyMembersTab";
import { PlaceholderTab } from "@/components/family/PlaceholderTab";
import { FamilyNotFound } from "@/components/family/FamilyNotFound";
import { FamilyLoadingState } from "@/components/family/FamilyLoadingState";

interface FamilyMember {
  id: string;
  user_id: string;
  role: string;
  profiles: {
    full_name: string;
    avatar_url: string | null;
  } | null;
}

interface Family {
  id: string;
  name: string;
  description: string | null;
  members: FamilyMember[];
}

export default function FamilyDetail() {
  const { familyId } = useParams<{ familyId: string }>();
  const { toast } = useToast();
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("members");

  useEffect(() => {
    if (familyId) {
      getFamily(familyId);
    }
  }, [familyId]);

  const getFamily = async (id: string) => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get family details with members
      const { data, error } = await supabase
        .from("families")
        .select(`
          id,
          name,
          description,
          members:family_members(
            id,
            user_id,
            role,
            profiles:profiles(
              full_name,
              avatar_url
            )
          )
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;
      
      // Process the data to match our Family interface
      const processedData: Family = {
        id: data.id,
        name: data.name,
        description: data.description,
        members: data.members.map((member: any) => ({
          id: member.id,
          user_id: member.user_id,
          role: member.role,
          profiles: member.profiles && member.profiles.length > 0 
            ? {
                full_name: member.profiles[0].full_name,
                avatar_url: member.profiles[0].avatar_url
              }
            : null
        }))
      };
      
      // Find the current user's role in this family
      const currentMember = processedData.members.find(m => m.user_id === user?.id);
      if (currentMember) {
        setUserRole(currentMember.role);
      }
      
      setFamily(processedData);
    } catch (error: any) {
      console.error("Error loading family:", error);
      toast({
        title: "Error",
        description: "Failed to load family details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = userRole === "admin";

  return (
    <MainLayout>
      <div className="container py-8 max-w-6xl">
        {loading ? (
          <FamilyLoadingState />
        ) : family ? (
          <div className="space-y-8">
            <FamilyDetailHeader 
              familyName={family.name}
              familyDescription={family.description}
              isAdmin={isAdmin}
              familyId={family.id}
            />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
                <TabsTrigger value="members" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Members</span>
                </TabsTrigger>
                {isAdmin && (
                  <TabsTrigger value="access" className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    <span className="hidden sm:inline">Access</span>
                  </TabsTrigger>
                )}
                <TabsTrigger value="stories" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Stories</span>
                </TabsTrigger>
                <TabsTrigger value="photos" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  <span className="hidden sm:inline">Photos</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="members">
                <FamilyMembersTab 
                  members={family.members} 
                  familyId={family.id}
                  isAdmin={isAdmin}
                />
              </TabsContent>
              
              {isAdmin && (
                <TabsContent value="access">
                  <FamilySecretManager familyId={family.id} />
                </TabsContent>
              )}
              
              <TabsContent value="stories">
                <PlaceholderTab title="Family Stories" />
              </TabsContent>
              
              <TabsContent value="photos">
                <PlaceholderTab title="Family Photos" />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <FamilyNotFound />
        )}
      </div>
    </MainLayout>
  );
}
