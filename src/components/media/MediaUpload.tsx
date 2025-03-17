import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';

interface MediaUploadProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFileSize?: number; // in MB
  allowedFileTypes?: string[];
  multiple?: boolean;
}

export const MediaUpload = ({
  onUploadComplete,
  maxFileSize = 50,
  allowedFileTypes = ['image/*'],
  multiple = false
}: MediaUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[][]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    
    const selectedFiles = Array.from(event.target.files);
    
    // Validate file types and sizes
    const validFiles: File[] = [];
    const newErrors: string[] = [];
    
    selectedFiles.forEach(file => {
      // Check file type if allowed types are specified
      const isTypeAllowed = allowedFileTypes.length === 0 || 
        allowedFileTypes.some(type => {
          if (type.endsWith('/*')) {
            const category = type.split('/')[0];
            return file.type.startsWith(`${category}/`);
          }
          return file.type === type;
        });
      
      // Check file size
      const isFileSizeValid = file.size <= maxFileSize * 1024 * 1024;
      
      if (!isTypeAllowed) {
        newErrors.push(`${file.name}: Unsupported file type`);
      } else if (!isFileSizeValid) {
        newErrors.push(`${file.name}: File size exceeds ${maxFileSize}MB limit`);
      } else {
        validFiles.push(file);
      }
    });
    
    if (newErrors.length > 0) {
      setErrors(prev => [...prev, ...newErrors]);
    }
    
    if (validFiles.length > 0) {
      setFiles(prev => multiple ? [...prev, ...validFiles] : validFiles);
      setProgress(prev => {
        const newProgress = [...prev];
        validFiles.forEach(() => newProgress.push(0));
        return newProgress;
      });
      setTitles(prev => {
        const newTitles = [...prev];
        validFiles.forEach(file => newTitles.push(file.name.split('.')[0]));
        return newTitles;
      });
      setDescriptions(prev => {
        const newDescriptions = [...prev];
        validFiles.forEach(() => newDescriptions.push(''));
        return newDescriptions;
      });
      setTags(prev => {
        const newTags = [...prev];
        validFiles.forEach(() => newTags.push([]));
        return newTags;
      });
    }
    
    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setProgress(prev => prev.filter((_, i) => i !== index));
    setTitles(prev => prev.filter((_, i) => i !== index));
    setDescriptions(prev => prev.filter((_, i) => i !== index));
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  const handleTitleChange = (index: number, value: string) => {
    setTitles(prev => {
      const newTitles = [...prev];
      newTitles[index] = value;
      return newTitles;
    });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    setDescriptions(prev => {
      const newDescriptions = [...prev];
      newDescriptions[index] = value;
      return newDescriptions;
    });
  };

  const handleTagsChange = (index: number, value: string) => {
    setTags(prev => {
      const newTags = [...prev];
      newTags[index] = value.split(',').map(tag => tag.trim()).filter(tag => tag);
      return newTags;
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileId = uuidv4();
        const fileExt = file.name.split('.').pop();
        const fileName = `${fileId}.${fileExt}`;
        const filePath = `${fileName}`;
        
        // Custom progress tracking
        const onProgress = (progress: number) => {
          setProgress(prev => {
            const newProgress = [...prev];
            newProgress[i] = progress;
            return newProgress;
          });
        };
        
        // Upload file to storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }
        
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);
        
        uploadedUrls.push(publicUrl);
        
        // Create a record in the media_items table
        const { error: insertError } = await supabase
          .from('media_items')
          .insert({
            id: fileId,
            title: titles[i] || file.name.split('.')[0],
            description: descriptions[i] || null,
            file_path: publicUrl,
            file_type: file.type,
            file_size: file.size,
            original_filename: file.name,
            tags: tags[i] || [],
            annotations: []
          });
        
        if (insertError) {
          throw new Error(`Error creating media item record: ${insertError.message}`);
        }
        
        // Simulate progress for UI since we can't use onUploadProgress directly
        onProgress(100);
      }
      
      // All uploads completed
      toast({
        title: "Upload successful",
        description: `Successfully uploaded ${files.length} file${files.length === 1 ? '' : 's'}`,
      });
      
      if (onUploadComplete) {
        onUploadComplete(uploadedUrls);
      }
      
      // Reset the form
      setFiles([]);
      setProgress([]);
      setTitles([]);
      setDescriptions([]);
      setTags([]);
      setErrors([]);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* File input */}
      <div>
        <Label htmlFor="media-upload">
          Select Files
        </Label>
        <Input
          type="file"
          id="media-upload"
          multiple={multiple}
          accept={allowedFileTypes.join(',')}
          onChange={handleFileChange}
          disabled={uploading}
          ref={fileInputRef}
          className="mt-1"
        />
      </div>
      
      {/* Display selected files */}
      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file, index) => (
            <div key={index} className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.type} - {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeFile(index)} disabled={uploading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Progress bar */}
              {uploading && (
                <Progress value={progress[index]} className="mt-2" />
              )}
              
              {/* Title input */}
              <div className="mt-3">
                <Label htmlFor={`title-${index}`}>Title</Label>
                <Input
                  type="text"
                  id={`title-${index}`}
                  placeholder="Enter title"
                  value={titles[index] || ''}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                  disabled={uploading}
                />
              </div>
              
              {/* Description input */}
              <div className="mt-3">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Input
                  type="text"
                  id={`description-${index}`}
                  placeholder="Enter description"
                  value={descriptions[index] || ''}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  disabled={uploading}
                />
              </div>
              
              {/* Tags input */}
              <div className="mt-3">
                <Label htmlFor={`tags-${index}`}>Tags (comma separated)</Label>
                <Input
                  type="text"
                  id={`tags-${index}`}
                  placeholder="Enter tags"
                  value={tags[index]?.join(', ') || ''}
                  onChange={(e) => handleTagsChange(index, e.target.value)}
                  disabled={uploading}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Display errors */}
      {errors.length > 0 && (
        <div className="text-red-500">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      
      {/* Upload button */}
      <Button onClick={uploadFiles} disabled={uploading || files.length === 0} className="w-full">
        {uploading ? (
          <>
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </>
        )}
      </Button>
    </div>
  );
};
