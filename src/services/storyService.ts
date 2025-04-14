
import { supabase } from '@/integrations/supabase/client';
import { MediaFile } from './mediaService';

export interface UserStory {
  id?: string;
  title: string;
  content?: string;
  media_id?: string;
  is_public?: boolean;
  created_at?: string;
  updated_at?: string;
  media?: MediaFile;
}

export const storyService = {
  async getStories(includeMedia = false): Promise<UserStory[]> {
    let query = supabase.from('user_stories')
      .select(includeMedia ? 'id, title, content, media_id, is_public, created_at, updated_at, media:media_id(*)' : '*')
      .order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching stories:', error);
      throw error;
    }
    
    return data || [];
  },
  
  async getPublicStories(includeMedia = false): Promise<UserStory[]> {
    let query = supabase.from('user_stories')
      .select(includeMedia ? 'id, title, content, media_id, is_public, created_at, updated_at, media:media_id(*)' : '*')
      .eq('is_public', true)
      .order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching public stories:', error);
      throw error;
    }
    
    return data || [];
  },
  
  async getStoryById(id: string, includeMedia = false): Promise<UserStory> {
    const { data, error } = await supabase
      .from('user_stories')
      .select(includeMedia ? 'id, title, content, media_id, is_public, created_at, updated_at, media:media_id(*)' : '*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching story:', error);
      throw error;
    }
    
    return data;
  },
  
  async createStory(story: UserStory): Promise<UserStory> {
    const { data, error } = await supabase
      .from('user_stories')
      .insert(story)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating story:', error);
      throw error;
    }
    
    return data;
  },
  
  async updateStory(id: string, updates: Partial<UserStory>): Promise<UserStory> {
    const { data, error } = await supabase
      .from('user_stories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating story:', error);
      throw error;
    }
    
    return data;
  },
  
  async deleteStory(id: string): Promise<void> {
    const { error } = await supabase
      .from('user_stories')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting story:', error);
      throw error;
    }
  },
  
  async togglePublicStatus(id: string, isPublic: boolean): Promise<UserStory> {
    return this.updateStory(id, { is_public: isPublic });
  }
};
