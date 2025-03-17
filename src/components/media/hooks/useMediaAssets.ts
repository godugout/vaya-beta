
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
          // The profiles object from the join query is an object, not an array
          const uploaderName = item.profiles ? item.profiles.full_name : 'Unknown user';
          
          return {
            ...item,
            uploader_name: uploaderName
          };
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
