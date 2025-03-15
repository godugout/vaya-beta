
import { FadeIn } from "@/components/animation/FadeIn";
import { LoadingIndicator } from "@/components/animation/LoadingIndicator";

interface ProcessingIndicatorProps {
  isProcessing: boolean;
  isTranscribing: boolean;
}

const ProcessingIndicator = ({ isProcessing, isTranscribing }: ProcessingIndicatorProps) => {
  if (!isProcessing && !isTranscribing) return null;
  
  return (
    <FadeIn>
      <LoadingIndicator 
        variant="dots" 
        message={isProcessing ? "Saving your memory..." : "Transcribing your audio..."} 
        className="mt-4"
      />
    </FadeIn>
  );
};

export default ProcessingIndicator;
