
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ProfileLoading } from "@/components/profile/ProfileLoading";
import { ProfileGrid } from "@/components/profile/ProfileGrid";
import { UserProfile } from "@/components/profile/types";
import { SearchInput } from "@/components/input/SearchInput";

export function ProfilesSection() {
  const { toast } = useToast();
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProfiles(userProfiles);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = userProfiles.filter(profile => 
        profile.full_name.toLowerCase().includes(query) ||
        (profile.email && profile.email.toLowerCase().includes(query)) ||
        (profile.home_address && profile.home_address.toLowerCase().includes(query))
      );
      setFilteredProfiles(filtered);
    }
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

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-vaya-text-primary dark:text-dark-text-primary">
          All Profiles ({filteredProfiles.length}/{userProfiles.length})
        </h2>
        <SearchInput 
          placeholder="Search by name, email, or address..." 
          onChange={handleSearch}
          className="max-w-xl"
        />
      </div>
      {loading ? <ProfileLoading /> : <ProfileGrid profiles={filteredProfiles} />}
    </div>
  );
}
