
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SimpleLayout } from './layout/SimpleLayout';
import { HomePage } from '@/pages/HomePage';
import { RecordStoryPage } from '@/pages/RecordStoryPage';
import { ViewStoriesPage } from '@/pages/ViewStoriesPage';
import { ProfilePage } from '@/pages/ProfilePage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <SimpleLayout>
            <HomePage />
          </SimpleLayout>
        } 
      />
      <Route 
        path="/record" 
        element={
          <SimpleLayout>
            <RecordStoryPage />
          </SimpleLayout>
        } 
      />
      <Route 
        path="/stories" 
        element={
          <SimpleLayout>
            <ViewStoriesPage />
          </SimpleLayout>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <SimpleLayout>
            <ProfilePage />
          </SimpleLayout>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
