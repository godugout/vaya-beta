export type BaseMemory = {
  id: string;
  type: string;
  content_url: string;
  created_at: string;
};

export type StoryMemory = BaseMemory & {
  type: "story";
  title?: string;
};

export type PhotoMemory = BaseMemory & {
  type: "photo";
  photo_url?: string;
};

export type Memory = StoryMemory | PhotoMemory;