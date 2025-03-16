
import React from 'react';
import { FadeIn } from '@/components/animation/FadeIn';
import ShareStories from "@/components/stories/ShareStories";

export const DualPaneRecordingSection = () => {
  return (
    <FadeIn className="md:w-1/2 lg:w-2/5">
      <ShareStories />
    </FadeIn>
  );
};

export default DualPaneRecordingSection;
