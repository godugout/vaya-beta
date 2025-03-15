
import { Card, CardContent } from "@/components/ui/card";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import NarraChat from "@/components/NarraChat";
import { FadeIn } from "@/components/animation/FadeIn";

interface DualPaneRecordingSectionProps {
  onMemorySaved?: (data: { audioUrl?: string; transcription?: string }) => void;
}

const DualPaneRecordingSection = ({ onMemorySaved }: DualPaneRecordingSectionProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Pane: Voice Recording Experience */}
          <div>
            <Card className="shadow-md border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Record Your Family Stories
                </h2>
                <VoiceRecordingExperience onMemorySaved={onMemorySaved} />
              </CardContent>
            </Card>
          </div>
          
          {/* Right Pane: Narra Chat */}
          <div>
            <Card className="shadow-md border-gray-200 h-full">
              <CardContent className="p-0 h-full">
                <NarraChat />
              </CardContent>
            </Card>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default DualPaneRecordingSection;
