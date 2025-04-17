
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/animation/PageTransition";
import { Button } from "@/components/ui/button";
import { Settings, Search } from "lucide-react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { StaggeredContainer } from "@/components/animation/StaggeredContainer";
import { FadeIn } from "@/components/animation/FadeIn";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import { HanumanEditionOnboarding } from "@/components/onboarding/HanumanEditionOnboarding";
import FamilyStoryCard from "@/components/stories/FamilyStoryCard";

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

  const recentStories = [
    {
      id: "1",
      title: "Grandma's First Day in America",
      description: "Maria shares the story of her grandmother's first day in America after immigrating in 1965.",
      author: "Maria"
    },
    {
      id: "2",
      title: "Dad's College Adventures",
      description: "James recorded his father's hilarious stories about his wild college years during the 1980s.",
      author: "James"
    },
    {
      id: "3",
      title: "Our Wedding Day",
      description: "David and Sarah recorded memories from their grandparents about their wedding day 60 years ago.",
      author: "David"
    }
  ];

  return (
    <PageTransition location="share-stories" mode="fade">
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          {/* Hero Section */}
          <div className="w-full pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/50">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">
                  Share Your Stories
                </h1>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowOnboarding(true)}
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Family Settings</span>
                </Button>
              </div>
              
              <div className="mt-16 mb-16 text-center max-w-3xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  Your Family's Story Matters
                </motion.h2>
                <p className="text-lg mb-8 text-muted-foreground">
                  Share and preserve your cherished memories with voice recordings, photos, and written stories 
                  that will be treasured for generations.
                </p>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Start Recording
                </Button>
              </div>
            </div>
          </div>
          
          {/* Capsules Section */}
          <div className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Capsules</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search capsules..." 
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {["Family Traditions", "Summer Vacation", "Holiday Memories", "Wedding Stories"].map((capsule, index) => (
                  <Card key={index} className={`${
                    index === 0 ? "bg-purple-50 dark:bg-purple-900/20" : 
                    index === 1 ? "bg-blue-50 dark:bg-blue-900/20" : 
                    index === 2 ? "bg-green-50 dark:bg-green-900/20" : 
                    "bg-blue-50 dark:bg-blue-900/20"
                  } border border-border`}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <h3 className="font-medium">{capsule}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          index === 1 ? "bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-300" : 
                          index === 2 ? "bg-yellow-100 dark:bg-yellow-800/40 text-yellow-700 dark:text-yellow-300" : 
                          index === 3 ? "bg-green-100 dark:bg-green-800/40 text-green-700 dark:text-green-300" : 
                          "bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-300"
                        }`}>
                          {index === 2 ? "locked" : "upcoming"}
                        </span>
                      </div>
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        index === 0 ? "bg-purple-100 dark:bg-purple-800/30" : 
                        index === 1 ? "bg-blue-100 dark:bg-blue-800/30" : 
                        index === 2 ? "bg-yellow-100 dark:bg-yellow-800/30" : 
                        "bg-blue-100 dark:bg-blue-800/30"
                      }`}>
                        <span className="text-lg">
                          {index === 0 ? "👨‍👩‍👧‍👦" : 
                           index === 1 ? "🌴" : 
                           index === 2 ? "🔒" : 
                           "💍"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recording Section */}
          <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Record Your Family Stories</h2>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-center">
                  {/* Chat section or preview would go here */}
                  <div className="text-center text-muted-foreground">
                    <p className="mb-4">Share your story...</p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="17 8 21 12 17 16"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Family Stories */}
          <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Recent Family Stories</h2>
              <StaggeredContainer animation="fade" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentStories.map((story) => (
                  <FamilyStoryCard 
                    key={story.id}
                    title={story.title}
                    description={story.description}
                    author={story.author}
                  />
                ))}
              </StaggeredContainer>
            </div>
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
