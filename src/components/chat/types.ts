export interface Message {
  role: "assistant" | "user";
  content: string;
  attachments?: {
    type: "audio" | "image";
    url: string;
  }[];
}

export interface StoryPrompt {
  id: string;
  prompt: string;
  category: string;
  cultural_context: string | null;
}