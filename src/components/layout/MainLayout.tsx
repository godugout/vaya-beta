
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
import { VoiceFeedbackIndicator } from '@/components/feedback/VoiceFeedbackIndicator';
import { useVoiceInteraction } from '@/contexts/VoiceInteractionContext';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { WeddingModeTransition } from '@/components/wedding-mode/WeddingModeTransition';
import { useUserJourney } from '@/contexts/UserJourneyContext';
import { SimplifiedNavigation } from '@/components/accessibility/SimplifiedNavigation';
import { MobilePhoneMockup } from '@/components/layout/MobilePhoneMockup';
import { cn } from '@/lib/utils';

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
  const { voiceEnabled, accessibilityMode, userExperienceLevel } = useVoiceInteraction();
  const { isListening, transcript } = useVoiceCommands(voiceEnabled);
  const { showWeddingTransition } = useUserJourney();
  
  const isSoftTheme = softTheme === 'soft';
  const isPremiumTheme = premiumTheme === 'premium';
  const isHanumanPage = location.pathname.includes('hanuman');
  const isSimplifiedMode = accessibilityMode === 'simplified';
  
  React.useEffect(() => {
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

  useEffect(() => {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    
    if (isHanumanPage) {
      document.body.classList.add('hanuman-theme');
    } else {
      document.body.classList.remove('hanuman-theme');
    }
    
    if (accessibilityMode === 'high-contrast') {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    if (isSimplifiedMode) {
      document.body.classList.add('simplified-mode');
    } else {
      document.body.classList.remove('simplified-mode');
    }
    
    return () => {
      document.body.classList.remove('light', 'dark', 'hanuman-theme', 'high-contrast', 'simplified-mode');
      document.body.classList.add('dark');
    };
  }, [isHanumanPage, accessibilityMode, isSimplifiedMode]);
  
  const svgPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <MobilePhoneMockup>
      <div className={cn(
        "relative min-h-full",
        isPremiumTheme ? 'premium-theme-bg' : isHanumanPage ? 'bg-hanuman-dark' : 'bg-black',
        'text-white'
      )}>
        <VoiceFeedbackIndicator 
          status={isListening ? 'listening' : 'idle'}
          transcript={transcript}
          position={isSimplifiedMode ? 'top' : 'float'}
        />
        
        <WeddingModeTransition />
        
        <HanumanTopNav 
          user={user} 
          handleSignOut={handleSignOut} 
          isSimplifiedView={isSoftTheme || isSimplifiedMode}
        />
        
        <main className={cn("flex-grow pt-24", isPremiumTheme ? 'premium-theme-content' : '', className)}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        
        {isSimplifiedMode && (
          <div className="fixed bottom-0 left-0 right-0 p-4 z-40">
            <SimplifiedNavigation />
          </div>
        )}
        
        {!isSimplifiedMode && <Footer />}
        
        <Toaster />
      </div>
    </MobilePhoneMockup>
  );
};
