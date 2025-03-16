
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { MainNav } from '@/components/MainNav';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from "@/components/ui/toaster";
import { MobileBottomNav } from '@/components/nav/MobileBottomNav';
import { MobileTopNav } from '@/components/nav/MobileTopNav';
import { DesktopNav } from '@/components/nav/DesktopNav';
import { useNavigate, useLocation } from 'react-router-dom';
import { useActivityTracking, ActivityTypes } from '@/hooks/useActivityTracking';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className = "" }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { trackActivity } = useActivityTracking();
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  // Track page views
  useEffect(() => {
    trackActivity(ActivityTypes.PAGE_VIEW, {
      path: location.pathname,
      search: location.search,
      title: document.title
    });
  }, [location.pathname, location.search, trackActivity]);
  
  // Get the current user
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const handleVoiceToggle = () => {
    setIsVoiceActive(prev => !prev);
    trackActivity(ActivityTypes.FEATURE_USED, { 
      feature: 'voice_navigation',
      action: !isVoiceActive ? 'enabled' : 'disabled'
    });
  };
  
  const handleSettingsToggle = () => {
    setIsSimplifiedView(prev => !prev);
    trackActivity(ActivityTypes.SETTINGS_CHANGED, {
      setting: 'simplified_view',
      value: !isSimplifiedView
    });
  };
  
  const handleSignOut = async () => {
    // Track logout before signing out
    trackActivity(ActivityTypes.LOGOUT);
    
    // Actual sign out functionality
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error);
    navigate("/auth");
    return Promise.resolve();
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Mobile Top Navigation */}
      <MobileTopNav 
        user={user} 
        handleSignOut={handleSignOut} 
        navigate={navigate}
        isSimplifiedView={isSimplifiedView}
        onSettingsToggle={handleSettingsToggle}
      />
      
      {/* Desktop Navigation */}
      <DesktopNav 
        user={user} 
        handleSignOut={handleSignOut} 
        navigate={navigate}
        isSimplifiedView={isSimplifiedView}
        isVoiceActive={isVoiceActive}
        onVoiceToggle={handleVoiceToggle}
      />
      
      {/* Voice Navigation Banner - show when voice is active */}
      {isVoiceActive && (
        <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-autumn text-white flex items-center justify-center">
              <span className="text-xs">Om</span>
            </div>
            <span className="text-sm font-medium">Hanuman voice navigation active</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-400">Listening...</span>
          </div>
        </div>
      )}
      
      <main className={`flex-grow pt-16 ${className}`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <Footer />
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        user={user} 
        navigate={navigate}
        isSimplifiedView={isSimplifiedView}
        isVoiceActive={isVoiceActive}
        onVoiceToggle={handleVoiceToggle}
      />
      
      <Toaster />
    </div>
  );
};
