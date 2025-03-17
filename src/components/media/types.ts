
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
  profiles?: {
    full_name: string;
  } | null;
}

export interface MediaGalleryProps {
  category?: string;
  limit?: number;
  onSelect?: (asset: MediaAsset) => void;
  className?: string;
  searchTerm?: string;
}
