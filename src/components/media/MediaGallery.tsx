
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Tag, ImageIcon, FileIcon, User } from "lucide-react";

interface MediaAsset {
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
}

interface MediaGalleryProps {
  category?: string;
  limit?: number;
  onSelect?: (asset: MediaAsset) => void;
  className?: string;
  searchTerm?: string;
}

export const MediaGallery = ({ 
  category, 
  limit = 30, 
  onSelect, 
  className = "",
  searchTerm = ""
}: MediaGalleryProps) => {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      
      try {
        let query = supabase
          .from('media_items')
          .select(`
            id,
            title,
            description,
            file_path,
            file_type,
            created_at,
            tags,
            annotations,
            uploader_id,
            profiles:uploader_id(full_name)
          `)
          .order('created_at', { ascending: false });
        
        if (category) {
          query = query.eq('category', category);
        }
        
        if (searchTerm) {
          query = query.ilike('title', `%${searchTerm}%`);
        }
        
        if (limit > 0) {
          query = query.limit(limit);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        // Process the data to add uploader name
        const processedData = data?.map(item => ({
          ...item,
          uploader_name: item.profiles?.full_name || 'Unknown user'
        })) || [];
        
        setAssets(processedData);
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
  }, [category, limit, toast, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`${className}`}>
      {loading ? (
        // Loading skeleton
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="overflow-hidden bg-gray-100 dark:bg-gray-800/50 animate-pulse">
              <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
              <CardContent className="p-4">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : assets.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <Card 
              key={asset.id} 
              className="overflow-hidden transition-all hover:shadow-md cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-autumn dark:hover:border-leaf"
              onClick={() => onSelect && onSelect(asset)}
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
          ))}
        </div>
      )}
    </div>
  );
};
