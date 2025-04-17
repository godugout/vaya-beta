
import { PageTransition } from "@/components/animation/PageTransition";
import { TimelineView } from "@/components/timeline";

const Timeline = () => {
  return (
    <PageTransition location="timeline">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Family Timeline</h1>
          <p className="text-muted-foreground">
            Explore your family memories and stories organized chronologically
          </p>
        </div>
        
        <TimelineView />
      </div>
    </PageTransition>
  );
};

export default Timeline;
