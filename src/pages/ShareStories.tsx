
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { FadeIn } from '@/components/animation/FadeIn';
import StoriesHeader from "@/components/stories/StoriesHeader";
import StoriesHeroSection from "@/components/stories/StoriesHeroSection";
import DualPaneRecordingSection from "@/components/stories/DualPaneRecordingSection";
import PatelFamilyEventsSection from "@/components/stories/PatelFamilyEventsSection";
import RecentFamilyStories from "@/components/stories/RecentFamilyStories";

export default function ShareStoriesPage() {
  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <StoriesHeader />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Feature Cards */}
          <StoriesHeroSection />

          {/* Right Column - Recording Interface */}
          <DualPaneRecordingSection />
        </div>

        {/* Family Events Table */}
        <PatelFamilyEventsSection />

        {/* Recent Stories Grid */}
        <RecentFamilyStories />
      </div>
    </MainLayout>
  );
}
