
import { PageTransition } from "@/components/animation/PageTransition";
import { TimelineView } from "@/components/timeline";
import { PatternBackground } from "@/components/ui/pattern-background";
import { SlideFade } from "@/components/animation/SlideFade";
import { EmotionFilterBadges } from "@/components/timeline/EmotionFilterBadges";

const Timeline = () => {
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
            
            <EmotionFilterBadges className="mb-6" />
            <TimelineView />
          </SlideFade>
        </div>
      </PatternBackground>
    </PageTransition>
  );
};

export default Timeline;
