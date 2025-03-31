
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { UserJourneyProvider } from '@/contexts/UserJourneyContext';
import { NavigationTransitionWrapper } from '@/components/animation/NavigationTransitionWrapper';
import { HanumanTopNav } from '@/components/navigation/HanumanTopNav';
import { PageTransition } from '@/components/animation/PageTransition';
import { OnboardingController } from '@/components/onboarding/OnboardingController';

export function AppLayout() {
  const location = useLocation();
  const isHanumanRoute = location.pathname.includes('hanuman');

  // Apply appropriate theme class based on route
  useEffect(() => {
    if (isHanumanRoute) {
      document.body.classList.add('hanuman-theme');
    } else {
      document.body.classList.remove('hanuman-theme');
    }
    
    return () => {
      document.body.classList.remove('hanuman-theme');
    };
  }, [isHanumanRoute]);

  return (
    <UserJourneyProvider>
      {isHanumanRoute && <HanumanTopNav />}
      
      <NavigationTransitionWrapper 
        locationKey={location.pathname}
        transitionType={isHanumanRoute ? 'sacred' : 'standard'}
      >
        <PageTransition location={location.pathname} mode={isHanumanRoute ? 'scale' : 'fade'}>
          <Outlet />
        </PageTransition>
      </NavigationTransitionWrapper>
      
      <OnboardingController />
    </UserJourneyProvider>
  );
}
