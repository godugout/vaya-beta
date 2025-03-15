
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileTopNav } from "./nav/MobileTopNav";
import { MobileBottomNav } from "./nav/MobileBottomNav";
import { BreadcrumbNav } from "./nav/BreadcrumbNav";
import { VoiceNavigationIndicator } from "./nav/VoiceNavigationIndicator";
import { useToast } from "@/components/ui/use-toast";

export function MainNav() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const { toast } = useToast();

  // Get simplified view preference from localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem('simplifiedView');
    if (savedPreference) {
      setIsSimplifiedView(savedPreference === 'true');
    }
  }, []);

  // Save simplified view preference to localStorage
  const toggleSimplifiedView = () => {
    const newValue = !isSimplifiedView;
    setIsSimplifiedView(newValue);
    localStorage.setItem('simplifiedView', String(newValue));
    
    toast({
      title: newValue ? "Simplified View Enabled" : "Standard View Enabled",
      description: newValue 
        ? "Larger text and touch targets for easier navigation." 
        : "Standard navigation view restored.",
    });
  };

  const toggleVoiceNavigation = () => {
    setIsVoiceActive(prev => !prev);
    
    if (!isVoiceActive) {
      toast({
        title: "Voice Navigation Active",
        description: "Try saying 'Go to Home' or 'Record Story'",
        variant: "default",
        className: "bg-autumn text-white dark:bg-leaf dark:text-black",
      });
    } else {
      toast({
        title: "Voice Navigation Disabled",
        description: "Voice commands have been turned off.",
      });
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      
      // Show welcome toast when user signs in
      if (_event === 'SIGNED_IN') {
        const fullName = session?.user?.user_metadata?.full_name || 'User';
        toast({
          title: `Welcome, ${fullName}!`,
          description: "You have successfully signed in.",
          variant: "default", 
          className: "bg-autumn/90 text-white dark:bg-leaf/90 dark:text-black border-autumn/20 dark:border-leaf/20",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/auth");
  };

  return (
    <>
      {/* Fixed positioning for header */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <DesktopNav 
          user={user} 
          handleSignOut={handleSignOut} 
          navigate={navigate} 
          isSimplifiedView={isSimplifiedView}
          isVoiceActive={isVoiceActive}
          onVoiceToggle={toggleVoiceNavigation}
        />
        <MobileTopNav 
          user={user} 
          handleSignOut={handleSignOut} 
          navigate={navigate} 
          isSimplifiedView={isSimplifiedView}
          onSettingsToggle={toggleSimplifiedView}
        />
      </header>
      
      {/* Voice navigation indicator */}
      <VoiceNavigationIndicator isActive={isVoiceActive} />
      
      <MobileBottomNav 
        user={user} 
        navigate={navigate} 
        isSimplifiedView={isSimplifiedView}
        isVoiceActive={isVoiceActive}
        onVoiceToggle={toggleVoiceNavigation}
      />
      
      {/* Breadcrumbs navigation */}
      <div className={`mt-20 ${isVoiceActive ? 'pt-16' : ''}`}>
        <BreadcrumbNav isSimplifiedView={isSimplifiedView} />
      </div>
      
      {/* Spacer for fixed header and breadcrumbs */}
      <div className={`h-20 ${isVoiceActive ? 'h-36' : ''}`} /> 
    </>
  );
}
