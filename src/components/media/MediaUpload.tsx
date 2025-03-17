import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X, Upload, FileText, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface MediaUploadProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFileSize?: number; // in MB
  allowedFileTypes?: string[];
  multiple?: boolean;
}

interface FileWithPreview extends File {
  id: string;
  preview?: string;
  progress: number;
  error?: string;
  uploaded?: boolean;
  path?: string;
}

export const MediaUpload = ({
  onUploadComplete,
  maxFileSize = 10, // Default 10MB
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'],
  multiple = false
}: MediaUploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (maxFileSize && file.size > maxFileSize * 1024 * 1024) {
      return { valid: false, error: `File is too large. Maximum size is ${maxFileSize}MB.` };
    }
    
    if (allowedFileTypes && !allowedFileTypes.includes(file.type)) {
      return { valid: false, error: `File type not supported. Allowed types: ${allowedFileTypes.map(type => type.split('/')[1]).join(', ')}` };
    }
    
    return { valid: true };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    handleFiles(Array.from(selectedFiles));
    // Reset the input value so the same file can be selected again
    e.target.value = '';
  };

  const handleFiles = (selectedFiles: File[]) => {
    const newFiles = selectedFiles.map(file => {
      const validation = validateFile(file);
      const fileWithPreview = {
        ...file,
        id: Math.random().toString(36).substring(2, 9),
        progress: 0,
        error: validation.valid ? undefined : validation.error
      } as FileWithPreview;
      
      // Create preview for image files
      if (file.type.startsWith('image/') && validation.valid) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }
      
      return fileWithPreview;
    });
    
    // Update with new files, keeping previous files if multiple is true
    setFiles(prevFiles => (multiple ? [...prevFiles, ...newFiles] : newFiles));
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length === 0) return;
    
    handleFiles(droppedFiles);
  };

  const removeFile = (fileId: string) => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(file => file.id !== fileId);
      // Release object URL to prevent memory leaks
      const fileToRemove = prevFiles.find(file => file.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updatedFiles;
    });
  };

  const updateFileProgress = (fileId: string, progress: number) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId ? { ...file, progress } : file
      )
    );
  };

  const updateFileError = (fileId: string, error: string) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId ? { ...file, error, progress: 0 } : file
      )
    );
  };

  const updateFileComplete = (fileId: string, path: string) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId ? { ...file, uploaded: true, path, progress: 100 } : file
      )
    );
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to upload",
        variant: "destructive",
      });
      return;
    }
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your upload",
        variant: "destructive",
      });
      return;
    }
    
    const validFiles = files.filter(file => !file.error && !file.uploaded);
    if (validFiles.length === 0) {
      toast({
        title: "No valid files",
        description: "Please select valid files to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    const uploadedPaths: string[] = [];
    
    try {
      for (const file of validFiles) {
        // Create a unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 9)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('media')
          .upload(filePath, file, {
            cacheControl: '3600',
            // Use custom upload handler to track progress 
            onUploadProgress: (progress) => {
              const percent = Math.round((progress.loaded / progress.total) * 100);
              updateFileProgress(file.id, percent);
            }
          });
        
        if (error) {
          console.error('Error uploading file:', error);
          updateFileError(file.id, error.message);
          continue;
        }
        
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);
          
        updateFileComplete(file.id, publicUrl);
        uploadedPaths.push(publicUrl);
        
        // Create database entry
        const { error: dbError } = await supabase
          .from('media_items')
          .insert({
            title: title,
            description: description || null,
            file_path: publicUrl,
            file_type: file.type,
            file_size: file.size,
            original_filename: file.name,
            tags: tags.length > 0 ? tags : null,
            annotations: [] // Start with empty annotations
          });
          
        if (dbError) {
          console.error('Error saving to database:', dbError);
          toast({
            title: "Database error",
            description: "File uploaded but could not save details to database",
            variant: "destructive",
          });
        }
      }
      
      if (uploadedPaths.length > 0) {
        toast({
          title: "Upload successful",
          description: `Successfully uploaded ${uploadedPaths.length} file${uploadedPaths.length > 1 ? 's' : ''}`,
        });
        
        if (onUploadComplete) {
          onUploadComplete(uploadedPaths);
        }
        
        // Reset form if all files were successful
        if (uploadedPaths.length === validFiles.length) {
          setTitle('');
          setDescription('');
          setTags([]);
          setFiles([]);
        }
      }
    } catch (error) {
      console.error('Unexpected error during upload:', error);
      toast({
        title: "Upload failed",
        description: "An unexpected error occurred during upload",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* File Drop Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <Upload className="h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium">Drag and drop your files here</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            or click the button below to select files
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            variant="outline"
          >
            Select Files
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept={allowedFileTypes.join(',')}
            multiple={multiple}
            disabled={isUploading}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Maximum file size: {maxFileSize}MB<br />
            Supported formats: {allowedFileTypes.map(type => type.split('/')[1]).join(', ')}
          </p>
        </div>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Selected Files ({files.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map(file => (
              <Card key={file.id} className={`overflow-hidden ${file.error ? 'border-red-300' : ''}`}>
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative">
                  {file.preview ? (
                    <img 
                      src={file.preview} 
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {file.type.startsWith('image/') ? (
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      ) : (
                        <FileText className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                  )}
                  
                  <button 
                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    onClick={() => removeFile(file.id)}
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  {file.error && (
                    <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs p-1">
                      <div className="flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Error
                      </div>
                    </div>
                  )}
                  
                  {file.uploaded && (
                    <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs p-1">
                      Uploaded
                    </div>
                  )}
                </div>
                
                <CardContent className="p-3">
                  <p className="text-sm truncate" title={file.name}>{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  
                  {file.error ? (
                    <p className="text-xs text-red-500 mt-1">{file.error}</p>
                  ) : (
                    <Progress value={file.progress} className="h-1 mt-2" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Metadata Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter a title for your upload"
            disabled={isUploading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            disabled={isUploading}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex items-center">
            <Input
              id="tags"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              onBlur={addTag}
              placeholder="Add tags and press Enter"
              disabled={isUploading}
              className="flex-grow"
            />
            <Button 
              type="button" 
              variant="ghost" 
              onClick={addTag} 
              disabled={isUploading || !tagInput.trim()}
              className="ml-2"
            >
              Add
            </Button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  {tag}
                  <button 
                    onClick={() => removeTag(tag)}
                    className="h-4 w-4 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 inline-flex items-center justify-center"
                    disabled={isUploading}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <Button
          onClick={uploadFiles}
          disabled={isUploading || files.length === 0 || !title.trim()}
          className="w-full mt-4"
        >
          {isUploading ? "Uploading..." : "Upload Files"}
        </Button>
      </div>
    </div>
  );
};
