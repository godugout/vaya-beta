
// Enhanced speech recognition hook
export const useSpeechRecognition = (language?: string) => {
  return {
    transcript: '',
    listening: false,
    startListening: () => {},
    stopListening: () => {},
    resetTranscript: () => {},
    browserSupportsSpeechRecognition: true,
    hasRecognitionSupport: true, // Add the missing property
  };
};

export default useSpeechRecognition;
