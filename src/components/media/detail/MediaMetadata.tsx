
import { Calendar, Info, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MediaMetadataProps {
  title: string;
  description: string | null;
  createdAt: string;
  uploaderName: string;
  fileSize: number;
  tags: string[];
  annotationsCount: number;
}

export const MediaMetadata = ({
  title,
  description,
  createdAt,
  uploaderName,
  fileSize,
  tags,
  annotationsCount
}: MediaMetadataProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && (
          <p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(createdAt)}
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <User className="h-4 w-4 mr-2" />
          {uploaderName}
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Info className="h-4 w-4 mr-2" />
          {formatFileSize(fileSize)}
        </div>
      </div>
      
      {tags && tags.length > 0 && (
        <div>
          <div className="flex items-center mb-2 text-sm text-gray-500 dark:text-gray-400">
            <Tag className="h-4 w-4 mr-2" />
            Tags
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <div className="pt-2">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Click on the image to add annotations and identify objects, people, or locations.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {annotationsCount 
            ? `${annotationsCount} annotation${annotationsCount === 1 ? '' : 's'} added`
            : 'No annotations yet. Click on the image to add the first one.'}
        </p>
      </div>
    </div>
  );
};
