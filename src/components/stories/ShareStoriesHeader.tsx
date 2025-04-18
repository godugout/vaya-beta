
import { Settings, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareStoriesHeaderProps {
  onOpenTapestry: () => void;
}

export const ShareStoriesHeader = ({ onOpenTapestry }: ShareStoriesHeaderProps) => {
  return (
    <div className="w-full pt-16 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Share Your Stories</h1>
            <p className="text-muted-foreground">
              Share and preserve your cherished memories with voice recordings, photos, and written stories.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Start Recording
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={onOpenTapestry}
              className="h-10 w-10"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
