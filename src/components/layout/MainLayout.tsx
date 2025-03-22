
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
    });
  }, [location.pathname, location.search, trackActivity]);

  // Apply the theme class to body
  useEffect(() => {
    document.body.classList.remove('light', 'dark', 'star-bg', 'nebula-effect', 'nasa-theme', 'cosmic-bg');
    document.body.classList.add(theme, 'hanuman-theme');
    
    return () => {
      document.body.classList.remove('light', 'dark', 'hanuman-theme');
    };
  }, [theme]);
  
  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Simple background with Hanuman image */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="bg-hanuman-bg opacity-5 dark:opacity-10 absolute inset-0 bg-no-repeat bg-cover bg-center"></div>
      </div>
      
      {/* Header area */}
      <header className={`sticky top-0 ${isSoftTheme ? 'bg-[var(--soft-bg-primary)]' : 'bg-background/95 backdrop-blur-sm'}`}>
        <MainNav />
      </header>
      
      {/* Theme toggle controls */}
      <div className="fixed top-20 right-4">
        <ThemeToggle />
      </div>
      
      {/* Content area with proper spacing */}
      <main className={`flex-grow pt-8 container mx-auto px-4 ${className} ${isSoftTheme ? 'bg-[var(--soft-bg-primary)] text-[var(--soft-text-primary)]' : ''}`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <Footer />
      
      <Toaster />
    </div>
  );
};
