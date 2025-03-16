
import React, { useEffect } from 'react';
import { MainNav } from '@/components/MainNav';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from "@/components/ui/toaster";
import { useLocation } from 'react-router-dom';
import { useActivityTracking, ActivityTypes } from '@/hooks/useActivityTracking';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className = "" }: MainLayoutProps) => {
  const location = useLocation();
  const { trackActivity } = useActivityTracking();
  
  // Track page views
  React.useEffect(() => {
    trackActivity(ActivityTypes.PAGE_VIEW, {
      path: location.pathname,
      search: location.search,
      title: document.title
    });
  }, [location.pathname, location.search, trackActivity]);

  // Apply the cosmic theme class to body
  useEffect(() => {
    document.body.classList.add('star-bg', 'nebula-effect');
    
    return () => {
      document.body.classList.remove('star-bg', 'nebula-effect');
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Use MainNav for all pages with cosmic theme */}
      <div className="cosmic-nav">
        <MainNav />
      </div>
      
      <main className="flex-grow mt-20 relative z-content">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <Footer />
      
      <Toaster />
    </div>
  );
};
