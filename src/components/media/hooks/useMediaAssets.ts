
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MediaAsset } from "../types";
import { useToast } from "@/components/ui/use-toast";

export const useMediaAssets = (
  category?: string,
  limit: number = 30,
  searchTerm: string = ""
) => {
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
            file_size,
            original_filename,
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
        const processedData: MediaAsset[] = data?.map(item => {
          // Extract uploader name from profiles object in a type-safe way
          let uploaderName = 'Unknown user';
          if (item.profiles && typeof item.profiles === 'object') {
            // Check if it's a valid object with the full_name property
            if ('full_name' in item.profiles && typeof item.profiles.full_name === 'string') {
              uploaderName = item.profiles.full_name;
            }
          }
          
          // Create a clean MediaAsset object without the profiles property
          const asset: MediaAsset = {
            id: item.id,
            title: item.title,
            description: item.description,
            file_path: item.file_path,
            file_type: item.file_type,
            created_at: item.created_at,
            tags: item.tags || [],
            annotations: item.annotations || [],
            uploader_id: item.uploader_id,
            uploader_name: uploaderName
          };
          
          return asset;
        }) || [];
        
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

  return { assets, loading };
};
