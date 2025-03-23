
import React, { useEffect } from 'react';
import { HanumanTopNav } from '@/components/navigation/HanumanTopNav';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from "@/components/ui/toaster";
import { useLocation } from 'react-router-dom';
import { useActivityTracking, ActivityTypes } from '@/hooks/useActivityTracking';
import { useSoftTheme } from '@/contexts/SoftThemeContext';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className = "" }: MainLayoutProps) => {
  const location = useLocation();
  const { trackActivity } = useActivityTracking();
  const { softTheme } = useSoftTheme();
  const { user, signOut } = useSupabaseAuth();
  const isSoftTheme = softTheme === 'soft';
  
  // Track page views
  React.useEffect(() => {
    trackActivity(ActivityTypes.PAGE_VIEW, {
      path: location.pathname,
      search: location.search,
      title: document.title
    }).catch(error => {
      console.error("Failed to track activity:", error);
    });
  }, [location.pathname, location.search, trackActivity]);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Apply the dark theme class to body
  useEffect(() => {
    document.body.classList.remove('light');
    document.body.classList.add('dark', 'hanuman-theme');
    
    return () => {
      document.body.classList.remove('light', 'dark', 'hanuman-theme');
      document.body.classList.add('dark');
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-hanuman-dark text-white">
      {/* Cosmic background with Hanuman image */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="bg-hanuman-bg absolute inset-0 bg-no-repeat bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-dots bg-repeat opacity-5"></div>
        
        {/* Subtle star-like dots for cosmic feel */}
        <div className="absolute inset-0" 
          style={{ 
            backgroundImage: `radial-gradient(1px 1px at 10% 10%, rgba(255, 255, 255, 0.15) 0%, transparent 100%),
                              radial-gradient(1px 1px at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 100%),
                              radial-gradient(1px 1px at 50% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 100%),
                              radial-gradient(1px 1px at 70% 40%, rgba(255, 255, 255, 0.15) 0%, transparent 100%),
                              radial-gradient(1px 1px at 90% 90%, rgba(255, 255, 255, 0.15) 0%, transparent 100%)`,
            backgroundSize: '100px 100px, 120px 120px, 170px 170px, 150px 150px, 200px 200px',
            backgroundAttachment: 'fixed'
          }}
        />
      </div>
      
      {/* Main navigation */}
      <HanumanTopNav 
        user={user} 
        handleSignOut={handleSignOut} 
        isSimplifiedView={isSoftTheme}
      />
      
      {/* Content area - add padding-top to account for fixed header */}
      <main className={`flex-grow pt-24 ${className}`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <Footer />
      
      <Toaster />
    </div>
  );
};
