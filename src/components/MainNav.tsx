
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

      // Auto-minimize the header when scrolling down
      if (scrollPosition > 100 && !isMinimized && !isHomePage) {
        setIsMinimized(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMinimized, isHomePage]);

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
        
        {isMinimized && isDesktop && (
          <div className="flex items-center justify-between h-12 container mx-auto px-4">
            {/* Left group: Logo, Home, Breadcrumbs */}
            <MinimizedHeader isMinimized={isMinimized} />
            
            {/* Center group: Main navigation */}
            <div className="hidden md:flex items-center justify-center">
              <NavigationItems user={user} isSimplified={true} />
            </div>
            
            {/* Right group: Search, Voice, User */}
            <div className="flex items-center gap-2">
              <SearchButton />
              <VoiceControlButton 
                isActive={isVoiceActive}
                onToggle={toggleVoiceNavigation}
              />
              {user ? (
                <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} isMinimized={true} />
              ) : (
                <SignInButton navigate={navigate} isMinimized={true} />
              )}
            </div>
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
        
        {!isMinimized && !isHomePage && (
          <div className="px-4 sm:px-6 lg:px-8 py-1 border-t border-border/30">
            <div className="container mx-auto">
              <BreadcrumbNav isSimplifiedView={isSimplifiedView} />
            </div>
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

// New minimized components
const NavigationItems = ({ user, isSimplified }: { user: any, isSimplified: boolean }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/share-stories', label: 'Stories' },
    { path: '/memory-lane', label: 'Memories' },
    { path: '/family-capsules', label: 'Capsules' },
  ];
  
  if (user) {
    navItems.push({ path: '/families', label: 'Family' });
  }
  
  return (
    <nav className="flex items-center gap-2">
      {navItems.map(item => {
        const isActive = location.pathname === item.path;
        return (
          <a 
            key={item.path}
            href={item.path}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium transition-colors",
              isActive 
                ? "bg-accent/20 text-accent" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
};

const SearchButton = () => {
  return (
    <button 
      className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
      aria-label="Search"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </button>
  );
};

const VoiceControlButton = ({ isActive, onToggle }: { isActive: boolean, onToggle: () => void }) => {
  return (
    <button 
      onClick={onToggle}
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center transition-colors relative",
        isActive 
          ? "bg-accent/20 text-accent" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
      )}
      aria-label={isActive ? "Disable voice navigation" : "Enable voice navigation"}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
      </svg>
      
      {isActive && (
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent"></span>
      )}
    </button>
  );
};

const UserMenu = ({ user, handleSignOut, navigate, isMinimized }: any) => {
  return (
    <button 
      onClick={() => navigate('/profile')}
      className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium"
      aria-label="User menu"
    >
      {user?.email?.charAt(0).toUpperCase() || "U"}
    </button>
  );
};

const SignInButton = ({ navigate, isMinimized }: { navigate: (path: string) => void, isMinimized: boolean }) => {
  return (
    <button 
      onClick={() => navigate('/auth')}
      className={cn(
        "rounded-full bg-accent text-white transition-colors hover:bg-accent/90",
        isMinimized ? "w-8 h-8 flex items-center justify-center" : "px-3 py-1 text-sm font-medium"
      )}
    >
      {isMinimized ? "S" : "Sign In"}
    </button>
  );
};
