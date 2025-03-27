
import React, { useEffect } from 'react';
import { HanumanTopNav } from '@/components/navigation/HanumanTopNav';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from "@/components/ui/toaster";
import { useLocation } from 'react-router-dom';
import { useActivityTracking, ActivityTypes } from '@/hooks/useActivityTracking';
import { useSoftTheme } from '@/contexts/SoftThemeContext';
import { usePremiumTheme } from '@/contexts/PremiumThemeContext';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import EnhancedHanumanBackground from '@/components/hanuman/EnhancedHanumanBackground';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className = "" }: MainLayoutProps) => {
  const location = useLocation();
  const { trackActivity } = useActivityTracking();
  const { softTheme } = useSoftTheme();
  const { premiumTheme } = usePremiumTheme();
  const { user, signOut } = useSupabaseAuth();
  const isSoftTheme = softTheme === 'soft';
  const isPremiumTheme = premiumTheme === 'premium';
  const isHanumanPage = location.pathname.includes('hanuman');
  
  // Track page views
  React.useEffect(() => {
    // Fixed: removed the .catch() call since trackActivity returns void
    trackActivity(ActivityTypes.PAGE_VIEW, {
      path: location.pathname,
      search: location.search,
      title: document.title
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

  // Apply the appropriate theme class to body
  useEffect(() => {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    
    if (isHanumanPage) {
      document.body.classList.add('hanuman-theme');
    } else {
      document.body.classList.remove('hanuman-theme');
    }
    
    return () => {
      document.body.classList.remove('light', 'dark', 'hanuman-theme');
      document.body.classList.add('dark');
    };
  }, [isHanumanPage]);
  
  return (
    <div className={`flex flex-col min-h-screen ${isPremiumTheme ? 'premium-theme-bg' : isHanumanPage ? 'bg-hanuman-dark' : 'bg-black'} text-white`}>
      {/* Background elements based on theme */}
      <div className="fixed inset-0 pointer-events-none">
        {isPremiumTheme ? (
          <div className="absolute inset-0 overflow-hidden">
            {/* Premium theme background with gradient and effects similar to create-family */}
            <div className="w-full h-full bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-green-900/15">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-hanuman-primary/10 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-hanuman-accent/10 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-hanuman-saffron/5 blur-3xl rounded-full"></div>
              
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.15\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
            </div>
          </div>
        ) : isHanumanPage ? (
          <EnhancedHanumanBackground />
        ) : (
          <div>
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
        )}
      </div>
      
      {/* Main navigation */}
      <HanumanTopNav 
        user={user} 
        handleSignOut={handleSignOut} 
        isSimplifiedView={isSoftTheme}
      />
      
      {/* Content area - add padding-top to account for fixed header */}
      <main className={`flex-grow pt-24 ${isPremiumTheme ? 'premium-theme-content' : ''} ${className}`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <Footer />
      
      <Toaster />
    </div>
  );
};
