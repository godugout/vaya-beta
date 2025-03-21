
// If this file already exists, we're just adding/updating the MediaUploadProps interface

export interface MediaAsset {
  id: string;
  title: string;
  description: string | null;
  file_path: string;
  file_type: string;
  created_at: string;
  tags: string[];
  annotations: any[];
  uploader_id: string | null;
  uploader_name?: string;
}

export interface MediaUploadProps {
  onUploadComplete: (urls: string[]) => void;
  familyId?: string;
  maxFileSize?: number; // in MB
  allowedFileTypes?: string[];
  multiple?: boolean;
  showPreview?: boolean;
}

export interface MediaGalleryProps {
  category?: string;
  limit?: number;
  onSelect?: (asset: MediaAsset) => void;
  className?: string;
  searchTerm?: string;
}
