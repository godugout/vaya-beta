
import { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { FileWithMeta } from './types';
import { validateFiles } from './utils/fileValidation';
import { updateFileMetadata, updateFileTags, updateFileProgress } from './utils/fileUtils';
import { uploadFileToStorage, createMediaRecord } from './services/uploadService';

export const useFileUpload = (familyId?: string) => {
  const [files, setFiles] = useState<FileWithMeta[]>([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>, 
    maxFileSize: number, 
    allowedFileTypes: string[], 
    multiple: boolean
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    
    const selectedFiles = Array.from(event.target.files);
    const { validFiles, errors: newErrors } = validateFiles(selectedFiles, maxFileSize, allowedFileTypes);
    
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

  const handleUpdateFileMetadata = (index: number, field: 'title' | 'description', value: string) => {
    setFiles(prev => updateFileMetadata(prev, index, field, value));
  };

  const handleUpdateFileTags = (index: number, value: string) => {
    setFiles(prev => updateFileTags(prev, index, value));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const fileWithMeta = files[i];
        const file = fileWithMeta.file;
        
        // Update progress to 30%
        setFiles(prev => updateFileProgress(prev, i, 30));
        
        // Upload file to storage
        const uploadResult = await uploadFileToStorage(file);
        
        if (!uploadResult) {
          throw new Error(`Error uploading file: ${file.name}`);
        }
        
        const { fileId, publicUrl } = uploadResult;
        
        // Update progress to 60%
        setFiles(prev => updateFileProgress(prev, i, 60));
        
        uploadedUrls.push(publicUrl);
        
        // Create a record in the media_items table
        const success = await createMediaRecord(fileId, publicUrl, file, fileWithMeta, familyId);
        
        if (!success) {
          throw new Error(`Error creating media item record for ${file.name}`);
        }
        
        // Update to completed progress
        setFiles(prev => updateFileProgress(prev, i, 100));
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
    updateFileMetadata: handleUpdateFileMetadata,
    updateFileTags: handleUpdateFileTags,
    uploadFiles,
    resetUpload: () => {
      setFiles([]);
      setErrors([]);
    }
  };
};
