
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";
import { TranscriptionInput } from "@/components/input/TranscriptionInput";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animation/FadeIn";

interface AddMemoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  capsuleId?: string; // Add this optional prop
}

const AddMemoryModal = ({ open, onOpenChange, capsuleId }: AddMemoryModalProps) => {
  const [textMemory, setTextMemory] = useState("");
  
  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    console.log("Memory recorded:", data);
    // If capsuleId is provided, we can use it to associate the memory with a specific capsule
    if (capsuleId) {
      console.log("Associated with capsule:", capsuleId);
    }
    onOpenChange(false);
  };
  
  const handleTextMemorySave = () => {
    if (textMemory.trim()) {
      console.log("Text memory saved:", textMemory);
      // If capsuleId is provided, we can use it to associate the memory with a specific capsule
      if (capsuleId) {
        console.log("Associated with capsule:", capsuleId);
      }
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {capsuleId ? "Add Memory to Capsule" : "Add New Memory"}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="voice" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>
          <TabsContent value="voice">
            <VoiceRecordingExperience onMemorySaved={handleMemorySaved} />
          </TabsContent>
          <TabsContent value="text">
            <FadeIn>
              <div className="space-y-4">
                <TranscriptionInput
                  value={textMemory}
                  onChange={setTextMemory}
                  placeholder="Type your memory here..."
                  maxLength={1000}
                />
                
                <Button 
                  onClick={handleTextMemorySave}
                  className="w-full"
                  disabled={!textMemory.trim()}
                >
                  Save Memory
                </Button>
              </div>
            </FadeIn>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemoryModal;
