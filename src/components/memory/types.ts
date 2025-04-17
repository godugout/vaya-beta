
// Base memory type
export interface Memory {
  id: string;
  type: 'story' | 'photo' | 'audio';
  content_url: string;
  created_at: string;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
}

// Specific memory types
export interface StoryMemory extends Memory {
  type: 'story';
  duration?: number;
}

export interface PhotoMemory extends Memory {
  type: 'photo';
  photo_url?: string;
  caption?: string;
}

export interface AudioMemory extends Memory {
  type: 'audio';
  content: string;
  duration?: number;
}

// Database response type (matches our Supabase table)
export interface MemoryRecord {
  id: string;
  user_id: string;
  family_id?: string;
  memory_type: 'story' | 'photo' | 'audio';
  title: string;
  description?: string;
  content_url: string;
  created_at: string;
  updated_at: string;
  metadata: Record<string, any>;
}
