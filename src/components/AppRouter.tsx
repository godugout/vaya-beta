
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SimpleLayout } from './layout/SimpleLayout';
import { AidaLayout } from './layout/AidaLayout';
import { HomePage } from '@/pages/HomePage';
import { WelcomePage } from '@/pages/WelcomePage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { ChatPage } from '@/pages/ChatPage';
import { MemoryJournalPage } from '@/pages/MemoryJournalPage';
import { RecordStoryPage } from '@/pages/RecordStoryPage';
import { ViewStoriesPage } from '@/pages/ViewStoriesPage';
import { ProfilePage } from '@/pages/ProfilePage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route 
        path="/welcome" 
        element={<WelcomePage />} 
      />
      <Route 
        path="/onboarding" 
        element={<OnboardingPage />} 
      />
      <Route 
        path="/" 
        element={
          <AidaLayout>
            <HomePage />
          </AidaLayout>
        } 
      />
      <Route 
        path="/chat" 
        element={<ChatPage />} 
      />
      <Route 
        path="/memory-journal" 
        element={<MemoryJournalPage />} 
      />
      <Route 
        path="/record" 
        element={
          <AidaLayout>
            <RecordStoryPage />
          </AidaLayout>
        } 
      />
      <Route 
        path="/stories" 
        element={
          <AidaLayout>
            <ViewStoriesPage />
          </AidaLayout>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <AidaLayout>
            <ProfilePage />
          </AidaLayout>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
