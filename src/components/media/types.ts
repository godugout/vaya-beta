
export interface MediaAsset {
  id: string;
  title: string;
  description: string;
  filePath: string;
  fileType: string;
  tags: string[];
  uploadDate: string;
  uploaderName?: string;
  annotations?: Array<{ id: string; content: string; position: { x: number; y: number } }>;
}

export interface MediaGalleryProps {
  category?: string;
  limit?: number;
  onSelect?: (asset: MediaAsset) => void;
  className?: string;
  searchTerm?: string;
}

export interface MediaUploadProps {
  onUploadComplete: (urls: string[]) => void;
  familyId?: string;
  maxFileSize?: number;
  allowedFileTypes?: string[];
  multiple?: boolean;
  showPreview?: boolean;
}
