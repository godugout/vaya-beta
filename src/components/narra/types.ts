
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: Array<{
    type: "image" | "audio";
    url: string;
  }>;
}

export interface NarraConversationProps {
  initialMessages?: Message[];
}

export interface SuggestedPrompt {
  id: string;
  promptEn: string;
  promptEs: string;
  icon: React.ReactNode;
}
