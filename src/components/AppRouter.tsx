
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import StoryRecordingPage from '@/pages/StoryRecordingPage';
import SacredVoiceExperience from '@/pages/SacredVoiceExperience';
import DesignSystem from '@/pages/DesignSystem';
import { PageTransition } from '@/components/animation/PageTransition';

export const AppRouter: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition location={location.pathname} mode="fade">
        <Routes location={location}>
          <Route path="/" element={<StoryRecordingPage />} />
          <Route path="/sacred-voice" element={<SacredVoiceExperience />} />
          <Route path="/design-system/*" element={<DesignSystem />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
};
