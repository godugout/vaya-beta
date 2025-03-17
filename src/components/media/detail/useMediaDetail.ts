
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface MediaItemDetail {
  id: string;
  title: string;
  description: string | null;
  file_path: string;
  file_type: string;
  file_size: number;
  original_filename: string;
  created_at: string;
  tags: string[];
  annotations: {
    id: string;
    x: number;
    y: number;
    text: string;
    type: 'object' | 'person' | 'location' | 'building' | 'other';
  }[];
  uploader_id: string | null;
  uploader_name?: string;
}

export const useMediaDetail = (id: string) => {
  const [mediaItem, setMediaItem] = useState<MediaItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMediaItem = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
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
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        // Format the data
        setMediaItem({
          ...data,
          // Properly access full_name from the profiles object
          uploader_name: data.profiles?.full_name || 'Unknown user'
        });
      } catch (error) {
        console.error('Error fetching media item:', error);
        toast({
          title: 'Error loading image',
          description: 'Could not load the requested image details',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMediaItem();
  }, [id, toast]);

  return { mediaItem, loading };
};
