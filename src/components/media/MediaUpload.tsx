
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { FileItem } from './upload/FileItem';
import { ErrorDisplay } from './upload/ErrorDisplay';
import { useFileUpload } from './upload/useFileUpload';
import { MediaUploadProps } from './upload/types';

export const MediaUpload = ({
  onUploadComplete,
  maxFileSize = 50,
  allowedFileTypes = ['image/*'],
  multiple = false,
  familyId,
}: MediaUploadProps) => {
  const {
    files,
    uploading,
    errors,
    fileInputRef,
    handleFileChange,
    removeFile,
    updateFileMetadata,
    updateFileTags,
    uploadFiles,
    resetUpload
  } = useFileUpload(familyId);

  const handleUploadComplete = async () => {
    const urls = await uploadFiles();
    if (urls && onUploadComplete) {
      onUploadComplete(urls);
      resetUpload();
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
          onChange={(e) => handleFileChange(e, maxFileSize, allowedFileTypes, multiple)}
          disabled={uploading}
          ref={fileInputRef}
          className="mt-1"
        />
      </div>
      
      {/* Display selected files */}
      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file, index) => (
            <FileItem
              key={index}
              file={file}
              index={index}
              uploading={uploading}
              onRemove={removeFile}
              onTitleChange={(index, value) => updateFileMetadata(index, 'title', value)}
              onDescriptionChange={(index, value) => updateFileMetadata(index, 'description', value)}
              onTagsChange={updateFileTags}
            />
          ))}
        </div>
      )}
      
      {/* Display errors */}
      <ErrorDisplay errors={errors} />
      
      {/* Upload button */}
      <Button 
        onClick={handleUploadComplete} 
        disabled={uploading || files.length === 0} 
        className="w-full"
      >
        {uploading ? (
          <>Uploading...</>
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
