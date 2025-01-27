import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X } from "lucide-react";

const MemoryUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      
      // Get the file extension
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('memories')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('memories')
        .getPublicUrl(filePath);

      // Save memory metadata to database
      const { error: dbError } = await supabase
        .from('memories')
        .insert({
          type: file.type.split('/')[0], // 'image', 'video', or 'audio'
          content_url: publicUrl,
          tags: tags,
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Memory uploaded successfully!",
      });

      // Reset form
      setFile(null);
      setTags([]);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload memory. Please try again.",
        variant: "destructive",
      });
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div>
        <Label htmlFor="memory-file">Upload Memory</Label>
        <Input
          id="memory-file"
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={handleFileChange}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="tags">Add Tags</Label>
        <Input
          id="tags"
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Type tag and press Enter"
          className="mt-2"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 bg-vaya-peach text-vaya-orange px-2 py-1 rounded"
            >
              <span>{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full"
      >
        {uploading ? (
          "Uploading..."
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Memory
          </>
        )}
      </Button>
    </div>
  );
};

export default MemoryUpload;