
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "@/hooks/useUserAuth";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DesktopNav } from "@/components/nav/DesktopNav";
import { MobileTopNav } from "@/components/nav/MobileTopNav";
import { MobileBottomNav } from "@/components/nav/MobileBottomNav";
import { BreadcrumbNav } from "@/components/nav/BreadcrumbNav";
import { MinimizedHeader } from "@/components/nav/MinimizedHeader";

export const MainNav = () => {
  const { user, handleSignOut } = useUserAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const isMobile = useMediaQuery("(max-width: 1024px)");
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsMinimized(scrollPosition > 100);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleLogout = async () => {
    await handleSignOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  const toggleSimplifiedView = () => {
    setIsSimplifiedView(!isSimplifiedView);
    toast({
      title: isSimplifiedView ? "Standard View Enabled" : "Simplified View Enabled",
      description: isSimplifiedView 
        ? "Switched to standard layout with detailed navigation." 
        : "Switched to simplified layout for easier viewing.",
    });
  };
  
  const toggleVoiceNavigation = () => {
    setIsVoiceActive(!isVoiceActive);
    toast({
      title: isVoiceActive ? "Voice Navigation Disabled" : "Voice Navigation Enabled",
      description: isVoiceActive 
        ? "Voice commands are now disabled." 
        : "You can now use voice commands to navigate.",
    });
  };

  return (
    <div className={`sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 border-b ${isMinimized ? 'h-12 border-border' : 'h-24 border-transparent'}`}>
      {/* Minimized Header (shown when scrolled) */}
      <MinimizedHeader isMinimized={isMinimized} />

      {/* Regular Navigation (shown when not minimized) */}
      {!isMinimized && (
        <>
          {isMobile ? (
            <>
              <MobileTopNav 
                user={user}
                handleSignOut={handleLogout}
                navigate={navigate}
                isSimplifiedView={isSimplifiedView}
                onSettingsToggle={toggleSimplifiedView}
              />
              <BreadcrumbNav isSimplifiedView={isSimplifiedView} />
              <MobileBottomNav 
                user={user}
                navigate={navigate}
                isSimplifiedView={isSimplifiedView}
                isVoiceActive={isVoiceActive}
                onVoiceToggle={toggleVoiceNavigation}
              />
            </>
          ) : (
            <>
              <DesktopNav 
                user={user}
                handleSignOut={handleLogout}
                navigate={navigate}
                isSimplifiedView={isSimplifiedView}
                isVoiceActive={isVoiceActive}
                onVoiceToggle={toggleVoiceNavigation}
              />
              <BreadcrumbNav isSimplifiedView={isSimplifiedView} />
            </>
          )}
        </>
      )}
    </div>
  );
};
