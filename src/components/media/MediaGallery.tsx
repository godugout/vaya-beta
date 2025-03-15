
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface MediaAsset {
  id: string;
  title: string;
  description: string | null;
  file_path: string;
  alt_text: string;
  category: string;
  tags: string[];
}

interface MediaGalleryProps {
  category?: string;
  limit?: number;
  onSelect?: (asset: MediaAsset) => void;
  className?: string;
}

export const MediaGallery = ({ 
  category, 
  limit = 9, 
  onSelect, 
  className = "" 
}: MediaGalleryProps) => {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      
      try {
        let query = supabase.from('media_assets').select('*');
        
        if (category) {
          query = query.eq('category', category);
        }
        
        if (limit > 0) {
          query = query.limit(limit);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setAssets(data as MediaAsset[]);
      } catch (error) {
        console.error('Error fetching media assets:', error);
        toast({
          title: "Error loading media",
          description: "Could not load media assets from the library",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssets();
  }, [category, limit, toast]);

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden bg-gray-100 dark:bg-dark-background-surface animate-pulse">
              <div className="aspect-video bg-gray-200 dark:bg-dark-background-elevated" />
              <CardContent className="p-4">
                <div className="h-5 bg-gray-200 dark:bg-dark-background-elevated rounded mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-dark-background-elevated rounded w-2/3" />
              </CardContent>
            </Card>
          ))
        ) : assets.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-dark-text-secondary">No media assets found</p>
          </div>
        ) : (
          assets.map((asset) => (
            <Card 
              key={asset.id} 
              className="overflow-hidden transition-all hover:shadow-md cursor-pointer border border-transparent hover:border-autumn dark:hover:border-leaf"
              onClick={() => onSelect && onSelect(asset)}
            >
              <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-dark-background-surface">
                <img 
                  src={asset.file_path} 
                  alt={asset.alt_text}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-1">{asset.title}</h3>
                {asset.description && (
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary line-clamp-2">{asset.description}</p>
                )}
                <div className="flex flex-wrap gap-1 mt-2">
                  {asset.tags && asset.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-0.5 bg-black/5 dark:bg-white/10 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
