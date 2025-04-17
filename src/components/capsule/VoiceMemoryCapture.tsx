
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { VoiceTranscriptionSystem } from "@/components/voice-recording/VoiceTranscriptionSystem";
import { TranscriptionDisplay } from "@/components/transcription/TranscriptionDisplay";
import { TranscriptionResult } from "@/hooks/useMultilingualTranscription";
import { supabase } from "@/integrations/supabase/client";
import { Mic, Upload, CheckCircle2 } from "lucide-react";

interface VoiceMemoryCaptureProps {
  capsuleId?: string;
  onMemorySaved?: (data: { 
    audioUrl: string; 
    transcription?: TranscriptionResult; 
    id: string;
  }) => void;
  className?: string;
}

export function VoiceMemoryCapture({
  capsuleId,
  onMemorySaved,
  className
}: VoiceMemoryCaptureProps) {
  const [activeTab, setActiveTab] = useState("record");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<TranscriptionResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();
  
  const handleRecordingComplete = async (data: { 
    audioBlob: Blob | null; 
    transcription: TranscriptionResult | null 
  }) => {
    setAudioBlob(data.audioBlob);
    setTranscription(data.transcription);
  };
  
  const handleSave = async () => {
    if (!audioBlob) {
      toast({
        title: "No recording found",
        description: "Please record your voice memory first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Generate a unique filename
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.webm`;
      
      // Upload audio to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('stories')
        .upload(fileName, audioBlob);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('stories')
        .getPublicUrl(fileName);
        
      // Save memory to database
      const { data, error } = await supabase
        .from('capsule_items')
        .insert({
          capsule_id: capsuleId,
          item_type: 'audio',
          title: transcription?.fullText?.substring(0, 100) || 'Voice Memory',
          content: transcription?.fullText || '',
          audio_url: publicUrl,
          metadata: transcription ? {
            language: transcription.language,
            duration: transcription.metadata.duration,
            speakers: transcription.metadata.speakers,
            segments: transcription.segments
          } : null
        })
        .select('id')
        .single();
        
      if (error) throw error;
      
      // Notify success
      toast({
        title: "Memory saved!",
        description: "Your voice memory has been saved successfully.",
      });
      
      // Set complete state
      setIsComplete(true);
      
      // Call onMemorySaved callback
      if (onMemorySaved && data) {
        onMemorySaved({
          audioUrl: publicUrl,
          transcription: transcription || undefined,
          id: data.id
        });
      }
      
    } catch (error) {
      console.error('Error saving memory:', error);
      toast({
        title: "Failed to save memory",
        description: "There was an error saving your memory. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleReset = () => {
    setAudioBlob(null);
    setTranscription(null);
    setIsComplete(false);
  };
  
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Capture Voice Memory</CardTitle>
        </CardHeader>
        <CardContent>
          {isComplete ? (
            <div className="text-center py-8 space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">Memory Saved Successfully!</h3>
              <p className="text-gray-500">
                Your voice memory has been saved to the capsule.
              </p>
              <div className="pt-4">
                <Button onClick={handleReset}>Record Another Memory</Button>
              </div>
            </div>
          ) : (
            <>
              <Tabs defaultValue="record" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="record" className="flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    Record Voice
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Audio
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="record" className="pt-4">
                  {!audioBlob ? (
                    <VoiceTranscriptionSystem
                      onComplete={handleRecordingComplete}
                    />
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-gray-50 border rounded-lg p-4">
                        <audio 
                          src={URL.createObjectURL(audioBlob)} 
                          controls 
                          className="w-full"
                        />
                      </div>
                      
                      {transcription && (
                        <TranscriptionDisplay
                          transcription={transcription}
                          showDetails={true}
                        />
                      )}
                      
                      <div className="flex justify-between gap-2">
                        <Button 
                          variant="outline" 
                          onClick={handleReset}
                        >
                          Start Over
                        </Button>
                        
                        <Button
                          onClick={handleSave}
                          disabled={isSaving}
                        >
                          {isSaving ? "Saving..." : "Save Memory"}
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="upload" className="pt-4">
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Audio File</h3>
                    <p className="text-gray-500 mb-4">
                      Drag and drop an audio file, or click to select
                    </p>
                    <Button>Select Audio</Button>
                    <p className="text-xs text-gray-400 mt-2">
                      Supports MP3, WAV, M4A, WEBM (max 50MB)
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
