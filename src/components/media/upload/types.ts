
export interface FileWithMeta {
  file: File;
  progress: number;
  title: string;
  description: string;
  tags: string[];
}

export interface MediaUploadProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFileSize?: number; // in MB
  allowedFileTypes?: string[];
  multiple?: boolean;
  familyId?: string;
}
