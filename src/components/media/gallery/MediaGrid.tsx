
import { memo } from "react";
import { MediaAsset } from "../types";
import { MediaCard } from "./MediaCard";

interface MediaGridProps {
  assets: MediaAsset[];
  onSelect: (asset: MediaAsset) => void;
}

// Using memo to prevent unnecessary re-renders
export const MediaGrid = memo(({ assets, onSelect }: MediaGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {assets.map((asset) => (
        <MediaCard
          key={asset.id}
          asset={asset}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
});

MediaGrid.displayName = "MediaGrid";
