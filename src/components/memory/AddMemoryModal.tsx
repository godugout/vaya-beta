
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceRecordingExperience from "@/components/voice-recording/VoiceRecordingExperience";

interface AddMemoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddMemoryModal = ({ open, onOpenChange }: AddMemoryModalProps) => {
  const handleMemorySaved = (data: { audioUrl?: string; transcription?: string }) => {
    console.log("Memory recorded:", data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Memory</DialogTitle>
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
            {/* Text input component will go here */}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemoryModal;
