
export interface Message {
  id?: string;
  role: "assistant" | "user" | "system";
  content: string;
  attachments?: {
    type: "audio" | "image";
    url: string;
  }[];
  timestamp?: Date;
}

export interface PromptItem {
  id: string;
  content: string;
  category: string;
  isSpanish?: boolean;
}

export interface NarraConversationProps {
  initialMessages?: Message[];
}
