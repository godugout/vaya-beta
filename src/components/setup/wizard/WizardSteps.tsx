
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { FamilyContextForm } from "@/components/chat/FamilyContextForm";
import { Upload, Image, Mic, Copy, Check } from "lucide-react";

// FamilyCreationStep component
export const FamilyCreationStep = ({ onFamilyCreated }: { onFamilyCreated: (familyId: string) => void }) => {
  const [familyName, setFamilyName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleCreateFamily = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyName.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a family name",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Create new family record
      const { data, error } = await supabase
        .from("families")
        .insert({
          name: familyName,
          description: description || null,
        })
        .select()
        .single();

      if (error) throw error;

      onFamilyCreated(data.id);
    } catch (error: any) {
      console.error("Error creating family:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create family",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleCreateFamily} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="familyName">Family Name</Label>
            <Input
              id="familyName"
              placeholder="Enter your family name"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Tell us a bit about your family"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Family"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// FamilyContextStep component
export const FamilyContextStep = ({ onContextSaved }: { onContextSaved: (data: any) => void }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <FamilyContextForm onSave={onContextSaved} />
      </CardContent>
    </Card>
  );
};

// MediaUploadStep component
export const MediaUploadStep = ({ 
  familyId, 
  onMediaUploaded 
}: { 
  familyId: string | null,
  onMediaUploaded: () => void
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    // Filter for image files
    const imageFiles = newFiles.filter(file => 
      file.type.startsWith('image/')
    );
    
    setFiles(prev => [...prev, ...imageFiles]);
  };

  const handleUpload = async () => {
    if (!familyId) {
      toast({
        title: "Error",
        description: "Family ID is missing. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one image to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      for (const file of files) {
        // For demo purposes, we'll just simulate an upload
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // In a real implementation, you would upload to Supabase storage
        // const { data, error } = await supabase.storage
        //   .from('family-photos')
        //   .upload(`${familyId}/${file.name}`, file);
        
        // if (error) throw error;
      }
      
      toast({
        title: "Upload successful",
        description: `Uploaded ${files.length} file(s)`,
      });
      
      onMediaUploaded();
    } catch (error: any) {
      console.error("Error uploading files:", error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your files",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' : 'border-gray-300 dark:border-gray-700'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="text-sm font-medium">
              Drag and drop your photos here or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Upload family photos to get started with your memories
            </p>
          </div>
          <input 
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <div className="text-sm font-medium">Selected files ({files.length})</div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={file.name}
                      className="w-full h-full object-cover"
                      onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                    />
                  </div>
                  <button 
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          className="w-full" 
          disabled={uploading || files.length === 0}
          onClick={handleUpload}
        >
          {uploading ? "Uploading..." : `Upload ${files.length} file(s)`}
        </Button>
        
        <div className="text-center">
          <Button variant="outline" onClick={onMediaUploaded}>
            Skip for now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// AudioRecordingStep component
export const AudioRecordingStep = ({ onAudioRecorded }: { onAudioRecorded: (data: { audioUrl?: string; transcription?: string }) => void }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const { toast } = useToast();

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real implementation, you would start recording here
    toast({
      title: "Recording started",
      description: "Speak clearly into your microphone",
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Simulate recording completed
    setAudioUrl('simulated-audio-url');
    setTranscription('Welcome to our family space! We are excited to share our memories and stories with you.');
    toast({
      title: "Recording stopped",
      description: "Audio has been processed",
    });
  };

  const handleSave = () => {
    if (audioUrl) {
      onAudioRecorded({ audioUrl, transcription: transcription || undefined });
    }
  };

  const handleSkip = () => {
    onAudioRecorded({});
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-full h-32 w-32 mx-auto flex items-center justify-center">
            <button
              className={`rounded-full p-6 transition-colors ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-primary text-white'
              }`}
              onClick={toggleRecording}
            >
              <Mic className="h-8 w-8" />
            </button>
          </div>
          <p className="text-sm text-gray-500">
            {isRecording 
              ? "Recording... Click again to stop" 
              : "Click to record your welcome message"}
          </p>
        </div>

        {audioUrl && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
              <h3 className="font-medium mb-2">Transcription:</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {transcription || "No transcription available"}
              </p>
            </div>
            
            <Button className="w-full" onClick={handleSave}>
              Save and Continue
            </Button>
          </div>
        )}

        {!audioUrl && !isRecording && (
          <Button variant="outline" className="w-full" onClick={handleSkip}>
            Skip for now
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// ShareInviteStep component
export const ShareInviteStep = ({ 
  inviteLink, 
  onCopyLink, 
  linkCopied 
}: { 
  inviteLink: string, 
  onCopyLink: () => void, 
  linkCopied: boolean 
}) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium">Share with your family</h3>
          <p className="text-sm text-gray-500">
            Send this link to family members to invite them to join your family space
          </p>
        </div>

        <div className="flex space-x-2">
          <Input
            value={inviteLink}
            readOnly
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={onCopyLink}
            className="flex-shrink-0"
          >
            {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        <div className="space-y-4">
          <p className="text-sm">
            Your family members will need the secret word to join:
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-center font-medium">
            hanuman
          </div>
          <p className="text-xs text-gray-500">
            This is your family's default secret word. You can change it later in settings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
