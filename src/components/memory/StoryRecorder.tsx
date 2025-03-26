
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, StopCircle, RefreshCw, Save, Volume2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { FadeIn } from '@/components/animation/FadeIn';

interface StoryRecorderProps {
  onSave?: (data: { audio?: Blob; transcript?: string; title?: string }) => void;
  onCancel?: () => void;
  initialPrompt?: string;
  simpleMode?: boolean;
}

const StoryRecorder = ({
  onSave,
  onCancel,
  initialPrompt = "Tell us about this memory...",
  simpleMode = false
}: StoryRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [storyTitle, setStoryTitle] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(initialPrompt);
  const [promptIndex, setPromptIndex] = useState(0);
  const { toast } = useToast();
  
  // Example follow-up prompts
  const followUpPrompts = [
    "Who was with you that day?",
    "What do you remember most about that experience?",
    "How did that make you feel?",
    "Is there anything else you'd like to share about this memory?"
  ];
  
  // Simulating the Web Speech API for speech recognition
  useEffect(() => {
    if (isRecording) {
      // In a real implementation, we would use the Web Speech API
      // For this example, we'll just simulate recording for 5 seconds
      const timer = setTimeout(() => {
        handleStopRecording();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isRecording]);
  
  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording started",
      description: "Speak clearly into your microphone",
    });
  };
  
  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Create a dummy audio blob
      const dummyBlob = new Blob(['dummy audio data'], { type: 'audio/webm' });
      setAudioBlob(dummyBlob);
      
      // Generate a dummy transcript based on the current prompt
      const dummyTranscript = `This is a simulated response to the prompt: "${currentPrompt}". In a real implementation, this would be the transcribed audio from the user's recording.`;
      setTranscript(dummyTranscript);
      
      setIsProcessing(false);
      
      // Move to next prompt if available
      if (promptIndex < followUpPrompts.length) {
        setCurrentPrompt(followUpPrompts[promptIndex]);
        setPromptIndex(promptIndex + 1);
      }
      
      toast({
        title: "Recording processed",
        description: "Your story has been transcribed",
      });
    }, 2000);
  };
  
  const handleReset = () => {
    setAudioBlob(null);
    setTranscript('');
    setCurrentPrompt(initialPrompt);
    setPromptIndex(0);
  };
  
  const handleSave = () => {
    if (audioBlob) {
      const title = storyTitle || `Story - ${new Date().toLocaleDateString()}`;
      
      if (onSave) {
        onSave({
          audio: audioBlob,
          transcript,
          title
        });
      }
      
      toast({
        title: "Story saved",
        description: "Your story has been saved successfully",
      });
    }
  };
  
  const handleReadPrompt = () => {
    // In a real implementation, we would use the Web Speech API
    toast({
      title: "Reading prompt",
      description: currentPrompt,
    });
  };
  
  return (
    <FadeIn>
      <Card className={simpleMode ? 'border-2 border-hanuman-orange' : ''}>
        <CardHeader>
          <CardTitle className="flex items-center">
            Record Your Story
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2"
              onClick={handleReadPrompt}
            >
              <Volume2 className="h-4 w-4" />
              <span className="sr-only">Read aloud</span>
            </Button>
          </CardTitle>
          <CardDescription>{currentPrompt}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recording UI */}
          <div className="flex flex-col items-center justify-center py-8">
            {!audioBlob ? (
              <>
                <div 
                  className={`relative rounded-full ${
                    isRecording 
                      ? 'bg-red-100 dark:bg-red-900 p-10 animate-pulse' 
                      : 'bg-gray-100 dark:bg-gray-800 p-8'
                  } mb-4`}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-20 w-20 rounded-full ${
                      isRecording 
                        ? 'text-red-500 bg-red-100 dark:bg-red-900' 
                        : 'text-hanuman-primary bg-gray-100 dark:bg-gray-800'
                    }`}
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    disabled={isProcessing}
                  >
                    {isRecording ? (
                      <StopCircle className="h-12 w-12" />
                    ) : (
                      <Mic className="h-12 w-12" />
                    )}
                  </Button>
                  
                  {isRecording && (
                    <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-red-500 animate-ping"></div>
                  )}
                </div>
                
                <p className="text-lg text-center">
                  {isProcessing
                    ? <span className="flex items-center"><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Processing audio...</span>
                    : isRecording
                      ? "Recording... Tap to stop"
                      : "Tap to start recording"}
                </p>
              </>
            ) : (
              <div className="w-full space-y-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="font-medium mb-2">Transcript:</p>
                  <Textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    rows={6}
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Story Title</label>
                  <Textarea
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                    placeholder="Give your story a title"
                    className="resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center"
                    onClick={handleReset}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Record Again
                  </Button>
                  
                  <Button 
                    variant="default" 
                    className="flex items-center justify-center bg-hanuman-primary hover:bg-hanuman-primary/90"
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Story
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Cancel Button */}
          {onCancel && !isRecording && (
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={onCancel}
              disabled={isProcessing}
            >
              Cancel
            </Button>
          )}
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default StoryRecorder;
