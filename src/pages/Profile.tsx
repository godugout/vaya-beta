import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { seedPatelFamily } from "@/utils/seedPatelFamily";
import { supabase } from "@/integrations/supabase/client";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { Plus, Loader2 } from "lucide-react";

interface UserProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  birthdate: string | null;
  email: string | null;
  home_address: string | null;
  data_source: string | null;
  imported_at: string | null;
}

interface UserFamily {
  familyId: string;
  familyName: string;
  familyDescription: string | null;
  role: string;
}

export default function Profile() {
  const { toast } = useToast();
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [userFamilies, setUserFamilies] = useState<UserFamily[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    fetchProfiles();
    fetchUserFamilies();
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

  const fetchUserFamilies = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (user?.user) {
        const { data, error } = await supabase
          .from("family_members")
          .select(`
            id,
            role,
            families:family_id (
              id,
              name,
              description
            )
          `)
          .eq("user_id", user.user.id);
      
        if (error) throw error;
      
        const formattedFamilies = data.map(item => {
          const familyData = item.families as any;
          
          return {
            familyId: familyData?.id || '',
            familyName: familyData?.name || '',
            familyDescription: familyData?.description || null,
            role: item.role
          };
        });
      
        setUserFamilies(formattedFamilies);
      }
    } catch (error: any) {
      console.error("Error fetching user families:", error.message);
    }
  };

  const handleSeedPatelFamily = async () => {
    setSeeding(true);
    try {
      const result = await seedPatelFamily();
      if (result.success) {
        toast({
          title: "Success",
          description: "Patel family members have been added successfully",
        });
        fetchProfiles();
      } else {
        throw new Error("Failed to seed Patel family");
      }
    } catch (error: any) {
      console.error("Error seeding Patel family:", error);
      toast({
        title: "Error",
        description: "Failed to seed Patel family members",
        variant: "destructive",
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="container max-w-6xl py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-vaya-text-primary dark:text-dark-text-primary">
          Profile Database
        </h1>
        <Button 
          onClick={handleSeedPatelFamily} 
          disabled={seeding}
          className="flex items-center gap-2"
        >
          {seeding ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Seeding...</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Seed Patel Family</span>
            </>
          )}
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading profiles...</span>
        </div>
      ) : (
        <>
          {userFamilies.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-vaya-text-primary dark:text-dark-text-primary">
                Your Families
              </h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {userFamilies.map((family) => (
                  <Card key={family.familyId} className="dark:bg-dark-background-elevated">
                    <CardHeader>
                      <CardTitle className="text-lg">{family.familyName}</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{family.role}</p>
                    </CardHeader>
                    <CardContent>
                      {family.familyDescription && (
                        <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                          {family.familyDescription}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-4 text-vaya-text-primary dark:text-dark-text-primary">
              All Profiles ({userProfiles.length})
            </h2>
            {userProfiles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProfiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">
                No profiles found. Click the "Seed Patel Family" button to create profile entries.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
