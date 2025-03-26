
export type BaseMemory = {
  id: string;
  type: string;
  content_url: string;
  created_at: string;
  title?: string;
  description?: string;
};

export type StoryMemory = BaseMemory & {
  type: "story";
  duration?: number;
};

export type PhotoMemory = BaseMemory & {
  type: "photo";
  photo_url?: string;
  caption?: string;
};

export type Memory = StoryMemory | PhotoMemory;
