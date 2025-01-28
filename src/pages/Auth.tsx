import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface AuthDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function Auth({ open, onOpenChange }: AuthDialogProps) {
  const [email, setEmail] = useState("demo@vaya.com");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Auto-login effect for development
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: "demo@vaya.com",
          password: "demo123",
        });
        if (error) throw error;
        navigate("/");
      } catch (error: any) {
        console.error("Auto-login failed:", error.message);
      }
    };
    autoLogin();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: email.split("@")[0],
            },
          },
        });
        if (error) throw error;
        toast({
          title: "Success!",
          description: "Please check your email to verify your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-vaya-capsules/20">
        <div 
          className="absolute inset-0 -z-10 rounded-lg bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop')",
            opacity: 0.15
          }}
        />
        <div className="w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center">
              <img 
                src="/placeholder.svg" 
                alt="Vaya Logo" 
                className="h-12 w-12"
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-vaya-capsules">
              Vaya
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isSignUp ? "Start preserving memories" : "Sign in to your account"}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleAuth}>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/50 backdrop-blur-sm border-vaya-capsules/20 focus-visible:ring-vaya-capsules"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/50 backdrop-blur-sm border-vaya-capsules/20 focus-visible:ring-vaya-capsules"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-vaya-capsules hover:bg-vaya-capsules/90"
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-vaya-capsules hover:text-vaya-capsules/90"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Need an account? Sign up"}
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Demo credentials:</p>
            <p>Email: demo@vaya.com</p>
            <p>Password: demo123</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}