
import { supabase } from '@/integrations/supabase/client';

export interface UserPrompt {
  id?: string;
  content: string;
  category?: string;
  is_favorite?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const userPromptService = {
  async getPrompts(category?: string): Promise<UserPrompt[]> {
    let query = supabase
      .from('user_prompts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching prompts:', error);
      throw error;
    }
    
    return data || [];
  },
  
  async addPrompt(prompt: UserPrompt): Promise<UserPrompt> {
    const { data, error } = await supabase
      .from('user_prompts')
      .insert(prompt)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding prompt:', error);
      throw error;
    }
    
    return data;
  },
  
  async updatePrompt(id: string, updates: Partial<UserPrompt>): Promise<UserPrompt> {
    const { data, error } = await supabase
      .from('user_prompts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating prompt:', error);
      throw error;
    }
    
    return data;
  },
  
  async deletePrompt(id: string): Promise<void> {
    const { error } = await supabase
      .from('user_prompts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting prompt:', error);
      throw error;
    }
  },
  
  async toggleFavorite(id: string, isFavorite: boolean): Promise<UserPrompt> {
    return this.updatePrompt(id, { is_favorite: isFavorite });
  }
};
