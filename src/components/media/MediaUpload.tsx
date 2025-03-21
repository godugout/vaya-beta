
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud, X } from 'lucide-react';
import { useFileUpload } from './upload/useFileUpload';
import { FileItem } from './upload/FileItem';
import { MediaUploadProps } from './types';

export function MediaUpload({
  onUploadComplete,
  familyId,
  maxFileSize = 10, // Default to 10MB
  allowedFileTypes = [],
  multiple = false,
  showPreview = true
}: MediaUploadProps) {
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

  const handleUpload = async () => {
    const urls = await uploadFiles();
    
    if (urls) {
      onUploadComplete(urls);
    }
  };

  return (
    <div className="space-y-4">
      {/* File input button */}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 ${
            uploading ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {allowedFileTypes.length > 0
                ? `Supported formats: ${allowedFileTypes.map(type => type.split('/')[1]).join(', ')}`
                : 'All file types supported'} 
              (MAX: {maxFileSize}MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e, maxFileSize, allowedFileTypes, multiple)}
            multiple={multiple}
            ref={fileInputRef}
            disabled={uploading}
          />
        </label>
      </div>

      {/* File upload progress */}
      {showPreview && files.length > 0 && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Files to upload ({files.length})</h3>
                {!uploading && (
                  <Button variant="ghost" size="sm" onClick={resetUpload}>
                    <X className="h-4 w-4 mr-1" /> Clear all
                  </Button>
                )}
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {files.map((file, index) => (
                  <FileItem
                    key={index}
                    file={file}
                    index={index}
                    uploading={uploading}
                    onRemove={removeFile}
                    onTitleChange={(index, value) => updateFileMetadata(index, 'title', value)}
                    onDescriptionChange={(index, value) => updateFileMetadata(index, 'description', value)}
                    onTagsChange={(index, value) => updateFileTags(index, value)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Error display */}
      {errors.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg p-3 text-sm">
          <h4 className="font-semibold mb-1">Errors:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload button */}
      {files.length > 0 && (
        <div className="flex justify-end">
          <Button 
            onClick={handleUpload} 
            disabled={uploading || files.length === 0} 
            className="w-full sm:w-auto"
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} file${files.length === 1 ? '' : 's'}`}
          </Button>
        </div>
      )}
    </div>
  );
}
