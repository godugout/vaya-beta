
import React, { useEffect } from 'react';
import { MainNav } from '@/components/MainNav';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from "@/components/ui/toaster";
import { useLocation } from 'react-router-dom';
import { useActivityTracking, ActivityTypes } from '@/hooks/useActivityTracking';
import { useTheme } from '@/contexts/ThemeContext';
import { useSoftTheme } from '@/contexts/SoftThemeContext';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className = "" }: MainLayoutProps) => {
  const location = useLocation();
  const { trackActivity } = useActivityTracking();
  const { theme } = useTheme();
  const { softTheme } = useSoftTheme();
  const isSoftTheme = softTheme === 'soft';
  
  // Track page views
  React.useEffect(() => {
    trackActivity(ActivityTypes.PAGE_VIEW, {
      path: location.pathname,
      search: location.search,
      title: document.title
    }).catch(error => {
      console.error("Failed to track activity:", error);
      // Silently fail as this isn't critical functionality
    });
  }, [location.pathname, location.search, trackActivity]);

  // Apply the theme class to body
  useEffect(() => {
    document.body.classList.add('star-bg', 'nebula-effect');
    
    // Apply theme class to body
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    
    return () => {
      document.body.classList.remove('star-bg', 'nebula-effect', 'light', 'dark');
    };
  }, [theme]);
  
  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Fixed header area with cosmic theme */}
      <div className={`cosmic-nav fixed top-0 left-0 right-0 z-[100] ${isSoftTheme ? 'bg-[var(--soft-bg-primary)]' : ''}`}>
        <MainNav />
      </div>
      
      {/* Theme toggle controls */}
      <div className="fixed top-20 right-4 z-[101]">
        <ThemeToggle showSoftToggle={true} />
      </div>
      
      {/* Content area with proper spacing to avoid overlap with fixed header */}
      <main className={`flex-grow mt-48 sm:mt-40 pt-6 relative z-content container mx-auto px-4 ${className} ${isSoftTheme ? 'bg-[var(--soft-bg-primary)] text-[var(--soft-text-primary)]' : ''}`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <Footer />
      
      <Toaster />
    </div>
  );
};
