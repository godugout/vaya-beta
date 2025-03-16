
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ProfileLoading } from "@/components/profile/ProfileLoading";
import { ProfileGrid } from "@/components/profile/ProfileGrid";
import { UserProfile } from "@/components/profile/types";

export function ProfilesSection() {
  const { toast } = useToast();
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("full_name", { ascending: true });

      if (error) throw error;
      setUserProfiles(data || []);
    } catch (error: any) {
      console.error("Error fetching profiles:", error.message);
      toast({
        title: "Error",
        description: "Failed to load profiles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-vaya-text-primary dark:text-dark-text-primary">
        All Profiles ({userProfiles.length})
      </h2>
      {loading ? <ProfileLoading /> : <ProfileGrid profiles={userProfiles} />}
    </div>
  );
}
