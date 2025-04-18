
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/animation/PageTransition";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useStories } from "@/components/stories/useStories";
import { useCapsules } from "@/components/capsule/useCapsules";
import { FamilyTapestry } from "@/components/family/FamilyTapestry";
import { ShareStoriesHeader } from "@/components/stories/ShareStoriesHeader";
import { CapsuleSection } from "@/components/stories/CapsuleSection";
import { RecordingSection } from "@/components/stories/RecordingSection";
import { StoriesSection } from "@/components/stories/StoriesSection";

const ShareStories = () => {
  const [showTapestry, setShowTapestry] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { 
    data: storiesData, 
    isLoading: isLoadingStories 
  } = useStories();
  
  const { 
    data: capsulesData, 
    isLoading: isLoadingCapsules 
  } = useCapsules(["upcoming", "active"]);
  
  const stories = storiesData?.pages.flatMap(page => page.stories) || [];
  const filteredStories = searchQuery
    ? stories.filter(story => 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (story.description && story.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : stories;

  const capsules = capsulesData?.pages.flatMap(page => page.capsules) || [];

  return (
    <PageTransition location="share-stories" mode="fade">
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          <ShareStoriesHeader onOpenTapestry={() => setShowTapestry(true)} />
          <CapsuleSection capsules={capsules} isLoading={isLoadingCapsules} />
          <RecordingSection />
          <StoriesSection 
            stories={filteredStories}
            isLoading={isLoadingStories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <FamilyTapestry 
            isOpen={showTapestry} 
            onClose={() => setShowTapestry(false)} 
          />
        </div>
      </LanguageProvider>
    </PageTransition>
  );
};

export default ShareStories;
