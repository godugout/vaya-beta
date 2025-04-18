import { useEffect, useState } from "react";
import { PageTransition } from "@/components/animation/PageTransition";
import { TimelineView } from "@/components/timeline";
import { PatternBackground } from "@/components/ui/pattern-background";
import { SlideFade } from "@/components/animation/SlideFade";
import { EmotionFilterBadges } from "@/components/timeline/EmotionFilterBadges";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Timeline = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasFamilies, setHasFamilies] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkFamilies = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('families')
          .select('count');
        
        if (error) {
          throw error;
        }
        
        // Check if there are any families
        if (data && data[0]?.count > 0) {
          setHasFamilies(true);
        }
      } catch (error: any) {
        console.error("Error checking families:", error);
        toast({
          title: "Error checking families",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkFamilies();
  }, [toast]);

  return (
    <PageTransition location="timeline">
      <PatternBackground pattern="sanskrit" opacity="light" className="min-h-screen">
        <div className="container mx-auto py-8 px-4">
          <SlideFade>
            <header className="mb-8 text-center md:text-left">
              <div className="max-w-2xl">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-autumn to-leaf bg-clip-text text-transparent">
                  Family Timeline
                </h1>
                <p className="text-muted-foreground mt-2">
                  Explore your family's journey through cherished memories and stories
                </p>
              </div>
            </header>
            
            {isLoading ? (
              <div className="space-y-6">
                <Skeleton className="h-12 w-full max-w-xl" />
                <Skeleton className="h-64 w-full" />
              </div>
            ) : hasFamilies ? (
              <>
                <EmotionFilterBadges className="mb-6" />
                <TimelineView />
              </>
            ) : (
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 text-center max-w-lg mx-auto">
                <h3 className="text-lg font-semibold mb-2">No Families Found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  You need to create or join a family before you can see your timeline.
                </p>
                <Button 
                  onClick={() => window.location.href = "/families"} 
                  className="bg-autumn hover:bg-autumn/90 text-white"
                >
                  Go to Families
                </Button>
              </div>
            )}
          </SlideFade>
        </div>
      </PatternBackground>
    </PageTransition>
  );
};

export default Timeline;
