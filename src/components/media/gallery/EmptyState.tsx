
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  searchTerm?: string;
}

export const EmptyState = ({ searchTerm }: EmptyStateProps) => {
  return (
    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <ImageIcon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No media found</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        {searchTerm 
          ? `No results matching "${searchTerm}"`
          : "Upload photos and media to start building your family archive"}
      </p>
      <Button 
        onClick={() => window.location.href = '/media-library-enhanced?tab=upload'}
        variant="outline"
      >
        Upload Images
      </Button>
    </div>
  );
};
