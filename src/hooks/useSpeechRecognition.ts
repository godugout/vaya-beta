
// Temporary stub for the missing hook
export const useSpeechRecognition = () => {
  return {
    transcript: '',
    listening: false,
    startListening: () => {},
    stopListening: () => {},
    resetTranscript: () => {},
    browserSupportsSpeechRecognition: true,
  };
};

export default useSpeechRecognition;
