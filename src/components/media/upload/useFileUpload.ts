
import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import { FileWithMeta } from './types';

export const useFileUpload = (familyId?: string) => {
  const [files, setFiles] = useState<FileWithMeta[]>([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFiles = (selectedFiles: File[], maxFileSize: number, allowedFileTypes: string[]) => {
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

    return { validFiles, newErrors };
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, maxFileSize: number, allowedFileTypes: string[], multiple: boolean) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    
    const selectedFiles = Array.from(event.target.files);
    const { validFiles, newErrors } = validateFiles(selectedFiles, maxFileSize, allowedFileTypes);
    
    if (newErrors.length > 0) {
      setErrors(prev => [...prev, ...newErrors]);
    }
    
    if (validFiles.length > 0) {
      const newFilesWithMeta: FileWithMeta[] = validFiles.map(file => ({
        file,
        progress: 0,
        title: file.name.split('.')[0],
        description: '',
        tags: []
      }));
      
      setFiles(prev => multiple ? [...prev, ...newFilesWithMeta] : newFilesWithMeta);
    }
    
    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const updateFileMetadata = (index: number, field: 'title' | 'description', value: string) => {
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles[index] = { ...newFiles[index], [field]: value };
      return newFiles;
    });
  };

  const updateFileTags = (index: number, value: string) => {
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles[index] = { 
        ...newFiles[index], 
        tags: value.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      return newFiles;
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const fileWithMeta = files[i];
        const file = fileWithMeta.file;
        const fileId = uuidv4();
        const fileExt = file.name.split('.').pop();
        const fileName = `${fileId}.${fileExt}`;
        const filePath = `${fileName}`;
        
        // Update progress
        setFiles(prev => {
          const newFiles = [...prev];
          newFiles[i] = { ...newFiles[i], progress: 30 };
          return newFiles;
        });
        
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
        
        // Update progress
        setFiles(prev => {
          const newFiles = [...prev];
          newFiles[i] = { ...newFiles[i], progress: 60 };
          return newFiles;
        });
        
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
            title: fileWithMeta.title || file.name.split('.')[0],
            description: fileWithMeta.description || null,
            file_path: publicUrl,
            file_type: file.type,
            file_size: file.size,
            original_filename: file.name,
            tags: fileWithMeta.tags || [],
            annotations: [],
            family_id: familyId || null,
          });
        
        if (insertError) {
          throw new Error(`Error creating media item record: ${insertError.message}`);
        }
        
        // Update to completed progress
        setFiles(prev => {
          const newFiles = [...prev];
          newFiles[i] = { ...newFiles[i], progress: 100 };
          return newFiles;
        });
      }
      
      // All uploads completed
      toast({
        title: "Upload successful",
        description: `Successfully uploaded ${files.length} file${files.length === 1 ? '' : 's'}`,
      });
      
      return uploadedUrls;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    files,
    uploading,
    errors,
    fileInputRef,
    handleFileChange,
    removeFile,
    updateFileMetadata,
    updateFileTags,
    uploadFiles,
    resetUpload: () => {
      setFiles([]);
      setErrors([]);
    }
  };
};
