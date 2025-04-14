
import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Mic, FileVideo, Loader, Save } from 'lucide-react';
import { UserStory, storyService } from '@/services/storyService';
import { mediaService } from '@/services/mediaService';
import MediaRecorder from '@/components/media/MediaRecorder';

interface StoryEditorProps {
  story?: UserStory;
  onSave?: (story: UserStory) => void;
  onCancel?: () => void;
}

export function StoryEditor({ story, onSave, onCancel }: StoryEditorProps) {
  const [title, setTitle] = useState(story?.title || '');
  const [content, setContent] = useState(story?.content || '');
  const [isPublic, setIsPublic] = useState(story?.is_public || false);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [mediaId, setMediaId] = useState<string | undefined>(story?.media_id);
  const [mediaPreview, setMediaPreview] = useState<string | null>(
    story?.media?.file_path || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleMediaCapture = async (data: {
    blob: Blob;
    transcription?: string;
    duration: number;
  }) => {
    try {
      setIsUploading(true);
      
      // Use the transcription as content if available and no content already
      if (data.transcription && !content) {
        setContent(data.transcription);
      }
      
      // Create a file from blob
      const file = new File(
        [data.blob], 
        `recording-${Date.now()}.${data.blob.type.includes('video') ? 'webm' : 'ogg'}`, 
        { type: data.blob.type }
      );
      
      // Upload media
      const uploadedMedia = await mediaService.uploadMedia(
        file,
        title || 'Untitled Recording',
        content
      );
      
      setMediaId(uploadedMedia.id);
      setMediaPreview(uploadedMedia.file_path);
      
      toast({
        title: 'Media uploaded',
        description: 'Your recording has been uploaded successfully.'
      });
      
      // Close recorder
      setIsRecording(false);
      setIsVideoRecording(false);
    } catch (error) {
      console.error('Error uploading media:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload media. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // Upload media
      const uploadedMedia = await mediaService.uploadMedia(
        file,
        title || file.name,
        content
      );
      
      setMediaId(uploadedMedia.id);
      setMediaPreview(uploadedMedia.file_path);
      
      toast({
        title: 'Media uploaded',
        description: 'Your file has been uploaded successfully.'
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload file. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleSave = async () => {
    if (!title) {
      toast({
        title: 'Title required',
        description: 'Please enter a title for your story.',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      setIsSaving(true);
      
      const storyData: UserStory = {
        title,
        content,
        is_public: isPublic,
        media_id: mediaId
      };
      
      let savedStory: UserStory;
      
      if (story?.id) {
        // Update existing story
        savedStory = await storyService.updateStory(story.id, storyData);
        toast({
          title: 'Story updated',
          description: 'Your story has been updated successfully.'
        });
      } else {
        // Create new story
        savedStory = await storyService.createStory(storyData);
        toast({
          title: 'Story created',
          description: 'Your story has been created successfully.'
        });
      }
      
      if (onSave) {
        onSave(savedStory);
      }
    } catch (error) {
      console.error('Error saving story:', error);
      toast({
        title: 'Save failed',
        description: 'Failed to save story. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const renderMediaPreview = () => {
    if (!mediaPreview) return null;
    
    if (story?.media?.file_type.startsWith('video/')) {
      return (
        <video 
          src={mediaPreview} 
          controls 
          className="w-full rounded-md max-h-60 object-contain bg-black" 
        />
      );
    }
    
    if (story?.media?.file_type.startsWith('audio/')) {
      return (
        <audio 
          src={mediaPreview} 
          controls 
          className="w-full mt-2" 
        />
      );
    }
    
    return (
      <img 
        src={mediaPreview} 
        alt={title} 
        className="w-full rounded-md max-h-60 object-contain" 
      />
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter story title"
          />
        </div>
        
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter story content or description"
            rows={4}
          />
        </div>
        
        {(isRecording || isVideoRecording) ? (
          <MediaRecorder
            onSave={handleMediaCapture}
            autoTranscribe={true}
            withTranscription={true}
          />
        ) : (
          <>
            {mediaPreview && (
              <div className="mt-4">
                <Label>Media Preview</Label>
                <div className="mt-2">
                  {renderMediaPreview()}
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRecording(true)}
              >
                <Mic className="h-4 w-4 mr-2" />
                Record Audio
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileVideo className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,video/*,image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </>
        )}
        
        <div className="flex items-center space-x-2">
          <Switch
            id="isPublic"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
          <Label htmlFor="isPublic">Make story public</Label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        
        <Button
          onClick={handleSave}
          disabled={isSaving || isUploading || !title}
        >
          {isSaving || isUploading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              {isUploading ? 'Uploading...' : 'Saving...'}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Story
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default StoryEditor;
