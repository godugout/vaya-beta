
import { useState, useEffect } from "react";
import { useAdvancedAudioRecorder } from "@/hooks/useAdvancedAudioRecorder";
import { useMultilingualTranscription, TranscriptionResult } from "@/hooks/useMultilingualTranscription";
import AdvancedAudioRecorder from "@/components/audio/AdvancedAudioRecorder";
import { TranscriptionEditor } from "@/components/transcription/TranscriptionEditor";
import { TranscriptionDisplay } from "@/components/transcription/TranscriptionDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Languages, Wand2, User, Clock } from "lucide-react";

interface VoiceTranscriptionSystemProps {
  onComplete?: (data: { 
    audioBlob: Blob | null, 
    transcription: TranscriptionResult | null 
  }) => void;
  initialLanguage?: 'en' | 'es' | 'hi' | 'gu' | 'auto';
  className?: string;
}

export function VoiceTranscriptionSystem({
  onComplete,
  initialLanguage = 'auto',
  className
}: VoiceTranscriptionSystemProps) {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [language, setLanguage] = useState<'en' | 'es' | 'hi' | 'gu' | 'auto'>(initialLanguage);
  const [speakerIdentification, setSpeakerIdentification] = useState(true);
  const [enableTimestamps, setEnableTimestamps] = useState(true);
  const [enhanceWithAI, setEnhanceWithAI] = useState(true);
  
  const {
    isRecording,
    volume,
    duration,
    startRecording,
    stopRecording
  } = useAdvancedAudioRecorder({
    sampleRate: 48000,
    bitDepth: 16,
    silenceThreshold: 0.1,
    silenceTimeout: 2000
  });
  
  const {
    transcription,
    isProcessing,
    progress,
    transcribeAudio,
    updateSegment,
    assignSpeakerName
  } = useMultilingualTranscription({
    language,
    speakerIdentification,
    generateTimestamps: enableTimestamps,
    enhanceWithAI
  });
  
  // Handle recording complete
  const handleRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
    // Don't auto-transcribe, let the user decide when to transcribe
  };
  
  // Handle transcription
  const handleTranscribe = async () => {
    if (audioBlob) {
      await transcribeAudio(audioBlob);
    }
  };
  
  // Handle segment edit
  const handleSegmentEdit = (index: number, text: string) => {
    updateSegment(index, text);
  };
  
  // Handle speaker name change
  const handleSpeakerNameChange = (speakerId: string, name: string) => {
    assignSpeakerName(speakerId, name);
  };
  
  // Handle completion
  const handleComplete = () => {
    if (onComplete) {
      onComplete({
        audioBlob,
        transcription
      });
    }
  };
  
  // Reset the system
  const handleReset = () => {
    setAudioBlob(null);
  };
  
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Voice Recording & Transcription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!audioBlob ? (
            <div className="space-y-4">
              {/* Language and settings */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language" className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Language
                  </Label>
                  <Select 
                    value={language} 
                    onValueChange={(value) => setLanguage(value as any)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-detect</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="gu">Gujarati</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="speaker-id" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Speaker Identification
                    </Label>
                    <Switch 
                      id="speaker-id"
                      checked={speakerIdentification}
                      onCheckedChange={setSpeakerIdentification}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="timestamps" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Generate Timestamps
                    </Label>
                    <Switch 
                      id="timestamps"
                      checked={enableTimestamps}
                      onCheckedChange={setEnableTimestamps}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-enhance" className="flex items-center gap-2">
                      <Wand2 className="h-4 w-4" />
                      AI Enhancement
                    </Label>
                    <Switch 
                      id="ai-enhance"
                      checked={enhanceWithAI}
                      onCheckedChange={setEnhanceWithAI}
                    />
                  </div>
                </div>
              </div>
              
              {/* Recording interface */}
              <AdvancedAudioRecorder
                onRecordingComplete={handleRecordingComplete}
                className="mt-4"
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Audio preview and transcription */}
              <div className="bg-gray-50 border rounded-lg p-4">
                <audio 
                  src={URL.createObjectURL(audioBlob)} 
                  controls 
                  className="w-full mb-2"
                />
                
                {!transcription && !isProcessing && (
                  <Button 
                    onClick={handleTranscribe} 
                    className="w-full mt-2"
                  >
                    Transcribe Audio
                  </Button>
                )}
                
                {isProcessing && (
                  <div className="space-y-2 py-3">
                    <Progress value={progress} className="h-2 w-full" />
                    <p className="text-sm text-center text-gray-500">
                      Transcribing... {Math.round(progress)}%
                    </p>
                  </div>
                )}
              </div>
              
              {/* Transcription editor */}
              {transcription && (
                <TranscriptionEditor
                  transcription={transcription}
                  audioBlob={audioBlob}
                  onSegmentEdit={handleSegmentEdit}
                  onSpeakerNameChange={handleSpeakerNameChange}
                />
              )}
              
              {/* Action buttons */}
              <div className="flex justify-between gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                >
                  Reset
                </Button>
                
                <Button
                  onClick={handleComplete}
                  disabled={!audioBlob}
                >
                  {transcription ? 'Save with Transcription' : 'Save Audio Only'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
