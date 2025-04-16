
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useSimplifiedView } from "@/hooks/useSimplifiedView";
import { useVoiceNavigation } from "@/hooks/useVoiceNavigation";
import { useUserAuth } from "@/hooks/useUserAuth";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileTopNav } from "./nav/MobileTopNav";
import { MobileBottomNav } from "./nav/MobileBottomNav";
import { BreadcrumbNav } from "./nav/BreadcrumbNav";
import { VoiceNavigationIndicator } from "./nav/VoiceNavigationIndicator";
import { MinimizeButton } from "./nav/MinimizeButton";
import { MinimizedHeader } from "./nav/MinimizedHeader";
import { ContentSpacer } from "./nav/ContentSpacer";

export function MainNav() {
  const location = useLocation();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const { isSimplifiedView, toggleSimplifiedView } = useSimplifiedView();
  const { isVoiceActive, toggleVoiceNavigation } = useVoiceNavigation();
  const { user, handleSignOut } = useUserAuth();
  
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  
  const isHomePage = location.pathname === '/';

  // Handle scroll for sticky header behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
      setIsAtTop(scrollPosition < 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add a class to the body to help with styling based on the current page
  useEffect(() => {
    const path = location.pathname.split('/')[1] || 'index';
    document.body.setAttribute('data-route', path);
    
    return () => {
      document.body.removeAttribute('data-route');
    };
  }, [location]);

  const toggleMinimized = () => setIsMinimized(prev => !prev);
  const navigate = (path: string) => window.location.href = path;

  return (
    <>
      {/* Sticky Top Navigation */}
      <header className={cn(
        "nav-container fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        isSimplifiedView && "simplified-view",
        isMinimized ? "h-12" : "",
        isScrolled && "shadow-md",
        isHomePage && isAtTop ? "bg-transparent border-transparent" : "bg-background/95 backdrop-blur-sm border-b",
      )}>
        <MinimizeButton 
          isMinimized={isMinimized} 
          toggleMinimized={toggleMinimized} 
        />

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
        
        <MinimizedHeader isMinimized={isMinimized} />
        
        {(isMobile || isTablet) && !isMinimized && (
          <MobileTopNav 
            user={user} 
            handleSignOut={handleSignOut} 
            navigate={navigate}
            isSimplifiedView={isSimplifiedView}
            onSettingsToggle={toggleSimplifiedView}
          />
        )}
        
        {!isMinimized && !isHomePage && (
          <div className="px-4 sm:px-6 lg:px-8">
            <BreadcrumbNav isSimplifiedView={isSimplifiedView} />
          </div>
        )}
      </header>
      
      {/* Content spacing to prevent overlap with fixed headers */}
      {!isHomePage && (
        <ContentSpacer isMinimized={isMinimized} isMobile={isMobile} />
      )}
      
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
