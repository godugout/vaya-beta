
import { FileError } from '../types';

/**
 * Validates files against size and type restrictions
 */
export const validateFiles = (
  selectedFiles: File[], 
  maxFileSize: number, 
  allowedFileTypes: string[]
): { validFiles: File[]; errors: string[] } => {
  const validFiles: File[] = [];
  const errors: string[] = [];
  
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
      errors.push(`${file.name}: Unsupported file type`);
    } else if (!isFileSizeValid) {
      errors.push(`${file.name}: File size exceeds ${maxFileSize}MB limit`);
    } else {
      validFiles.push(file);
    }
  });

  return { validFiles, errors };
};
