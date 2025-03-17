
import { useMediaAssets } from "./hooks/useMediaAssets";
import { MediaGrid } from "./gallery/MediaGrid";
import { LoadingSkeleton } from "./gallery/LoadingSkeleton";
import { EmptyState } from "./gallery/EmptyState";
import { MediaGalleryProps } from "./types";

export const MediaGallery = ({ 
  category, 
  limit = 30, 
  onSelect, 
  className = "",
  searchTerm = ""
}: MediaGalleryProps) => {
  const { assets, loading } = useMediaAssets(category, limit, searchTerm);

  return (
    <div className={`${className}`}>
      {loading ? (
        <LoadingSkeleton />
      ) : assets.length === 0 ? (
        <EmptyState searchTerm={searchTerm} />
      ) : (
        <MediaGrid assets={assets} onSelect={(asset) => onSelect && onSelect(asset)} />
      )}
    </div>
  );
};
