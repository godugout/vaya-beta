
import { useState } from "react";
import { PageTransition } from "@/components/animation/PageTransition";
import StoriesHeroSection from "@/components/stories/StoriesHeroSection";
import PatelFamilyEventsSection from "@/components/stories/PatelFamilyEventsSection";
import DualPaneRecordingSection from "@/components/stories/DualPaneRecordingSection";
import RecentFamilyStories from "@/components/stories/RecentFamilyStories";

const ShareStories = () => {
  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    console.log("Memory saved:", data);
    // Here you would typically do something with the saved memory
  };

  return (
    <PageTransition location="share-stories" mode="fade">
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Patel Family Capsules */}
        <div className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StoriesHeroSection />
            
            {/* Patel Family Capsules Section */}
            <PatelFamilyEventsSection className="mt-8" />
          </div>
        </div>
        
        {/* Dual Pane Recording & Chat Interface */}
        <DualPaneRecordingSection onMemorySaved={handleMemorySaved} />
        
        {/* Stories Grid Section */}
        <div className="bg-white">
          <RecentFamilyStories />
        </div>
      </div>
    </PageTransition>
  );
}

export default ShareStories;
