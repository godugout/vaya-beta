
import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserJourneyProvider } from '@/contexts/UserJourneyContext';

interface AppLayoutProps {
  children?: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <UserJourneyProvider>
      {children || <Outlet />}
    </UserJourneyProvider>
  );
}
