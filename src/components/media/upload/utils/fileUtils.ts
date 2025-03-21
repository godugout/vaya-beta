
import { FileWithMeta } from '../types';

/**
 * Updates the metadata for a file at the given index
 */
export const updateFileMetadata = (
  files: FileWithMeta[],
  index: number, 
  field: 'title' | 'description', 
  value: string
): FileWithMeta[] => {
  const newFiles = [...files];
  newFiles[index] = { ...newFiles[index], [field]: value };
  return newFiles;
};

/**
 * Updates the tags for a file at the given index
 */
export const updateFileTags = (
  files: FileWithMeta[],
  index: number, 
  value: string
): FileWithMeta[] => {
  const newFiles = [...files];
  newFiles[index] = { 
    ...newFiles[index], 
    tags: value.split(',').map(tag => tag.trim()).filter(tag => tag)
  };
  return newFiles;
};

/**
 * Updates the progress for a file at the given index
 */
export const updateFileProgress = (
  files: FileWithMeta[],
  index: number, 
  progress: number
): FileWithMeta[] => {
  const newFiles = [...files];
  newFiles[index] = { ...newFiles[index], progress };
  return newFiles;
};
