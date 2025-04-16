import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileTopNav } from "./nav/MobileTopNav";
import { MobileBottomNav } from "./nav/MobileBottomNav";
import { BreadcrumbNav } from "./nav/BreadcrumbNav";
import { VoiceNavigationIndicator } from "./nav/VoiceNavigationIndicator";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronDown, ChevronUp } from "lucide-react";

export function MainNav() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { toast } = useToast();
  
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const savedPreference = localStorage.getItem('simplifiedView');
    if (savedPreference) {
      setIsSimplifiedView(savedPreference === 'true');
    }
  }, []);

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
      
      if (_event === 'SIGNED_IN') {
        const fullName = session?.user?.user_metadata?.full_name || 'User';
        toast({
          title: `Welcome, ${fullName}!`,
          description: "You have successfully signed in.",
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
      <header className={cn(
        "nav-container transition-all duration-300",
        isSimplifiedView && "simplified-view",
        isMinimized ? "h-12" : ""
      )}>
        <button
          onClick={() => setIsMinimized(prev => !prev)}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-accent/50 transition-colors"
          aria-label={isMinimized ? "Expand navigation" : "Minimize navigation"}
        >
          {isMinimized ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </button>

        {isDesktop && !isMinimized && (
          <DesktopNav 
            user={user} 
            handleSignOut={handleSignOut} 
            navigate={navigate}
            isSimplifiedView={isSimplifiedView}
            isVoiceActive={isVoiceActive}
            onVoiceToggle={toggleVoiceNavigation}
          />
        )}
        
        {isMinimized && (
          <div className="flex items-center h-12 px-4">
            <img 
              src="/lovable-uploads/4425ec86-56fe-44c4-9f47-75e59d3cb287.png" 
              alt="Vaya Logo" 
              className="h-6" 
            />
          </div>
        )}
        
        {(isMobile || isTablet) && !isMinimized && (
          <MobileTopNav 
            user={user} 
            handleSignOut={handleSignOut} 
            navigate={navigate}
            isSimplifiedView={isSimplifiedView}
            onSettingsToggle={toggleSimplifiedView}
          />
        )}
      </header>
      
      {isVoiceActive && <VoiceNavigationIndicator isActive={isVoiceActive} />}
      
      {(isMobile || isTablet) && !isMinimized && (
        <MobileBottomNav 
          user={user} 
          navigate={navigate}
          isSimplifiedView={isSimplifiedView}
          isVoiceActive={isVoiceActive}
          onVoiceToggle={toggleVoiceNavigation}
        />
      )}
      
      <div className={cn(
        "mt-20",
        isMobile && "mt-16",
        isVoiceActive && "pt-16",
        isMinimized && "mt-12",
        isSimplifiedView && "simplified-view"
      )}>
        <BreadcrumbNav isSimplifiedView={isSimplifiedView} />
      </div>
      
      <div className={cn(
        "h-20",
        isMobile && "h-16",
        isVoiceActive && "h-36",
        isMinimized && "h-12"
      )} />
    </>
  );
}
