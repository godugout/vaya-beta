
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MainLayout } from "@/components/layout/MainLayout";
import { InitialSetupForm } from "@/components/setup/InitialSetupForm";
import { SetupLoadingState } from "@/components/setup/SetupLoadingState";

export default function InitialSetup() {
  const navigate = useNavigate();
  const [hasFamilies, setHasFamilies] = useState(false);
  const [checking, setChecking] = useState(true);

  // Check if any families exist already
  useEffect(() => {
    const checkExistingFamilies = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/auth');
          return;
        }
        
        const { count, error } = await supabase
          .from("families")
          .select("*", { count: "exact", head: true });

        if (error) throw error;
        setHasFamilies(count !== null && count > 0);
      } catch (error) {
        console.error("Error checking families:", error);
      } finally {
        setChecking(false);
      }
    };

    checkExistingFamilies();
  }, [navigate]);

  // If we're already set up, redirect to families page
  useEffect(() => {
    if (!checking && hasFamilies) {
      navigate("/families");
    }
  }, [hasFamilies, checking, navigate]);

  if (checking) {
    return (
      <MainLayout>
        <SetupLoadingState />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-md py-10">
        <InitialSetupForm />
      </div>
    </MainLayout>
  );
}
