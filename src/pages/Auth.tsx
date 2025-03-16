
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  Key
} from "lucide-react";

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  secretWord: z.string().min(3, { message: "Secret word must be at least 3 characters" }),
});

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  secretWord: z.string().min(3, { message: "Secret word must be at least 3 characters" }),
  fullName: z.string().min(2, { message: "Please enter your full name" }),
});

const resetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Check if user is redirected for signup
    if (searchParams.get("register") === "true") {
      setActiveTab("signup");
    }
    
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate, searchParams]);
  
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      secretWord: "",
    },
  });
  
  // Signup form
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      secretWord: "",
      fullName: "",
    },
  });
  
  // Reset password form
  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const checkFamilyAccess = async (secretWord: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('check_family_secret', {
        _secret_word: secretWord
      });
      
      if (error) {
        console.error("Error checking secret word:", error);
        return false;
      }
      
      return !!data; // Return true if a family ID was found
    } catch (error) {
      console.error("Error in checkFamilyAccess:", error);
      return false;
    }
  };
  
  const handleEmailLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);
      
      // First validate the secret word
      const hasAccess = await checkFamilyAccess(values.secretWord);
      if (!hasAccess) {
        toast({
          title: "Access Denied",
          description: "The secret word you entered is not valid. Please try again or contact your family administrator.",
          variant: "destructive",
        });
        return;
      }
      
      // If secret word is valid, attempt to log in
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.secretWord, // Using the secret word as the password
      });

      if (error) {
        // If login fails, try a passwordless magic link login
        const { error: magicLinkError } = await supabase.auth.signInWithOtp({
          email: values.email,
          options: {
            // Store the secret for verification later
            data: { secretWord: values.secretWord }
          }
        });
        
        if (magicLinkError) throw magicLinkError;
        
        toast({
          title: "Check your email",
          description: "We've sent you a magic link to sign in.",
        });
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (values: z.infer<typeof signupSchema>) => {
    try {
      setLoading(true);
      
      // First validate the secret word
      const hasAccess = await checkFamilyAccess(values.secretWord);
      if (!hasAccess) {
        toast({
          title: "Access Denied",
          description: "The secret word you entered is not valid. Please ask an existing family member for the correct secret word.",
          variant: "destructive",
        });
        return;
      }
      
      // If secret word is valid, attempt to sign up
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.secretWord, // Using the secret word as the password
        options: {
          data: {
            full_name: values.fullName,
          },
        },
      });

      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Please check your email to verify your account. You'll be able to join your family after verification.",
      });
      
      setActiveTab("login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (values: z.infer<typeof resetSchema>) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/account?reset=true`,
      });

      if (error) throw error;
      
      toast({
        title: "Reset link sent",
        description: "Please check your email for the password reset link.",
      });
      
      setResetPasswordOpen(false);
    } catch (error: any) {
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
    <div className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      {/* Nature waterfall background - blurred */}
      <div className="absolute inset-0 nature-bg-blur nature-waterfall-bg">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white/80 backdrop-blur-md p-8 shadow-lg z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Your Family App
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {activeTab === "login" 
              ? "Sign in with your email and family secret word" 
              : "Join your family with the secret word you were given"}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Join Family</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4 pt-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleEmailLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Your email"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="secretWord"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Family Secret Word</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Your family's secret word"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-lovable-magenta hover:bg-lovable-magenta-bright"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
            
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setResetPasswordOpen(true)}
                className="text-lovable-blue"
              >
                Forgot your secret word?
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4 pt-4">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleEmailSignup)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="Your full name"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Your email"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="secretWord"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Family Secret Word</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter the family secret word"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">
                        You must know the family's secret word to join. Ask an existing family member for this word.
                      </p>
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-lovable-magenta hover:bg-lovable-magenta-bright"
                  disabled={loading}
                >
                  {loading ? "Joining family..." : "Join Family"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
        
        {/* Reset Password Dialog */}
        <Dialog open={resetPasswordOpen} onOpenChange={setResetPasswordOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Reset access</DialogTitle>
              <DialogDescription>
                Enter your email address and we'll send you a link to reset your access.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...resetForm}>
              <form onSubmit={resetForm.handleSubmit(handlePasswordReset)} className="space-y-4">
                <FormField
                  control={resetForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Your email"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setResetPasswordOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send reset link"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
