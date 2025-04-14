
import { supabase } from '@/integrations/supabase/client';

export interface MediaFile {
  id?: string;
  title: string;
  description?: string;
  file_path: string;
  file_type: string;
  duration?: number;
  thumbnail_path?: string;
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, any>;
}

export const mediaService = {
  async getMediaFiles(): Promise<MediaFile[]> {
    const { data, error } = await supabase
      .from('media_files')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching media files:', error);
      throw error;
    }
    
    return data || [];
  },
  
  async getMediaFileById(id: string): Promise<MediaFile> {
    const { data, error } = await supabase
      .from('media_files')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching media file:', error);
      throw error;
    }
    
    return data;
  },
  
  async uploadMedia(file: File, title: string, description?: string): Promise<MediaFile> {
    // 1. Upload file to storage
    const filePath = `media/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);
    
    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw uploadError;
    }
    
    // 2. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);
    
    // 3. Calculate duration for audio/video
    let duration = null;
    if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
      try {
        duration = await this.calculateMediaDuration(file);
      } catch (err) {
        console.warn('Could not calculate media duration:', err);
      }
    }
    
    // 4. Create media file record
    const mediaFile: MediaFile = {
      title,
      description,
      file_path: publicUrl,
      file_type: file.type,
      duration,
      metadata: {
        size: file.size,
        lastModified: file.lastModified
      }
    };
    
    const { data, error } = await supabase
      .from('media_files')
      .insert(mediaFile)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating media record:', error);
      throw error;
    }
    
    return data;
  },
  
  async updateMedia(id: string, updates: Partial<MediaFile>): Promise<MediaFile> {
    const { data, error } = await supabase
      .from('media_files')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating media file:', error);
      throw error;
    }
    
    return data;
  },
  
  async deleteMedia(id: string): Promise<void> {
    // First, get the file path
    const { data: mediaFile, error: fetchError } = await supabase
      .from('media_files')
      .select('file_path')
      .eq('id', id)
      .single();
    
    if (fetchError) {
      console.error('Error fetching media file to delete:', fetchError);
      throw fetchError;
    }
    
    // Extract the storage path from the URL
    const storagePath = mediaFile.file_path.split('/').pop();
    
    if (storagePath) {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([storagePath]);
      
      if (storageError) {
        console.error('Error deleting from storage:', storageError);
        // We'll continue to delete the database record even if storage deletion fails
      }
    }
    
    // Delete database record
    const { error } = await supabase
      .from('media_files')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting media file record:', error);
      throw error;
    }
  },
  
  async calculateMediaDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      try {
        const element = file.type.startsWith('audio/') 
          ? document.createElement('audio') 
          : document.createElement('video');
        
        element.muted = true;
        
        const objectUrl = URL.createObjectURL(file);
        element.src = objectUrl;
        
        element.onloadedmetadata = () => {
          const durationSeconds = Math.round(element.duration);
          URL.revokeObjectURL(objectUrl);
          resolve(durationSeconds);
        };
        
        element.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          reject(new Error('Could not load media metadata'));
        };
      } catch (err) {
        reject(err);
      }
    });
  }
};
