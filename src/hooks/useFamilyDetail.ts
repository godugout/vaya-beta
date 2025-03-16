
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface FamilyMember {
  id: string;
  user_id: string;
  role: string;
  profiles: {
    full_name: string;
    avatar_url: string | null;
  } | null;
}

export interface Family {
  id: string;
  name: string;
  description: string | null;
  members: FamilyMember[];
}

export function useFamilyDetail(familyId: string | undefined) {
  const { toast } = useToast();
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

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

  return { family, loading, isAdmin };
}
