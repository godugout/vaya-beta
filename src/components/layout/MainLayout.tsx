
import React from 'react';
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
  
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 text-black dark:text-white">
      {/* Use MainNav for all pages */}
      <MainNav />
      
      <main className="flex-grow mt-20">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <Footer />
      
      <Toaster />
    </div>
  );
};
