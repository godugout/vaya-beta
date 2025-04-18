
import { VoiceStoryRecorder } from "./VoiceStoryRecorder";

export const RecordingSection = () => {
  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Share Your Family Stories</h2>
          <p className="text-muted-foreground">
            Preserve your family's heritage through voice stories. Record, transcribe, and share your memories with loved ones.
          </p>
        </div>
        
        <VoiceStoryRecorder />
      </div>
    </div>
  );
};
