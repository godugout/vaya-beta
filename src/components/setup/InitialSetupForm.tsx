
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export interface InitialSetupFormProps {
  onSubmit?: (familyId: string) => void;
  defaultSecretWord?: string;
  showCard?: boolean;
}

export function InitialSetupForm({ 
  onSubmit, 
  defaultSecretWord = "", 
  showCard = true 
}: InitialSetupFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [familyName, setFamilyName] = useState("");
  const [familyDescription, setFamilyDescription] = useState("");
  const [secretWord, setSecretWord] = useState(defaultSecretWord);
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

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="family-name" className="text-indigo-100 font-medium">Family Name</Label>
        <Input
          id="family-name"
          placeholder="e.g., The Smith Family"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          required
          className="w-full shadow-[0_0_15px_rgba(139,92,246,0.15)]"
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="family-description" className="text-indigo-100 font-medium">Description (Optional)</Label>
        <Textarea
          id="family-description"
          placeholder="Tell us a bit about your family..."
          value={familyDescription}
          onChange={(e) => setFamilyDescription(e.target.value)}
          rows={3}
          className="w-full min-h-[120px] rounded-xl border border-purple-500/20 bg-purple-900/10 text-white placeholder:text-white/40 focus-visible:ring-purple-500/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="secret-word" className="text-indigo-100 font-medium">Family Secret Word</Label>
        <Input
          id="secret-word"
          placeholder="Create a memorable word or phrase"
          value={secretWord}
          onChange={(e) => setSecretWord(e.target.value)}
          required
          className="w-full shadow-[0_0_15px_rgba(139,92,246,0.15)]"
        />
        <p className="text-xs text-indigo-200/70">
          This secret word will be used by family members to join. Choose something memorable that all family members would know.
        </p>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 rounded-xl shadow-[0_4px_15px_rgba(139,92,246,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)] hover:translate-y-[-1px]]"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Family"}
      </Button>
    </form>
  );

  return formContent;
}
