
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export interface InitialSetupFormProps {
  onSubmit?: (familyId: string) => void;
}

export function InitialSetupForm({ onSubmit }: InitialSetupFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [familyName, setFamilyName] = useState("");
  const [familyDescription, setFamilyDescription] = useState("");
  const [secretWord, setSecretWord] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!familyName.trim() || !secretWord.trim()) {
      toast({
        title: "Error",
        description: "Please enter both a family name and a secret word",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create a family",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Create family
      const { data: family, error: familyError } = await supabase
        .from("families")
        .insert({
          name: familyName,
          description: familyDescription || null,
        })
        .select()
        .single();

      if (familyError) throw familyError;

      // Add current user as family admin
      const { error: memberError } = await supabase
        .from("family_members")
        .insert({
          family_id: family.id,
          user_id: user.id,
          role: "admin",
        });

      if (memberError) throw memberError;

      // Create family secret word
      const { error: secretError } = await supabase
        .from("family_access_codes")
        .insert({
          family_id: family.id,
          secret_word: secretWord,
          created_by: user.id,
        });

      if (secretError) throw secretError;

      toast({
        title: "Family Created",
        description: "Your family has been created successfully!",
      });

      if (onSubmit) {
        onSubmit(family.id);
      } else {
        navigate(`/family/${family.id}`);
      }
    } catch (error: any) {
      console.error("Error creating family:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Family</CardTitle>
        <CardDescription>
          Set up your family space and create the first secret word that will allow family members to join.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="family-name">Family Name</Label>
            <Input
              id="family-name"
              placeholder="e.g., The Smith Family"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="family-description">Description (Optional)</Label>
            <Textarea
              id="family-description"
              placeholder="Tell us a bit about your family..."
              value={familyDescription}
              onChange={(e) => setFamilyDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secret-word">Family Secret Word</Label>
            <Input
              id="secret-word"
              placeholder="Create a memorable word or phrase"
              value={secretWord}
              onChange={(e) => setSecretWord(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              This secret word will be used by family members to join. Choose something memorable that all family members would know.
            </p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Family"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
