
export interface Story {
  id: string;
  family_id?: string;
  duration?: number;
  is_featured?: boolean;
  audio_url: string;
  title: string;
  created_at: string;
  updated_at: string;
  story_type?: string;
  author_id?: string;
  description?: string;
  cultural_prompt_id?: string;
  metadata?: Record<string, any>;
  image_url?: string;
  language?: string;
  author?: {
    name: string;
    avatar_url?: string;
  };
}

export interface StoryTag {
  id: string;
  story_id: string;
  tag: string;
  created_at: string;
}
