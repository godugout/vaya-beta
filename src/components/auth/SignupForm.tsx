
import { useState } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SignupFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  secretWord: string;
  setSecretWord: (secretWord: string) => void;
  setActiveTab: (tab: "login" | "signup") => void;
}

export const SignupForm = ({
  email,
  setEmail,
  password,
  setPassword,
  secretWord,
  setSecretWord,
  setActiveTab
}: SignupFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: email.split('@')[0], // Simple default name from email
          },
        },
      });

      if (error) throw error;

      if (data?.user?.identities?.length === 0) {
        toast({
          title: "Account exists",
          description: "An account with this email already exists. Please log in instead.",
        });
        setActiveTab("login");
      } else {
        toast({
          title: "Signup successful",
          description: "Please check your email for a confirmation link.",
        });
        
        // Check if secret word was provided and is valid
        if (secretWord.trim()) {
          const { data: familyId, error: secretError } = await supabase.rpc('check_family_secret', {
            _secret_word: secretWord.trim()
          });
  
          if (secretError) throw secretError;
          
          if (familyId) {
            // Store this information for later use after email verification
            localStorage.setItem("pendingFamilyJoin", JSON.stringify({
              familyId,
              secretWord
            }));
            
            toast({
              title: "Family found",
              description: "After verifying your email, you'll be able to join the family.",
            });
          }
        }
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-xs text-gray-500">
            Password must be at least 6 characters
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signup-secretWord">Family Secret Word (Optional)</Label>
          <Input
            id="signup-secretWord"
            placeholder="Enter a family's secret word to join"
            value={secretWord}
            onChange={(e) => setSecretWord(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            If you have a family secret word, enter it to join that family.
          </p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </CardFooter>
    </form>
  );
};
