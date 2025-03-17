
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'error' | 'complete';
  error?: string;
  path?: string;
}

interface MediaUploadProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFileSize?: number; // in MB
  allowedFileTypes?: string[];
  multiple?: boolean;
}

export const MediaUpload = ({
  onUploadComplete,
  maxFileSize = 50, // 50MB default limit
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'],
  multiple = true
}: MediaUploadProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];
    let hasErrors = false;

    Array.from(selectedFiles).forEach(file => {
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        newFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'error',
          error: `File exceeds maximum size of ${maxFileSize}MB`
        });
        hasErrors = true;
        return;
      }

      // Check file type
      if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(file.type)) {
        newFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'error',
          error: 'File type not supported'
        });
        hasErrors = true;
        return;
      }

      newFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'uploading'
      });
    });

    if (hasErrors) {
      toast({
        title: "Some files couldn't be uploaded",
        description: "Please check the file list for details",
        variant: "destructive",
      });
    }

    setFiles(prevFiles => [...prevFiles, ...newFiles]);

    // Start uploading valid files
    newFiles.filter(file => file.status === 'uploading').forEach((file, index) => {
      const fileObj = Array.from(selectedFiles).find(f => f.name === file.name);
      if (fileObj) {
        uploadFile(fileObj, prevFiles.length + index);
      }
    });
  };

  const uploadFile = async (file: File, fileIndex: number) => {
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setFiles(prevFiles => {
              const newFiles = [...prevFiles];
              if (newFiles[fileIndex]) {
                newFiles[fileIndex].progress = percent;
              }
              return newFiles;
            });
          }
        });

      if (error) {
        throw error;
      }

      // Get the public URL
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);

      setFiles(prevFiles => {
        const newFiles = [...prevFiles];
        if (newFiles[fileIndex]) {
          newFiles[fileIndex].status = 'complete';
          newFiles[fileIndex].progress = 100;
          newFiles[fileIndex].path = urlData.publicUrl;
        }
        return newFiles;
      });

      // Notify parent component
      const successfulUploads = files
        .filter(f => f.status === 'complete')
        .map(f => f.path || '');
      
      if (successfulUploads.length > 0 && onUploadComplete) {
        onUploadComplete(successfulUploads);
      }

      // Store metadata in database
      await storeMediaMetadata({
        file_path: urlData.publicUrl,
        title: file.name,
        file_type: file.type,
        file_size: file.size,
        original_filename: file.name
      });

      toast({
        title: "File uploaded successfully",
        description: file.name,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      
      setFiles(prevFiles => {
        const newFiles = [...prevFiles];
        if (newFiles[fileIndex]) {
          newFiles[fileIndex].status = 'error';
          newFiles[fileIndex].error = error.message || 'Upload failed';
        }
        return newFiles;
      });

      toast({
        title: "Upload failed",
        description: error.message || 'An error occurred during upload',
        variant: "destructive",
      });
    }
  };

  const storeMediaMetadata = async (metadata: {
    file_path: string;
    title: string;
    file_type: string;
    file_size: number;
    original_filename: string;
  }) => {
    try {
      const { error } = await supabase
        .from('media_items')
        .insert([{
          file_path: metadata.file_path,
          title: metadata.title,
          file_type: metadata.file_type,
          file_size: metadata.file_size,
          original_filename: metadata.original_filename,
          tags: ['family', 'photo', 'historical'],
          annotations: []
        }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error storing metadata:', error);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

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
    handleFileChange(e.dataTransfer.files);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full space-y-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 dark:border-gray-700 hover:border-primary'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center py-4">
          <Upload className="h-10 w-10 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            Drag and drop your files here, or{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary" 
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              browse
            </Button>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Maximum file size: {maxFileSize}MB
          </p>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
            multiple={multiple}
            accept={allowedFileTypes.join(',')}
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-2">Uploads ({files.length})</h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center text-sm">
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium truncate">{file.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                  {file.status === 'uploading' && (
                    <Progress value={file.progress} className="h-1.5" />
                  )}
                  {file.status === 'error' && (
                    <div className="flex items-center text-xs text-red-500 mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {file.error}
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-shrink-0">
                  {file.status === 'complete' ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
