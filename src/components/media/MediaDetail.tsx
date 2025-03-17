
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageAnnotation } from './ImageAnnotation';
import { ArrowLeft, Calendar, Download, Info, Tag, User } from 'lucide-react';

interface MediaItemDetail {
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
    type: string;
  }[];
  uploader_id: string | null;
  uploader_name?: string;
}

interface MediaDetailProps {
  id: string;
  onBack: () => void;
}

export const MediaDetail = ({ id, onBack }: MediaDetailProps) => {
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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" disabled>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        <Skeleton className="w-full aspect-video rounded-lg" />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    );
  }

  if (!mediaItem) {
    return (
      <div className="text-center py-12">
        <Info className="h-8 w-8 mx-auto text-gray-400 mb-2" />
        <h3 className="text-lg font-medium">Media not found</h3>
        <p className="text-gray-500 mb-4">The requested media could not be found</p>
        <Button onClick={onBack}>Back to gallery</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to gallery
        </Button>
        
        <Button variant="outline" size="sm" asChild>
          <a href={mediaItem.file_path} download target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4 mr-2" />
            Download
          </a>
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="relative">
          <ImageAnnotation
            imageSrc={mediaItem.file_path}
            imageId={mediaItem.id}
            initialAnnotations={mediaItem.annotations}
          />
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{mediaItem.title}</h2>
            {mediaItem.description && (
              <p className="text-gray-600 dark:text-gray-300 mt-1">{mediaItem.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(mediaItem.created_at)}
            </div>
            
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <User className="h-4 w-4 mr-2" />
              {mediaItem.uploader_name}
            </div>
            
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Info className="h-4 w-4 mr-2" />
              {formatFileSize(mediaItem.file_size)}
            </div>
          </div>
          
          {mediaItem.tags && mediaItem.tags.length > 0 && (
            <div>
              <div className="flex items-center mb-2 text-sm text-gray-500 dark:text-gray-400">
                <Tag className="h-4 w-4 mr-2" />
                Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {mediaItem.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Click on the image to add annotations and identify objects, people, or locations.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {mediaItem.annotations?.length 
                ? `${mediaItem.annotations.length} annotation${mediaItem.annotations.length === 1 ? '' : 's'} added`
                : 'No annotations yet. Click on the image to add the first one.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
