
import { Card, CardContent } from "@/components/ui/card";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import ShareStoriesComponent from "@/components/stories/ShareStories";

export const RecordingSection = () => {
  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Record Your Family Stories</h2>
            <div className="bg-card border border-border rounded-lg p-4">
              <VoiceRecordingExperience />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <ShareStoriesComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
