
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
  onUploadComplete: () => void;
  familyId?: string;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  showPreview?: boolean;
}
