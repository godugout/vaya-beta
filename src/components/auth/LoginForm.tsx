
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  secretWord: string;
  setSecretWord: (secretWord: string) => void;
}

// Special secret words that are always accepted
const SPECIAL_SECRET_WORDS = ['hanuman', 'jsk', 'sriram', 'ramramram'];

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  secretWord,
  setSecretWord
}: LoginFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, try to login
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // If login successful, check if the secret word is valid
      if (secretWord.trim()) {
        // Check if it's one of our special passwords
        if (SPECIAL_SECRET_WORDS.includes(secretWord.toLowerCase().trim())) {
          // Get the first family to join
          const { data: families, error: familiesError } = await supabase
            .from('families')
            .select('id')
            .limit(1);
            
          if (familiesError) throw familiesError;
          
          if (families && families.length > 0) {
            const familyId = families[0].id;
            
            // Check if user is already in this family
            const { data: existingMember, error: memberCheckError } = await supabase
              .from('family_members')
              .select('id')
              .eq('family_id', familyId)
              .eq('user_id', authData.user?.id)
              .maybeSingle();
              
            if (memberCheckError) throw memberCheckError;
            
            // If not already a member, add them
            if (!existingMember) {
              const { error: addMemberError } = await supabase
                .from('family_members')
                .insert({
                  family_id: familyId,
                  user_id: authData.user?.id,
                  role: 'member' // New users join as regular members
                });
                
              if (addMemberError) throw addMemberError;
              
              toast({
                title: "Welcome!",
                description: "You've successfully joined a family with a special access code.",
              });
            }
            
            // Navigate to that specific family
            navigate(`/family/${familyId}`);
            return;
          }
        }
        
        // Standard check using the database
        const { data, error } = await supabase.rpc('check_family_secret', {
          _secret_word: secretWord.trim()
        });

        if (error) throw error;

        // If secret word is valid, add user to that family
        if (data) {
          const familyId = data;
          
          // Check if user is already in this family
          const { data: existingMember, error: memberCheckError } = await supabase
            .from('family_members')
            .select('id')
            .eq('family_id', familyId)
            .eq('user_id', authData.user?.id)
            .maybeSingle();
            
          if (memberCheckError) throw memberCheckError;
          
          // If not already a member, add them
          if (!existingMember) {
            const { error: addMemberError } = await supabase
              .from('family_members')
              .insert({
                family_id: familyId,
                user_id: authData.user?.id,
                role: 'member' // New users join as regular members
              });
              
            if (addMemberError) throw addMemberError;
            
            toast({
              title: "Welcome!",
              description: "You've successfully joined a family with the provided secret word.",
            });
          }
          
          // Navigate to that specific family
          navigate(`/family/${familyId}`);
          return;
        }
      }

      // If no secret word or invalid, just go to families page
      navigate("/families");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="secretWord">Family Secret Word (Optional)</Label>
          <Input
            id="secretWord"
            placeholder="Enter your family's secret word to join"
            value={secretWord}
            onChange={(e) => setSecretWord(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            If you know a family's secret word, enter it to join their family automatically.
          </p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </CardFooter>
    </form>
  );
};
