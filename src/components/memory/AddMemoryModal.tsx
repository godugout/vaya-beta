
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AudioRecorder } from "@/components/voice-recording/AudioRecorder";
import { useToast } from "@/components/ui/use-toast";
import { Mic, Image, FileText, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface AddMemoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  capsuleId?: string;
}

const AddMemoryModal = ({ open, onOpenChange, capsuleId }: AddMemoryModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>("text");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioData, setAudioData] = useState<{ audioBlob: Blob, audioUrl: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleAudioRecorded = (blob: Blob, url: string) => {
    setAudioData({ audioBlob: blob, audioUrl: url });
  };

  const handleSubmit = async () => {
    if (!title) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for your memory",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session?.user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to save memories",
          variant: "destructive",
        });
        return;
      }

      const userId = sessionData.session.user.id;
      let contentUrl = "";
      let memoryType = activeTab;

      // Handle file upload based on memory type
      if (activeTab === "photo" && selectedImage) {
        const fileName = `${Date.now()}_${selectedImage.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("family_media")
          .upload(fileName, selectedImage);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("family_media")
          .getPublicUrl(fileName);

        contentUrl = urlData.publicUrl;
      } else if (activeTab === "audio" && audioData) {
        const fileName = `audio_${Date.now()}.webm`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("family_media")
          .upload(fileName, audioData.audioBlob);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("family_media")
          .getPublicUrl(fileName);

        contentUrl = urlData.publicUrl;
      }

      // Create memory record
      const { data, error } = await supabase
        .from("memories")
        .insert({
          title,
          description,
          memory_type: memoryType,
          content_url: contentUrl,
          user_id: userId,
          metadata: {
            date_created: new Date().toISOString(),
            ...(capsuleId && { capsule_id: capsuleId }),
          },
        })
        .select()
        .single();

      if (error) throw error;

      // If this is for a capsule, add it to capsule items
      if (capsuleId && data) {
        const { error: capsuleError } = await supabase
          .from("capsule_items")
          .insert({
            capsule_id: capsuleId,
            item_id: data.id,
            item_type: "memory",
            added_by: userId,
          });

        if (capsuleError) throw capsuleError;
      }

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["memories"] });
      
      toast({
        title: "Memory Saved",
        description: "Your memory has been saved successfully",
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving memory:", error);
      toast({
        title: "Error Saving Memory",
        description: "There was a problem saving your memory. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Memory</DialogTitle>
          <DialogDescription>
            Capture and preserve your precious family memories
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="text" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Text</span>
            </TabsTrigger>
            <TabsTrigger value="photo" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span>Photo</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              <span>Audio</span>
            </TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <div>
              <Label htmlFor="memory-title">Title</Label>
              <Input
                id="memory-title"
                placeholder="Give your memory a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <TabsContent value="text" className="space-y-4">
              <div>
                <Label htmlFor="memory-description">Memory</Label>
                <Textarea
                  id="memory-description"
                  placeholder="Share your memory..."
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="photo" className="space-y-4">
              <div>
                <Label htmlFor="memory-photo">Photo</Label>
                <div className="border-2 border-dashed rounded-md p-4 text-center">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-md"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-0 right-0 rounded-full h-6 w-6"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedImage(null);
                          setPreviewUrl(null);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Image className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <input
                        id="memory-photo"
                        type="file"
                        accept="image/*"
                        className="opacity-0 absolute inset-0 w-full cursor-pointer"
                        onChange={handleImageChange}
                      />
                    </>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="photo-caption">Caption</Label>
                <Textarea
                  id="photo-caption"
                  placeholder="Add a caption for your photo..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="audio" className="space-y-4">
              <div>
                <Label>Voice Recording</Label>
                <div className="border rounded-md p-4">
                  <AudioRecorder 
                    onRecordingComplete={handleAudioRecorded} 
                    className="mx-auto"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="audio-transcript">Transcript or Notes</Label>
                <Textarea
                  id="audio-transcript"
                  placeholder="Add a transcript or notes for your audio..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </TabsContent>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-forest hover:bg-forest/90"
              >
                {isSubmitting ? "Saving..." : "Save Memory"}
              </Button>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemoryModal;
