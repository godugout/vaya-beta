
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { UserProfile } from "@/components/profile/types";

export const useProfileManagement = () => {
  const { toast } = useToast();
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    filterProfiles(searchQuery);
  }, [searchQuery, userProfiles]);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("full_name", { ascending: true });

      if (error) throw error;
      setUserProfiles(data || []);
      setFilteredProfiles(data || []);
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

  const filterProfiles = (query: string) => {
    if (query.trim() === "") {
      setFilteredProfiles(userProfiles);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = userProfiles.filter(profile => 
        profile.full_name.toLowerCase().includes(lowerQuery) ||
        (profile.email && profile.email.toLowerCase().includes(lowerQuery)) ||
        (profile.home_address && profile.home_address.toLowerCase().includes(lowerQuery))
      );
      setFilteredProfiles(filtered);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return {
    userProfiles,
    filteredProfiles,
    loading,
    searchQuery,
    handleSearch,
    isSearching: searchQuery.trim() !== ""
  };
};
