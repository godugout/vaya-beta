
export interface CapsuleItem {
  id: string;
  capsule_id: string;
  item_type: 'memory' | 'story' | 'media';
  item_id: string;
  added_by: string;
  created_at: string;
}

export interface Capsule {
  id: string;
  title: string;
  description?: string;
  creator_id: string;
  family_id?: string;
  status: 'upcoming' | 'active' | 'locked' | 'revealed';
  reveal_date?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface CapsuleData extends Capsule {
  items?: CapsuleItem[];
  itemCount?: number;
}
