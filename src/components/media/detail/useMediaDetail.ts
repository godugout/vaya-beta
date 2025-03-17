
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
  // Removed profiles from the interface since it's only used internally
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
        
        // Extract uploader name from profiles object
        // Handle the profiles data in a type-safe way
        let uploaderName = 'Unknown user';
        if (data.profiles && typeof data.profiles === 'object') {
          // Check if it's a valid object with the full_name property
          if ('full_name' in data.profiles && typeof data.profiles.full_name === 'string') {
            uploaderName = data.profiles.full_name;
          }
        }
        
        // Format the data, omitting the profiles property which is not part of our interface
        setMediaItem({
          id: data.id,
          title: data.title,
          description: data.description,
          file_path: data.file_path,
          file_type: data.file_type,
          file_size: data.file_size,
          original_filename: data.original_filename,
          created_at: data.created_at,
          tags: data.tags || [],
          annotations: data.annotations || [],
          uploader_id: data.uploader_id,
          uploader_name: uploaderName
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
