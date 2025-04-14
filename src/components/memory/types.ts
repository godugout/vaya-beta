
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

export type VideoMemory = BaseMemory & {
  type: "video";
  video_url?: string;
  caption?: string;
  duration?: number;
};

export type AudioMemory = BaseMemory & {
  type: "audio";
  audio_url?: string;
  transcript?: string;
  duration?: number;
};

export type Memory = StoryMemory | PhotoMemory | VideoMemory | AudioMemory;

// Type guards for safer type checking
export const isStoryMemory = (memory: Memory): memory is StoryMemory => {
  return memory.type === "story";
};

export const isPhotoMemory = (memory: Memory): memory is PhotoMemory => {
  return memory.type === "photo";
};

export const isVideoMemory = (memory: Memory): memory is VideoMemory => {
  return memory.type === "video";
};

export const isAudioMemory = (memory: Memory): memory is AudioMemory => {
  return memory.type === "audio";
};
