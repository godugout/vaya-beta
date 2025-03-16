
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { SimulatedAuth } from "@/components/auth/SimulatedAuth";

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretWord, setSecretWord] = useState("");
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [useSimulatedAuth, setUseSimulatedAuth] = useState(true);

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

  // Extract the secret from URL if present
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const secret = queryParams.get('secret');
    if (secret) {
      setSecretWord(secret);
    }
  }, []);

  // For simulated auth, don't render anything else
  if (useSimulatedAuth) {
    return <SimulatedAuth />;
  }

  return (
    <AuthLayout>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            secretWord={secretWord}
            setSecretWord={setSecretWord}
          />
        </TabsContent>
        
        <TabsContent value="signup">
          <SignupForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            secretWord={secretWord}
            setSecretWord={setSecretWord}
            setActiveTab={setActiveTab}
          />
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
}
