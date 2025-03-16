
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretWord, setSecretWord] = useState("");
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate("/families");
      }
    };
    
    checkUser();
  }, [navigate]);

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
    <MainLayout>
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-md">
          <Card className="border border-gray-300 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Welcome</CardTitle>
              <CardDescription className="text-center">
                Sign in to access your family space
              </CardDescription>
            </CardHeader>
            
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
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
              </TabsContent>
              
              <TabsContent value="signup">
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
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
