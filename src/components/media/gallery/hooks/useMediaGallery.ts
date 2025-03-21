
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MediaAsset } from "../../types";
import { useToast } from "@/components/ui/use-toast";

export const useMediaGallery = (
  category?: string,
  limit: number = 30,
  searchTerm: string = ""
) => {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMediaAssets = async () => {
      try {
        setLoading(true);
        
        // Build the query
        let query = supabase.from('media_items').select(`
          id,
          title,
          description,
          file_path,
          file_type,
          tags,
          created_at
        `);
        
        // Filter by category if provided
        if (category) {
          query = query.eq('category', category);
        }
        
        // Apply search filter if provided
        if (searchTerm) {
          query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
        }
        
        // Get total count for pagination
        const { count: totalCount, error: countError } = await query.count();
        
        if (countError) throw countError;
        
        // Set total count
        setTotalCount(totalCount || 0);
        
        // Execute the query with limit
        const { data, error } = await query
          .order('created_at', { ascending: false })
          .limit(limit);
        
        if (error) throw error;
        
        // Transform the data into MediaAsset format
        const mediaAssets = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description || '',
          filePath: item.file_path,
          fileType: item.file_type,
          tags: item.tags || [],
          uploadDate: item.created_at
        }));
        
        setAssets(mediaAssets);
      } catch (error) {
        console.error('Error fetching media assets:', error);
        toast({
          title: "Failed to load media",
          description: "Could not retrieve media assets. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMediaAssets();
  }, [category, limit, searchTerm, toast]);

  return { assets, loading, totalCount };
};
