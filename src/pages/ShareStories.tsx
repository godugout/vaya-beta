
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/animation/PageTransition";
import { Button } from "@/components/ui/button";
import { Settings, Search } from "lucide-react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StaggeredContainer } from "@/components/animation/StaggeredContainer";
import { FadeIn } from "@/components/animation/FadeIn";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import { HanumanEditionOnboarding } from "@/components/onboarding/HanumanEditionOnboarding";
import FamilyStoryCard from "@/components/stories/FamilyStoryCard";
import ShareStoriesComponent from "@/components/stories/ShareStories";
import { useStories } from "@/components/stories/useStories";
import { useCapsules } from "@/components/capsule/useCapsules";
import { LoadingIndicator } from "@/components/animation/LoadingIndicator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ShareStories = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [preferredEdition, setPreferredEdition] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const { 
    data: storiesData, 
    isLoading: isLoadingStories 
  } = useStories();
  
  const { 
    data: capsulesData, 
    isLoading: isLoadingCapsules 
  } = useCapsules(["upcoming", "active"]);
  
  useEffect(() => {
    // Check if user has a preferred edition
    const edition = localStorage.getItem("preferredEdition");
    setPreferredEdition(edition);
  }, []);
  
  const handleMemorySaved = async (data: { audioUrl?: string; transcription?: string }) => {
    try {
      // Check if user is authenticated
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData || !userData.user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please log in to save your story.",
        });
        return;
      }

      if (data.audioUrl && data.transcription) {
        // Save as story
        const { error } = await supabase
          .from('stories')
          .insert({
            title: data.transcription.substring(0, 100) || "New Story",
            description: data.transcription,
            audio_url: data.audioUrl,
            story_type: "audio",
            author_id: userData.user.id,
          });

        if (error) {
          throw error;
        }

        toast({
          title: "Story saved",
          description: "Your story has been saved successfully.",
        });
      }
    } catch (error) {
      console.error("Error saving story:", error);
      toast({
        variant: "destructive",
        title: "Error saving story",
        description: "There was a problem saving your story. Please try again.",
      });
    }
  };

  // Filter stories based on search query
  const stories = storiesData?.pages.flatMap(page => page.stories) || [];
  const filteredStories = searchQuery
    ? stories.filter(story => 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (story.description && story.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : stories;

  // Get active capsules
  const capsules = capsulesData?.pages.flatMap(page => page.capsules) || [];

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
                <FadeIn>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Your Family's Story Matters
                  </h2>
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
                </FadeIn>
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
              
              {isLoadingCapsules ? (
                <div className="flex justify-center py-12">
                  <LoadingIndicator size="lg" />
                </div>
              ) : capsules.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No capsules available. Create your first capsule now!</p>
                  <Button className="mt-4" onClick={() => window.location.href = "/family-capsules"}>
                    Create Capsule
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {capsules.slice(0, 4).map((capsule) => (
                    <Card key={capsule.id} className={`
                      ${capsule.status === 'upcoming' ? "bg-purple-50 dark:bg-purple-900/20" : 
                        capsule.status === 'active' ? "bg-blue-50 dark:bg-blue-900/20" : 
                        "bg-green-50 dark:bg-green-900/20"} 
                      border border-border`}
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">{capsule.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            capsule.status === 'active' ? "bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-300" : 
                            capsule.status === 'locked' ? "bg-yellow-100 dark:bg-yellow-800/40 text-yellow-700 dark:text-yellow-300" : 
                            "bg-green-100 dark:bg-green-800/40 text-green-700 dark:text-green-300"
                          }`}>
                            {capsule.status}
                          </span>
                        </div>
                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-800/30">
                          <span className="text-lg">
                            {capsule.status === 'upcoming' ? "👨‍👩‍👧‍👦" : 
                             capsule.status === 'active' ? "🌴" : 
                             capsule.status === 'locked' ? "🔒" : 
                             "💍"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
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
                <div className="bg-card border border-border rounded-lg p-6">
                  <ShareStoriesComponent />
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Family Stories */}
          <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Recent Family Stories</h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search stories..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {isLoadingStories ? (
                <div className="flex justify-center py-12">
                  <LoadingIndicator size="lg" />
                </div>
              ) : filteredStories.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {searchQuery ? "No stories found matching your search" : "No stories available yet. Share your first story!"}
                  </p>
                </div>
              ) : (
                <StaggeredContainer animation="fade" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredStories.slice(0, 6).map((story) => (
                    <FamilyStoryCard 
                      key={story.id}
                      title={story.title}
                      description={story.description || ""}
                      author={story.author_id || "Family Member"}
                      audioUrl={story.audio_url}
                      storyId={story.id}
                    />
                  ))}
                </StaggeredContainer>
              )}
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
};

export default ShareStories;
