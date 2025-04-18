
import { Message } from "@/components/chat/types";
import { Memory } from "./types";
import ImmersiveRecordingExperience from "@/components/immersive-recording/ImmersiveRecordingExperience";

interface ImmersiveRecordingWrapperProps {
  isActive: boolean;
  onComplete: (data: { audioUrl?: string; transcription?: string }) => void;
  onCancel: () => void;
}

const ImmersiveRecordingWrapper = ({
  isActive,
  onComplete,
  onCancel,
}: ImmersiveRecordingWrapperProps) => {
  if (!isActive) return null;

  return (
    <ImmersiveRecordingExperience
      onComplete={onComplete}
      onCancel={onCancel}
      guidanceText={[
        "Share your memory or story...",
        "Take your time to reflect...",
        "Your voice creates your legacy...",
        "Future generations will hear your story..."
      ]}
    />
  );
};

export default ImmersiveRecordingWrapper;
