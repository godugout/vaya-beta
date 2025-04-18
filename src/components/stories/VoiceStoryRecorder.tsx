import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TranscriptionInput } from "@/components/input/TranscriptionInput";
import { VoiceRecorderButton } from "@/components/input/VoiceRecorderButton";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useAudioTranscription } from "@/components/voice-recording/hooks/useAudioTranscription";
import { useTestTranscription } from "@/components/voice-recording/hooks/useTestTranscription";
import { useToast } from "@/components/ui/use-toast";
import { useCreateStory } from "./useStories";
import { supabase } from "@/integrations/supabase/client";
import { Mic, FileText, Send, Loader, Globe, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AudioPreview from "@/components/audio/AudioPreview";
import TranscriptionDisplay from "@/components/audio/TranscriptionDisplay";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VoiceStoryRecorderProps {
  onSuccess?: () => void;
}

export const VoiceStoryRecorder = ({ onSuccess }: VoiceStoryRecorderProps) => {
  const [activeTab, setActiveTab] = useState<"voice" | "text">("voice");
  const [isRecording, setIsRecording] = useState(false);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [language, setLanguage] = useState<"en" | "hi" | "gu">("en");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
  
  const {
    isRecordingActive,
    audioBlob,
    startRecording,
    stopRecording,
    setAudioBlob
  } = useVoiceRecorder();
  
  const {
    transcription,
    isProcessing: isTranscribing,
    transcribeAudio
  } = useAudioTranscription({
    language
  });
  
  const {
    testOpenAIConnection,
    isRunningTest,
    testResults
  } = useTestTranscription();
  
  const createStory = useCreateStory();
  const { toast } = useToast();

  const handleToggleRecording = () => {
    if (isRecordingActive) {
      stopRecording();
      setIsRecording(false);
    } else {
      setTranscriptionError(null);
      startRecording();
      setIsRecording(true);
    }
  };

  const handleTranscribe = async () => {
    if (!audioBlob) return;
    
    try {
      setTranscriptionError(null);
      const text = await transcribeAudio(audioBlob);
      if (text && !storyContent) {
        setStoryContent(text);
        const firstSentence = text.split('.')[0];
        if (firstSentence && !storyTitle) {
          setStoryTitle(firstSentence.length > 50 
            ? firstSentence.substring(0, 47) + '...' 
            : firstSentence);
        }
      } else if (!text) {
        setTranscriptionError("Transcription failed. Try speaking more clearly or use the text input instead.");
      }
    } catch (error) {
      console.error("Transcription error:", error);
      setTranscriptionError((error as Error).message || "Transcription failed. The server may be busy or the audio format is not supported.");
      toast({
        variant: "destructive",
        title: "Transcription failed",
        description: "There was a problem transcribing your recording. You can still save it or try again.",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsProcessing(true);
      
      const { data: user } = await supabase.auth.getUser();
      
      if (!user || !user.user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please log in to save your story.",
        });
        setIsProcessing(false);
        return;
      }
      
      let audioUrl = null;
      
      if (audioBlob) {
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.webm`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('stories')
          .upload(fileName, audioBlob);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('stories')
          .getPublicUrl(fileName);
          
        audioUrl = publicUrl;
      }
      
      await createStory.mutateAsync({
        title: storyTitle || "Untitled Story",
        description: storyContent,
        audio_url: audioUrl,
        story_type: audioUrl ? "audio" : "text",
        author_id: user.user.id,
        metadata: { language: language },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      setStoryTitle("");
      setStoryContent("");
      setAudioBlob(null);
      setTranscriptionError(null);
      
      toast({
        title: "Story saved",
        description: "Your story has been saved successfully.",
      });
      
      onSuccess?.();
      
    } catch (error) {
      console.error("Error saving story:", error);
      toast({
        variant: "destructive",
        title: "Error saving story",
        description: "There was a problem saving your story. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const canSubmit = (storyTitle.trim() !== "" || storyContent.trim() !== "") && !isProcessing && !isTranscribing;

  return (
    <Card className="bg-card border-border shadow-sm overflow-hidden">
      <CardHeader className="bg-muted/40 pb-3">
        <CardTitle className="text-xl flex items-center justify-between">
          Share Your Family Story
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              <Globe className="h-3 w-3" />
              {language === "en" ? "English" : language === "hi" ? "Hindi" : "Gujarati"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="voice" value={activeTab} onValueChange={(v) => setActiveTab(v as "voice" | "text")} className="w-full">
          <TabsList className="w-full grid grid-cols-2 rounded-none">
            <TabsTrigger value="voice" className="flex items-center gap-2 data-[state=active]:bg-autumn/10 data-[state=active]:text-autumn">
              <Mic className="h-4 w-4" />
              Voice Story
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2 data-[state=active]:bg-forest/10 data-[state=active]:text-forest">
              <FileText className="h-4 w-4" />
              Text Story
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="voice" className="p-4 space-y-4">
            {!audioBlob ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <VoiceRecorderButton
                    state={isRecordingActive ? "recording" : "idle"}
                    size="lg"
                    onStart={handleToggleRecording}
                    onStop={handleToggleRecording}
                    className="bg-autumn hover:bg-autumn/90"
                  />
                </motion.div>
                <p className="text-center text-muted-foreground">
                  {isRecordingActive 
                    ? "Recording... Tap to stop" 
                    : "Tap the microphone to start recording your story"}
                </p>
                
                <div className="w-full flex justify-center mt-4">
                  <Button
                    onClick={testOpenAIConnection}
                    variant="outline"
                    size="sm"
                    disabled={isRunningTest}
                    className="text-xs flex items-center gap-1"
                  >
                    {isRunningTest ? (
                      <>
                        <Loader className="h-3 w-3 animate-spin" />
                        Testing API connection...
                      </>
                    ) : (
                      <>
                        {testResults?.success === true ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : testResults?.success === false ? (
                          <AlertCircle className="h-3 w-3 text-red-500" />
                        ) : (
                          <Globe className="h-3 w-3" />
                        )}
                        Test Transcription API
                      </>
                    )}
                  </Button>
                </div>
                
                {testResults && (
                  <div className={`text-sm ${testResults.success ? 'text-green-500' : 'text-red-500'} text-center max-w-md`}>
                    {testResults.message}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <AudioPreview 
                  audioBlob={audioBlob} 
                  disabled={isProcessing || isTranscribing}
                />
                
                {!transcription && !isTranscribing && !transcriptionError && (
                  <Button 
                    onClick={handleTranscribe} 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    disabled={isProcessing}
                  >
                    Transcribe Recording
                  </Button>
                )}
                
                {isTranscribing && (
                  <div className="flex items-center justify-center py-2 text-sm text-muted-foreground">
                    <Loader size={14} className="animate-spin mr-2" />
                    Transcribing your recording...
                  </div>
                )}
                
                {transcriptionError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {transcriptionError}
                    </AlertDescription>
                  </Alert>
                )}
                
                {transcription && (
                  <TranscriptionDisplay transcription={transcription} />
                )}
                
                <div className="space-y-3">
                  <div className="grid gap-2">
                    <label htmlFor="story-title" className="text-sm font-medium">
                      Story Title
                    </label>
                    <input
                      id="story-title"
                      value={storyTitle}
                      onChange={(e) => setStoryTitle(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Give your story a title"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="story-content" className="text-sm font-medium">
                      Story Content
                    </label>
                    <textarea
                      id="story-content"
                      value={storyContent}
                      onChange={(e) => setStoryContent(e.target.value)}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Add details to your story or edit the transcription"
                    />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="text" className="p-4 space-y-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="text-story-title" className="text-sm font-medium">
                  Story Title
                </label>
                <input
                  id="text-story-title"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Give your story a title"
                />
              </div>
              
              <TranscriptionInput
                value={storyContent}
                onChange={setStoryContent}
                onRequestVoice={() => setActiveTab("voice")}
                placeholder="Type your story here or click the microphone to record..."
                maxLength={2000}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="p-4 pt-0 flex justify-between items-center gap-2">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setLanguage(language === "en" ? "hi" : language === "hi" ? "gu" : "en")}
              className="text-xs flex items-center gap-1"
            >
              <Globe className="h-3 w-3" />
              {language === "en" ? "EN" : language === "hi" ? "HI" : "GU"}
            </Button>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="bg-autumn hover:bg-autumn/90 text-white"
          >
            {isProcessing ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Share Story
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
