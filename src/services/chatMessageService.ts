
import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  id?: string;
  content: string;
  sender: 'user' | 'assistant';
  conversation_id?: string;
  created_at?: string;
  metadata?: Record<string, any>;
}

export const chatMessageService = {
  async getMessages(conversationId?: string): Promise<ChatMessage[]> {
    let query = supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (conversationId) {
      query = query.eq('conversation_id', conversationId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
    
    return data || [];
  },
  
  async addMessage(message: ChatMessage): Promise<ChatMessage> {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert(message)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding message:', error);
      throw error;
    }
    
    return data;
  },
  
  async updateMessage(id: string, updates: Partial<ChatMessage>): Promise<ChatMessage> {
    const { data, error } = await supabase
      .from('chat_messages')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating message:', error);
      throw error;
    }
    
    return data;
  },
  
  async deleteMessage(id: string): Promise<void> {
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }
};
