
interface RecordingStatusProps {
  isRecordingActive: boolean;
  hasAudioBlob: boolean;
}

const RecordingStatus = ({ isRecordingActive, hasAudioBlob }: RecordingStatusProps) => {
  return (
    <div className="text-center">
      <h3 className={`text-lg font-medium ${
        isRecordingActive 
          ? "text-[#FF7675]" 
          : hasAudioBlob 
            ? "text-[#6C5CE7]" 
            : "text-dark-text-primary"
      }`}>
        {isRecordingActive 
          ? "Recording..." 
          : hasAudioBlob 
            ? "Review Your Memory" 
            : "Record Your Memory"}
      </h3>
      <p className="text-sm text-dark-text-secondary mt-1">
        {isRecordingActive 
          ? "Speak clearly into your microphone" 
          : hasAudioBlob 
            ? "Listen, transcript and save your memory" 
            : "Tap the microphone to start recording"}
      </p>
    </div>
  );
};

export default RecordingStatus;
