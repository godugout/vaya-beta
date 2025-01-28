import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddMemoryButtonProps {
  capsuleId?: string;
}

const AddMemoryButton = ({ capsuleId }: AddMemoryButtonProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !capsuleId) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${capsuleId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('memories')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('memories')
        .getPublicUrl(filePath);

      const { error: contentError } = await supabase
        .from('capsule_contents')
        .insert({
          capsule_id: capsuleId,
          content_type: file.type.startsWith('image/') ? 'image' : 'file',
          content_url: publicUrl,
        });

      if (contentError) throw contentError;

      toast({
        title: "Success!",
        description: "Memory added to capsule",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload memory. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-vaya-secondary hover:bg-vaya-secondary/90">
          Add to Capsule <Plus className="ml-2 h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Add a Memory</h3>
            <p className="text-sm text-gray-500">
              Upload photos, videos, or documents to preserve in this time capsule.
            </p>
          </div>
          
          <div className="space-y-4">
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/*,video/*,application/pdf"
              disabled={isUploading}
              className="hidden"
              id="memory-upload"
            />
            <label
              htmlFor="memory-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Plus className="w-8 h-8 mb-2 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  {isUploading ? "Uploading..." : "Click to upload"}
                </p>
              </div>
            </label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemoryButton;