
export interface Tag {
  id: string;
  content_id: string;
  content_type: 'story' | 'memory' | 'photo' | 'capsule';
  tag: string;
  created_at: string;
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface TagSuggestion {
  tag: string;
  relevance: number;
}
