
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { EditFamilyDialog } from "@/components/family/EditFamilyDialog";

interface Family {
  id: string;
  name: string;
  description: string | null;
  members: {
    id: string;
    user_id: string;
    role: string;
    profiles: {
      full_name: string;
      avatar_url: string | null;
    };
  }[];
}

export default function Families() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFamilies();
  }, []);

  const getFamilies = async () => {
    try {
      const { data: familiesData, error: familiesError } = await supabase
        .from('vaya_families')
        .select(`
          id,
          name,
          description,
          members:vaya_family_members(
            id,
            user_id,
            role,
            profiles:profiles!user_id(
              full_name,
              avatar_url
            )
          )
        `);

      if (familiesError) throw familiesError;
      setFamilies(familiesData || []);
    } catch (error: any) {
      toast({
        title: "Error loading families",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Families</h1>
        <Button onClick={() => navigate("/create-family")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Family
        </Button>
      </div>

      <div className="grid gap-6">
        {families.map((family) => (
          <Card key={family.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">
                {family.name}
              </CardTitle>
              <EditFamilyDialog family={family} onFamilyUpdated={getFamilies} />
            </CardHeader>
            <CardContent>
              {family.description && (
                <p className="text-sm text-muted-foreground mb-4">
                  {family.description}
                </p>
              )}
              <div className="flex items-center space-x-4">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {family.members.length} members
                </span>
              </div>
            </CardContent>
          </Card>
        ))}

        {!loading && families.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center mb-4">
                You haven't created or joined any families yet
              </p>
              <Button onClick={() => navigate("/create-family")}>
                Create Your First Family
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
