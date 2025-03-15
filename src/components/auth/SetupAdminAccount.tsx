
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function SetupAdminAccount() {
  const [loading, setLoading] = useState(false);
  const [families, setFamilies] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch the Patel family
  useEffect(() => {
    const fetchFamilies = async () => {
      const { data, error } = await supabase
        .from("families")
        .select("id, name")
        .eq("name", "Patel Family")
        .single();

      if (error) {
        console.error("Error fetching family:", error);
        toast({
          title: "Error fetching family",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setFamilies([data]);
        setSelectedFamily(data.id);
      }
    };

    fetchFamilies();
  }, [toast]);

  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      // Create user account with Supabase
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: "jay@godugout.com",
        password: "Vaya#2025",
        options: {
          data: {
            full_name: "Jay Patel",
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      // Wait a moment for the account to be created
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Sign in with the new account
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: "jay@godugout.com",
        password: "Vaya#2025",
      });

      if (signInError) {
        throw signInError;
      }

      // Add user as admin of the Patel Family
      if (selectedFamily) {
        const { error: memberError } = await supabase
          .from("family_members")
          .insert({
            family_id: selectedFamily,
            user_id: signUpData?.user?.id,
            role: "admin",
          });

        if (memberError) {
          throw memberError;
        }
      }

      toast({
        title: "Account set up successfully",
        description: "You are now an admin of the Patel Family",
      });

      // Navigate to families page
      navigate("/families");
    } catch (error: any) {
      console.error("Setup error:", error);
      toast({
        title: "Error setting up account",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle>Set Up Admin Account</CardTitle>
          <CardDescription>
            Create an account for Jay Patel and connect to the Patel Family as an admin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Email</p>
              <p className="text-sm p-2 bg-gray-100 dark:bg-gray-800 rounded">jay@godugout.com</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Password</p>
              <p className="text-sm p-2 bg-gray-100 dark:bg-gray-800 rounded">Vaya#2025</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Family</p>
              <p className="text-sm p-2 bg-gray-100 dark:bg-gray-800 rounded">
                {families.length > 0 ? families[0].name : "Loading..."}
              </p>
            </div>
            <Button
              onClick={handleCreateAccount}
              disabled={loading || !selectedFamily}
              className="w-full"
            >
              {loading ? "Setting up..." : "Create Account & Connect as Admin"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
