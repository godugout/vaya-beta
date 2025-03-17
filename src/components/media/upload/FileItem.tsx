
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { FileText, X } from 'lucide-react';
import { FileWithMeta } from './types';

interface FileItemProps {
  file: FileWithMeta;
  index: number;
  uploading: boolean;
  onRemove: (index: number) => void;
  onTitleChange: (index: number, value: string) => void;
  onDescriptionChange: (index: number, value: string) => void;
  onTagsChange: (index: number, value: string) => void;
}

export const FileItem: React.FC<FileItemProps> = ({
  file,
  index,
  uploading,
  onRemove,
  onTitleChange,
  onDescriptionChange,
  onTagsChange
}) => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-5 w-5 text-gray-500" />
          <div>
            <p className="font-medium">{file.file.name}</p>
            <p className="text-sm text-gray-500">
              {file.file.type} - {(file.file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onRemove(index)} 
          disabled={uploading}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Progress bar */}
      {uploading && <Progress value={file.progress} className="mt-2" />}
      
      {/* Title input */}
      <div className="mt-3">
        <Label htmlFor={`title-${index}`}>Title</Label>
        <Input
          type="text"
          id={`title-${index}`}
          placeholder="Enter title"
          value={file.title || ''}
          onChange={(e) => onTitleChange(index, e.target.value)}
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
          value={file.description || ''}
          onChange={(e) => onDescriptionChange(index, e.target.value)}
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
          value={file.tags?.join(', ') || ''}
          onChange={(e) => onTagsChange(index, e.target.value)}
          disabled={uploading}
        />
      </div>
    </div>
  );
};
