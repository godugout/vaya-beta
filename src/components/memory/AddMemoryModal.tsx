import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceRecorder from "@/components/VoiceRecorder";
import MemoryUpload from "@/components/MemoryUpload";

interface AddMemoryModalProps {
  children: React.ReactNode;
}

const AddMemoryModal = ({ children }: AddMemoryModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-outfit">Add New Memory</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="voice" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="voice" className="w-full">Voice Recording</TabsTrigger>
            <TabsTrigger value="upload" className="w-full">Upload Memory</TabsTrigger>
          </TabsList>
          <TabsContent value="voice">
            <VoiceRecorder />
          </TabsContent>
          <TabsContent value="upload">
            <MemoryUpload />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemoryModal;