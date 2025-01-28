import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceRecorder from "@/components/VoiceRecorder";
import { Message } from "@/components/chat/types";

interface AddMemoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddMemoryModal = ({ open, onOpenChange }: AddMemoryModalProps) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleMessageSent = (message: { content: string; attachments?: { type: "audio" | "image"; url: string }[] }) => {
    console.log("Memory recorded:", message);
    // Handle the memory being recorded
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Memory</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="voice" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>
          <TabsContent value="voice">
            <VoiceRecorder
              onMessageSent={handleMessageSent}
              setIsRecording={setIsRecording}
            />
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