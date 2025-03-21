
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MediaAsset } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface MediaCardProps {
  asset: MediaAsset;
  onSelect: (asset: MediaAsset) => void;
}

// Use React.memo to prevent unnecessary re-renders
const MediaCard = React.memo(({ asset, onSelect }: MediaCardProps) => {
  const handleClick = () => {
    onSelect(asset);
  };

  // Function to determine the appropriate icon based on file type
  const getFileTypeIcon = () => {
    const type = asset.fileType.toLowerCase();
    
    if (type.includes('image')) {
      return "🖼️";
    } else if (type.includes('video')) {
      return "🎬";
    } else if (type.includes('audio')) {
      return "🎵";
    } else if (type.includes('pdf')) {
      return "📄";
    } else {
      return "📁";
    }
  };

  // Function to display annotation count if present
  const getAnnotationInfo = () => {
    if (asset.annotations && asset.annotations.length > 0) {
      return (
        <span className="inline-flex items-center text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
          {asset.annotations.length} annotation{asset.annotations.length !== 1 ? 's' : ''}
        </span>
      );
    }
    return null;
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img 
          src={asset.filePath} 
          alt={asset.title}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute top-2 right-2 text-xl">
          {getFileTypeIcon()}
        </div>
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm truncate">{asset.title}</h3>
        <div className="mt-1 flex flex-wrap gap-1 items-center text-gray-500 dark:text-gray-400">
          <time className="text-xs" dateTime={asset.uploadDate}>
            {formatDistanceToNow(new Date(asset.uploadDate), { addSuffix: true })}
          </time>
          {asset.uploaderName && (
            <>
              <span className="text-xs mx-1">•</span>
              <span className="text-xs">{asset.uploaderName}</span>
            </>
          )}
          {getAnnotationInfo()}
        </div>
      </CardContent>
    </Card>
  );
});

MediaCard.displayName = 'MediaCard';

export { MediaCard };
export type { MediaCardProps };
