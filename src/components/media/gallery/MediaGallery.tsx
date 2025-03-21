
import { useState, useEffect } from "react";
import { useMediaGallery } from "./hooks/useMediaGallery";
import { MediaGrid } from "./MediaGrid";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { EmptyState } from "./EmptyState";
import { MediaPagination } from "./MediaPagination";
import { MediaGalleryProps } from "../types";

export const MediaGallery = ({ 
  category, 
  limit = 30, 
  onSelect, 
  className = "",
  searchTerm = ""
}: MediaGalleryProps) => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(limit);
  const { assets, loading, totalCount } = useMediaGallery(category, itemsPerPage, searchTerm);

  // Reset to first page when search term changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm, category]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Calculate the current page of items
  const paginatedAssets = assets.slice(
    (page - 1) * itemsPerPage, 
    Math.min(page * itemsPerPage, assets.length)
  );

  const handlePageChange = (newPage: number) => {
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(newPage);
  };

  return (
    <div className={`${className}`}>
      {loading ? (
        <LoadingSkeleton />
      ) : assets.length === 0 ? (
        <EmptyState searchTerm={searchTerm} />
      ) : (
        <>
          <MediaGrid assets={paginatedAssets} onSelect={(asset) => onSelect && onSelect(asset)} />
          <MediaPagination 
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
