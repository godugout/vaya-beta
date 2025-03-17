
import { ImageAnnotation } from "../ImageAnnotation";
import { MediaDetailHeader } from "./MediaDetailHeader";
import { MediaMetadata } from "./MediaMetadata";

interface MediaDetailContentProps {
  mediaItem: {
    id: string;
    title: string;
    description: string | null;
    file_path: string;
    file_type: string;
    file_size: number;
    created_at: string;
    tags: string[];
    annotations: {
      id: string;
      x: number;
      y: number;
      text: string;
      type: 'object' | 'person' | 'location' | 'building' | 'other';
    }[];
    uploader_name?: string;
  };
  onBack: () => void;
}

export const MediaDetailContent = ({ mediaItem, onBack }: MediaDetailContentProps) => {
  return (
    <div className="space-y-6">
      <MediaDetailHeader filePath={mediaItem.file_path} onBack={onBack} />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="relative">
          <ImageAnnotation
            imageSrc={mediaItem.file_path}
            imageId={mediaItem.id}
            initialAnnotations={mediaItem.annotations}
          />
        </div>
        
        <MediaMetadata
          title={mediaItem.title}
          description={mediaItem.description}
          createdAt={mediaItem.created_at}
          uploaderName={mediaItem.uploader_name || 'Unknown user'}
          fileSize={mediaItem.file_size}
          tags={mediaItem.tags}
          annotationsCount={mediaItem.annotations?.length || 0}
        />
      </div>
    </div>
  );
};
