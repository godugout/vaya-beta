
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { FadeIn } from '@/components/animation/FadeIn';
import StoriesHeader from "@/components/stories/StoriesHeader";
import StoriesHeroSection from "@/components/stories/StoriesHeroSection";
import ShareStories from "@/components/stories/ShareStories";
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
          <div className="md:w-1/2">
            <StoriesHeroSection />
          </div>

          {/* Right Column - Recording Interface */}
          <div className="md:w-1/2">
            <ShareStories />
          </div>
        </div>

        {/* Family Events Table */}
        <PatelFamilyEventsSection />

        {/* Recent Stories Grid */}
        <RecentFamilyStories />
      </div>
    </MainLayout>
  );
}
