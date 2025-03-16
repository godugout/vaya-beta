
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface UserFamily {
  familyId: string;
  familyName: string;
  familyDescription: string | null;
  role: string;
}

export function UserFamiliesSection() {
  const { toast } = useToast();
  const [userFamilies, setUserFamilies] = useState<UserFamily[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserFamilies();
  }, []);

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
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Error fetching user families:", error.message);
      toast({
        title: "Error",
        description: "Failed to load family information",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  if (userFamilies.length === 0) {
    return null;
  }

  return (
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
  );
}
