
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImmersiveVoiceRecorder } from "@/components/voice-recording/ImmersiveVoiceRecorder";
import { EmotionalStoryPlayer } from "@/components/story-playback/EmotionalStoryPlayer";
import { EmotionType } from "@/components/emotion-detection/types";

const VoiceAndStoryExample = () => {
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  
  // Example transcript segments with timing information
  const exampleSegments = [
    {
      text: "I remember when I visited the temple as a child. The smell of incense filled the air.",
      start: 0,
      end: 6,
      emotion: "nostalgia" as EmotionType
    },
    {
      text: "My grandfather would tell me stories of Hanuman's strength and devotion.",
      start: 6,
      end: 12,
      emotion: "reverence" as EmotionType
    },
    {
      text: "I was so excited to see the colorful decorations and celebrations during the festival.",
      start: 12,
      end: 18,
      emotion: "excitement" as EmotionType
    },
    {
      text: "Those memories bring me so much joy even today.",
      start: 18,
      end: 22,
      emotion: "joy" as EmotionType
    }
  ];
  
  // Example emotion markers for the story
  const exampleEmotions = {
    primary: "nostalgia" as EmotionType,
    markers: [
      { time: 3, emotion: "nostalgia" as EmotionType, intensity: 0.8 },
      { time: 8, emotion: "reverence" as EmotionType, intensity: 0.9 },
      { time: 14, emotion: "excitement" as EmotionType, intensity: 0.7 },
      { time: 20, emotion: "joy" as EmotionType, intensity: 0.8 }
    ]
  };
  
  // Handle recording completion
  const handleRecordingComplete = (blob: Blob, transcript?: string) => {
    setRecordedBlob(blob);
    setRecordedUrl(URL.createObjectURL(blob));
    setTranscription(transcript || "Example transcription text for the recording.");
  };
  
  // Handle edit operations
  const handleEdit = (type: 'title' | 'trim' | 'enhance', data: any) => {
    console.log(`Edit operation: ${type}`, data);
    // In a real implementation, these would perform the actual edits
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Voice Recording & Story Playback</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="record">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="record" className="flex-1">Record</TabsTrigger>
            <TabsTrigger 
              value="playback" 
              className="flex-1"
              disabled={!recordedUrl && !exampleEmotions}
            >
              Playback
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="record">
            <ImmersiveVoiceRecorder 
              onRecordingComplete={handleRecordingComplete}
            />
            
            <div className="mt-4 text-sm text-gray-500">
              <h3 className="font-medium text-black dark:text-white">Accessibility Features:</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Large, prominent recording button (60px+)</li>
                <li>Visual feedback with pulsing animation and waveform</li>
                <li>Color changes based on voice intensity</li>
                <li>Haptic feedback on start/stop (on supported devices)</li>
                <li>Clear recording status indicators</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="playback">
            <EmotionalStoryPlayer
              audioUrl={recordedUrl || "/example-audio.mp3"}
              title="My Temple Memory"
              transcription={transcription || "Example transcription text for the story."}
              transcriptSegments={exampleSegments}
              emotions={exampleEmotions}
              onEdit={handleEdit}
            />
            
            <div className="mt-4 text-sm text-gray-500">
              <h3 className="font-medium text-black dark:text-white">Features:</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Large, accessible playback controls</li>
                <li>Emotional markers with saffron colors for important moments</li>
                <li>Synchronized transcription highlighting</li>
                <li>Simple editing options (title, trim, enhance)</li>
                <li>Visual emotion journey map</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VoiceAndStoryExample;
