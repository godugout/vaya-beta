
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/animation/PageTransition";
import StoriesHeroSection from "@/components/stories/StoriesHeroSection";
import PatelFamilyEventsSection from "@/components/stories/PatelFamilyEventsSection";
import DualPaneRecordingSection from "@/components/stories/DualPaneRecordingSection";
import RecentFamilyStories from "@/components/stories/RecentFamilyStories";
import { HanumanEditionOnboarding } from "@/components/onboarding/HanumanEditionOnboarding";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { LanguageProvider } from "@/contexts/LanguageContext";

const ShareStories = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [preferredEdition, setPreferredEdition] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user has a preferred edition
    const edition = localStorage.getItem("preferredEdition");
    setPreferredEdition(edition);
  }, []);
  
  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    console.log("Memory saved:", data);
    // Here you would typically do something with the saved memory
  };

  return (
    <PageTransition location="share-stories" mode="fade">
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Hero Section with Patel Family Capsules */}
          <div className="bg-white dark:bg-gray-800 py-12 border-b border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {preferredEdition === "hanuman" ? "Share Your Stories - Hanuman Edition" : "Share Your Stories"}
                </h1>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowOnboarding(true)}
                  className="flex items-center gap-2 bg-white dark:bg-gray-700"
                >
                  <Settings className="w-4 h-4" />
                  <span>Family Settings</span>
                </Button>
              </div>
              
              <StoriesHeroSection />
              
              {/* Patel Family Capsules Section */}
              <PatelFamilyEventsSection className="mt-8" />
            </div>
          </div>
          
          {/* Dual Pane Recording & Chat Interface */}
          <div className="bg-gray-50 dark:bg-gray-900 py-12">
            <DualPaneRecordingSection onMemorySaved={handleMemorySaved} />
          </div>
          
          {/* Stories Grid Section */}
          <div className="bg-white dark:bg-gray-800">
            <RecentFamilyStories />
          </div>
          
          {/* Hanuman Edition Onboarding */}
          <HanumanEditionOnboarding 
            open={showOnboarding} 
            onOpenChange={setShowOnboarding} 
          />
        </div>
      </LanguageProvider>
    </PageTransition>
  );
}

export default ShareStories;
