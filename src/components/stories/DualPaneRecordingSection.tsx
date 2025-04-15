
import { Card, CardContent } from "@/components/ui/card";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import NarraChat from "@/components/NarraChat";
import { FadeIn } from "@/components/animation/FadeIn";
import { motion } from "framer-motion";

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
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-md border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-forest to-leaf" />
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-forest dark:text-leaf mb-6">
                    Record Your Family Stories
                  </h2>
                  <VoiceRecordingExperience onMemorySaved={onMemorySaved} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Right Pane: Narra Chat */}
          <div>
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-md border-gray-200 dark:border-gray-800 h-full overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-water to-mountain" />
                <CardContent className="p-0 h-full">
                  <NarraChat />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default DualPaneRecordingSection;
