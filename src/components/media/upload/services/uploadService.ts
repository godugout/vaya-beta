
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { FileWithMeta } from '../types';

/**
 * Uploads a single file to Supabase storage
 */
export const uploadFileToStorage = async (
  file: File
): Promise<{ filePath: string; publicUrl: string; fileId: string } | null> => {
  try {
    const fileId = uuidv4();
    const fileExt = file.name.split('.').pop();
    const fileName = `${fileId}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) {
      throw new Error(`Error uploading file: ${uploadError.message}`);
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);
    
    return { filePath, publicUrl, fileId };
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
};

/**
 * Creates a database record for the uploaded media
 */
export const createMediaRecord = async (
  fileId: string,
  publicUrl: string,
  file: File,
  fileWithMeta: FileWithMeta,
  familyId?: string
): Promise<boolean> => {
  try {
    const { error: insertError } = await supabase
      .from('media_items')
      .insert({
        id: fileId,
        title: fileWithMeta.title || file.name.split('.')[0],
        description: fileWithMeta.description || null,
        file_path: publicUrl,
        file_type: file.type,
        file_size: file.size,
        original_filename: file.name,
        tags: fileWithMeta.tags || [],
        annotations: [],
        family_id: familyId || null,
      });
    
    if (insertError) {
      throw new Error(`Error creating media item record: ${insertError.message}`);
    }
    
    return true;
  } catch (error) {
    console.error('Database insert error:', error);
    return false;
  }
};
