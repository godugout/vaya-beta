
import { Settings, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareStoriesHeaderProps {
  onOpenTapestry: () => void;
  onStartRecording?: () => void;
}

export const ShareStoriesHeader = ({ onOpenTapestry, onStartRecording }: ShareStoriesHeaderProps) => {
  return (
    <div className="w-full pt-16 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-autumn/10 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Family Stories</h1>
            <p className="text-muted-foreground">
              Record, transcribe, and preserve your family's heritage through voice and written stories.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="autumn" 
              size="lg" 
              className="gap-2"
              onClick={onStartRecording}
            >
              <Mic className="h-5 w-5" />
              Record Story
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
