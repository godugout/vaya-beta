
import { MediaAsset } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, FileIcon } from "lucide-react";

interface MediaCardProps {
  asset: MediaAsset;
  onClick: () => void;
}

export const MediaCard = ({ asset, onClick }: MediaCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-autumn dark:hover:border-leaf"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800/50 relative">
        {asset.file_type.startsWith('image/') ? (
          <img 
            src={asset.file_path} 
            alt={asset.title || 'Media item'}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <FileIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}
        
        {asset.annotations && asset.annotations.length > 0 && (
          <div className="absolute top-2 right-2 bg-autumn/80 text-white text-xs px-2 py-1 rounded-full">
            {asset.annotations.length} {asset.annotations.length === 1 ? 'annotation' : 'annotations'}
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{asset.title}</h3>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 space-x-3">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(asset.created_at)}
          </div>
          
          {asset.uploader_name && (
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {asset.uploader_name}
            </div>
          )}
        </div>
        
        {asset.tags && asset.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {asset.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                {tag}
              </Badge>
            ))}
            {asset.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                +{asset.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
