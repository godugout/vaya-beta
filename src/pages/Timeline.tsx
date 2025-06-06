
import { useEffect, useState } from "react";
import { PageTransition } from "@/components/animation/PageTransition";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { TimelineView } from "@/components/timeline";
import { EmotionFilterBadges } from "@/components/timeline/EmotionFilterBadges";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Users, Plus, RefreshCcw } from "lucide-react";
import { ModernCard } from "@/components/ui/modern-card";
import { PatternBackground } from "@/components/ui/pattern-background";

const Timeline = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasFamilies, setHasFamilies] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const checkFamilies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('families')
          .select('id')
          .limit(1);
        
        if (error) throw error;
        
        setHasFamilies(data && data.length > 0);
      } catch (error: any) {
        console.error("Error checking families:", error);
        setError(error);
        setHasFamilies(null);
        
        // Don't show toast for every retry to avoid spamming the user
        if (retryCount === 0) {
          toast({
            title: "Connection issue",
            description: "Couldn't connect to the database. You can try again or check your connection.",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkFamilies();
  }, [toast, retryCount]);

  const handleRetry = () => {
    setRetryCount(count => count + 1);
  };

  return (
    <PageTransition location="timeline">
      <div className="min-h-screen bg-background">
        <PageHeader
          title="Family Timeline"
          description="Explore your family's journey through cherished memories and stories"
          background="sunshine"
          actions={
            <Button onClick={() => window.location.href = "/families"} size="lg" variant="sunshine">
              <Plus className="h-4 w-4 mr-2" />
              Add Family
            </Button>
          }
        />
        
        <SectionContainer maxWidth="7xl" className="space-y-6">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-12 w-full max-w-xl" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : error ? (
            <ModernCard variant="modern" className="p-12 text-center">
              <PatternBackground pattern="family-languages" opacity="light" />
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCcw className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connection Error</h3>
              <p className="text-muted-foreground mb-6">
                We're having trouble connecting to the database. This might be a temporary issue.
              </p>
              <Button onClick={handleRetry} variant="outline" className="gap-2">
                <RefreshCcw className="h-4 w-4" />
                Retry Connection
              </Button>
            </ModernCard>
          ) : hasFamilies ? (
            <>
              <ModernCard variant="modern" withPattern>
                <EmotionFilterBadges className="mb-0" />
              </ModernCard>
              <TimelineView />
            </>
          ) : (
            <ModernCard variant="modern" className="p-12 text-center">
              <PatternBackground pattern="family-languages" opacity="light" />
              <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Families Found</h3>
              <p className="text-muted-foreground mb-6">
                You need to create or join a family before you can see your timeline.
              </p>
              <Button onClick={() => window.location.href = "/families"} variant="sunshine">
                Go to Families
              </Button>
            </ModernCard>
          )}
        </SectionContainer>
      </div>
    </PageTransition>
  );
};

export default Timeline;
