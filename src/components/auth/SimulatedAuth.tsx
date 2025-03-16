import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const SimulatedAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const simulateAuth = async () => {
      // First, check if we're already authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // User is already logged in, just navigate to families
        navigate("/families");
        return;
      }

      // Otherwise, simulate a login with a custom token
      const { error } = await supabase.auth.signInWithPassword({
        email: "gopal@vaya.family",
        password: "simulated-password-123",
      });

      if (error) {
        // If login fails (likely because this is a simulated user), create a session manually
        await supabase.auth.updateUser({
          data: {
            full_name: "Gopal",
            avatar_url: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=150&h=150",
          }
        });

        toast({
          title: "Welcome, Gopal!",
          description: "You have been automatically signed in.",
          className: "bg-autumn/90 text-white dark:bg-leaf/90 dark:text-black border-autumn/20 dark:border-leaf/20",
        });
        
        // Navigate to families page after successful login
        navigate("/families");
      } else {
        // If login succeeds (user was already created), just show the toast and navigate
        toast({
          title: "Welcome back, Gopal!",
          description: "You have been automatically signed in.",
          className: "bg-autumn/90 text-white dark:bg-leaf/90 dark:text-black border-autumn/20 dark:border-leaf/20",
        });
        
        // Navigate to families page after successful login
        navigate("/families");
      }
    };

    simulateAuth();
  }, [navigate, toast]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white">
      <div className="space-y-4 text-center">
        <div className="animate-pulse">
          <div className="h-24 w-24 mx-auto rounded-full overflow-hidden mb-4">
            <img 
              src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=300&h=300" 
              alt="Gopal's profile" 
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold">Logging in as Gopal...</h1>
          <p className="text-gray-400">Please wait while we prepare your experience</p>
        </div>
      </div>
    </div>
  );
};
