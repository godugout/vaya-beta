
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
import { Rocket, Clock } from 'lucide-react';

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
  const isNasaTheme = document.body.classList.contains('nasa-theme');
  
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
    document.body.classList.add('star-bg', 'nebula-effect');
    
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    
    return () => {
      document.body.classList.remove('star-bg', 'nebula-effect', 'light', 'dark');
    };
  }, [theme]);
  
  // Toggle NASA theme function
  const toggleNasaTheme = () => {
    if (isNasaTheme) {
      document.body.classList.remove('nasa-theme', 'cosmic-bg');
      const starsContainer = document.querySelector('.stars-container');
      if (starsContainer) {
        document.body.removeChild(starsContainer);
      }
    } else {
      document.body.classList.add('nasa-theme', 'cosmic-bg');
      
      // Create stars background
      const createStars = () => {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';
        starsContainer.style.position = 'fixed';
        starsContainer.style.top = '0';
        starsContainer.style.left = '0';
        starsContainer.style.width = '100%';
        starsContainer.style.height = '100%';
        starsContainer.style.zIndex = '-1';
        starsContainer.style.overflow = 'hidden';
        
        for (let i = 0; i < 100; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          starsContainer.appendChild(star);
        }
        
        document.body.appendChild(starsContainer);
      };
      
      createStars();
    }
  };
  
  // Calculate current mission time
  const [missionTime, setMissionTime] = React.useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setMissionTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Fixed header area with cosmic theme */}
      <div className={`cosmic-nav fixed top-0 left-0 right-0 z-[100] ${isSoftTheme ? 'bg-[var(--soft-bg-primary)]' : ''} ${isNasaTheme ? 'space-glass blue-glow' : ''}`}>
        <MainNav />
      </div>
      
      {/* Theme toggle controls - simplified and positioned better */}
      <div className="fixed top-20 right-4 z-[101]">
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          <button 
            onClick={toggleNasaTheme}
            className={`p-2 rounded-full transition-colors ${isNasaTheme ? 'bg-nasa-blue text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
            title={isNasaTheme ? "Disable NASA Theme" : "Enable NASA Theme"}
          >
            <Rocket className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Mission timer for NASA theme */}
      {isNasaTheme && (
        <div className="fixed top-20 left-4 z-[101] font-mono text-sm text-space-light-blue">
          <div className="terminal-text p-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>MISSION TIME: {missionTime}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>STATUS: ONLINE</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Content area with proper spacing */}
      <main className={`flex-grow mt-32 pt-4 relative z-content container mx-auto px-4 ${className} ${isSoftTheme ? 'bg-[var(--soft-bg-primary)] text-[var(--soft-text-primary)]' : ''}`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <Footer />
      
      <Toaster />
    </div>
  );
};
