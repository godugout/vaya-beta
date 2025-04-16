
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Handle scroll for sticky header behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  // Add a class to the body to help with styling based on the current page
  useEffect(() => {
    const path = location.pathname.split('/')[1] || 'index';
    document.body.setAttribute('data-route', path);
    
    return () => {
      document.body.removeAttribute('data-route');
    };
  }, [location]);

  return (
    <>
      {/* Sticky Top Navigation */}
      <header className={cn(
        "nav-container transition-all duration-300 fixed top-0 left-0 right-0 z-[100]",
        isSimplifiedView && "simplified-view",
        isMinimized ? "h-12" : "",
        isScrolled && "shadow-md bg-background/95"
      )}>
        <button
          onClick={() => setIsMinimized(prev => !prev)}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-50"
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
        
        {!isMinimized && (
          <div className="px-4 sm:px-6 lg:px-8">
            <BreadcrumbNav isSimplifiedView={isSimplifiedView} />
          </div>
        )}
      </header>
      
      {/* Content spacing to prevent overlap with fixed headers */}
      <div className={cn(
        "h-20",
        isMobile && "h-24",
        isMinimized && "h-12"
      )} />
      
      {/* Voice Navigation Indicator */}
      <VoiceNavigationIndicator isActive={isVoiceActive} />
      
      {/* Sticky Bottom Action Bar */}
      {(isMobile || isTablet) && (
        <MobileBottomNav 
          user={user} 
          navigate={navigate}
          isSimplifiedView={isSimplifiedView}
          isVoiceActive={isVoiceActive}
          onVoiceToggle={toggleVoiceNavigation}
        />
      )}
    </>
  );
}
