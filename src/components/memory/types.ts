export type BaseMemory = {
  id: string;
  type: string;
  content_url: string;
  created_at: string;
};

export type StoryMemory = BaseMemory & {
  type: "story";
  title?: string;
  description?: string;
  duration?: number;
};

export type PhotoMemory = BaseMemory & {
  type: "photo";
  photo_url?: string;
  caption?: string;
};

export type Memory = StoryMemory | PhotoMemory;