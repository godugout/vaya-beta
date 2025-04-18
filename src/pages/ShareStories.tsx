
import { useState, useRef } from "react";
import { PageTransition } from "@/components/animation/PageTransition";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useStories } from "@/components/stories/useStories";
import { FamilyTapestry } from "@/components/family/FamilyTapestry";
import { ShareStoriesHeader } from "@/components/stories/ShareStoriesHeader";
import { RecordingSection } from "@/components/stories/RecordingSection";
import { StoriesSection } from "@/components/stories/StoriesSection";

const ShareStories = () => {
  const [showTapestry, setShowTapestry] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const recordingSectionRef = useRef<HTMLDivElement>(null);
  
  const { 
    data: storiesData, 
    isLoading: isLoadingStories 
  } = useStories();
  
  const stories = storiesData?.pages.flatMap(page => page.stories) || [];
  const filteredStories = searchQuery
    ? stories.filter(story => 
        story.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (story.description && story.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : stories;
  
  const handleStartRecording = () => {
    recordingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageTransition location="share-stories" mode="fade">
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          <ShareStoriesHeader 
            onOpenTapestry={() => setShowTapestry(true)} 
            onStartRecording={handleStartRecording}
          />
          
          <div ref={recordingSectionRef}>
            <RecordingSection />
          </div>
          
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
