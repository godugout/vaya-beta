
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animation/FadeIn";
import { Calendar, Users, Book, Camera, Clock, Heart } from "lucide-react";
import FamilyStoriesSection from "@/components/stories/FamilyStoriesSection";
import FamilyCapsuleList from "@/components/family/FamilyCapsuleList";
import { supabase } from "@/integrations/supabase/client";

interface FamilyCount {
  count: number;
}

interface MemoryCount {
  count: number;
}

interface StoryCount {
  count: number;
}

const Index = () => {
  const navigate = useNavigate();
  const [familyCount, setFamilyCount] = useState<number>(0);
  const [memoryCount, setMemoryCount] = useState<number>(0);
  const [storyCount, setStoryCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Get family count
        const { data: familyData, error: familyError } = await supabase
          .from('families')
          .select('count');
        
        if (familyError) throw familyError;
        if (familyData && familyData.length > 0) {
          setFamilyCount((familyData[0] as FamilyCount).count);
        }
        
        // Get memory count
        const { data: memoryData, error: memoryError } = await supabase
          .from('memories')
          .select('count');
        
        if (memoryError) throw memoryError;
        if (memoryData && memoryData.length > 0) {
          setMemoryCount((memoryData[0] as MemoryCount).count);
        }
        
        // Get story count
        const { data: storyData, error: storyError } = await supabase
          .from('stories')
          .select('count');
        
        if (storyError) throw storyError;
        if (storyData && storyData.length > 0) {
          setStoryCount((storyData[0] as StoryCount).count);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(145,200,180,0.2)_0,rgba(145,200,180,0)_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(45,100,90,0.2)_0,rgba(45,100,90,0)_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-forest to-autumn">
                Preserve Your Family Legacy
              </h1>
              <p className="mt-6 text-xl max-w-3xl mx-auto text-muted-foreground">
                Capture the moments, memories, and stories that make your family unique. Keep your family history alive for generations to come.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/memory-lane')}
                  className="bg-forest hover:bg-forest/90"
                >
                  Start Preserving Memories
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/families')}
                >
                  Explore Your Family Tree
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-12 px-4 sm:px-6 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm text-center">
                <Users className="h-10 w-10 mx-auto text-forest mb-4" />
                <h3 className="text-3xl font-bold">{isLoading ? '...' : familyCount}</h3>
                <p className="text-muted-foreground">Families</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm text-center">
                <Camera className="h-10 w-10 mx-auto text-forest mb-4" />
                <h3 className="text-3xl font-bold">{isLoading ? '...' : memoryCount}</h3>
                <p className="text-muted-foreground">Memories Preserved</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm text-center">
                <Book className="h-10 w-10 mx-auto text-forest mb-4" />
                <h3 className="text-3xl font-bold">{isLoading ? '...' : storyCount}</h3>
                <p className="text-muted-foreground">Stories Shared</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Recent Stories */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <FamilyStoriesSection limit={3} />
        </div>
      </section>

      {/* Featured Capsules */}
      <section className="py-16 px-4 sm:px-6 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <FamilyCapsuleList limit={3} />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">
              Preserve What Matters Most
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm text-center">
                <Heart className="h-10 w-10 mx-auto text-forest mb-4" />
                <h3 className="text-xl font-semibold mb-2">Family Memories</h3>
                <p className="text-muted-foreground">
                  Save photos, audio recordings, and written memories in one secure place.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm text-center">
                <Clock className="h-10 w-10 mx-auto text-forest mb-4" />
                <h3 className="text-xl font-semibold mb-2">Time Capsules</h3>
                <p className="text-muted-foreground">
                  Create digital time capsules to be opened on special occasions.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm text-center">
                <Calendar className="h-10 w-10 mx-auto text-forest mb-4" />
                <h3 className="text-xl font-semibold mb-2">Family Timeline</h3>
                <p className="text-muted-foreground">
                  Organize memories and stories chronologically across generations.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Index;
