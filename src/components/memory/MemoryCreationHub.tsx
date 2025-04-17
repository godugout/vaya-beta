
import { useState } from "react";
import { useRouter } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Mic, FileText, Image, Camera, 
  PlayCircle, PlusCircle, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AudioRecorder } from "@/components/voice-recording/AudioRecorder";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MemoryCreationHubProps {
  onStartImmersiveRecording: () => void;
  onOpenMemoryModal: () => void;
}

export const MemoryCreationHub = ({ 
  onStartImmersiveRecording,
  onOpenMemoryModal
}: MemoryCreationHubProps) => {
  const [activeCategory, setActiveCategory] = useState<'recent' | 'suggested' | 'all'>('recent');
  const [isQuickDialogOpen, setIsQuickDialogOpen] = useState(false);
  const [activeMethod, setActiveMethod] = useState<"voice" | "text" | "photo">("voice");
  
  const memoryTypes = [
    {
      id: "voice",
      name: "Voice Memory",
      description: "Record audio memories and stories",
      icon: Mic,
      color: "bg-gradient-to-r from-purple-500 to-indigo-600",
      iconClass: "text-white",
      action: onStartImmersiveRecording
    },
    {
      id: "text",
      name: "Text Memory",
      description: "Write down your thoughts",
      icon: FileText,
      color: "bg-gradient-to-r from-blue-500 to-cyan-600",
      iconClass: "text-white",
      action: onOpenMemoryModal
    },
    {
      id: "photo",
      name: "Photo Memory",
      description: "Share photos with captions",
      icon: Image,
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      iconClass: "text-white",
      action: onOpenMemoryModal
    }
  ];

  const handleQuickStart = (method: "voice" | "text" | "photo") => {
    setActiveMethod(method);
    setIsQuickDialogOpen(true);
  };

  const handleCloseQuickDialog = () => {
    setIsQuickDialogOpen(false);
  };

  const handleCardClick = (action: () => void) => {
    action();
  };

  return (
    <div className="space-y-4">
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Create a Memory</CardTitle>
              <CardDescription className="text-sm">Preserve your family stories and moments</CardDescription>
            </div>
            <Button 
              onClick={onOpenMemoryModal}
              className="bg-forest hover:bg-forest/90 shadow-md"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Memory
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {memoryTypes.map((type) => (
              <motion.div
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => handleCardClick(type.action)}
              >
                <div className="flex flex-col h-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
                  <div className={cn("p-4 flex items-center gap-4", type.color)}>
                    <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                      <type.icon className={cn("h-5 w-5", type.iconClass)} />
                    </div>
                    <div className="text-white">
                      <h3 className="font-medium leading-none mb-1">{type.name}</h3>
                      <p className="text-xs text-white/80">{type.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-background p-3 flex justify-between items-center mt-auto">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickStart(type.id as "voice" | "text" | "photo");
                      }}
                      className="text-xs opacity-90 hover:opacity-100"
                    >
                      Quick Start
                    </Button>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Quick start dialog */}
      <Dialog open={isQuickDialogOpen} onOpenChange={handleCloseQuickDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {activeMethod === "voice" ? "Quick Voice Recording" : 
               activeMethod === "text" ? "Quick Text Memory" : 
               "Quick Photo Upload"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {activeMethod === "voice" && (
              <div className="flex flex-col items-center space-y-4">
                <AudioRecorder 
                  onRecordingComplete={(blob, url) => {
                    console.log("Recording completed", {blob, url});
                    // Process recording
                    handleCloseQuickDialog();
                  }}
                  className="w-full" 
                />
              </div>
            )}
            
            {activeMethod === "text" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quick-memory-title">Title</Label>
                  <Input id="quick-memory-title" placeholder="Give your memory a title" />
                </div>
                <div>
                  <Label htmlFor="quick-memory-text">Memory</Label>
                  <Textarea 
                    id="quick-memory-text" 
                    placeholder="Write your memory here..." 
                    rows={5}
                  />
                </div>
                <Button 
                  className="w-full bg-forest hover:bg-forest/90"
                  onClick={handleCloseQuickDialog}
                >
                  Save Memory
                </Button>
              </div>
            )}
            
            {activeMethod === "photo" && (
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    JPG, PNG or GIF (max. 10MB)
                  </p>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                  />
                </div>
                <Button 
                  className="w-full bg-forest hover:bg-forest/90"
                  onClick={handleCloseQuickDialog}
                >
                  Upload & Save
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemoryCreationHub;
