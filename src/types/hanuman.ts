
/**
 * Types for Hanuman Edition chat functionality
 */

// Chat message structure
export interface HanumanMessage {
  role: "assistant" | "user" | "system";
  content: string;
  attachments?: {
    type: "audio" | "image";
    url: string;
  }[];
  timestamp?: Date;
}

// Prompt item structure
export interface HanumanPromptItem {
  id: string;
  content: string;
  category: string;
  isSpanish?: boolean;
}

// Prompt category structure
export interface HanumanPromptCategory {
  id: string;
  name: string;
  nameSpanish: string;
  iconName: string;
  prompts: HanumanPromptItem[];
}

// Family context structure
export interface HanumanFamilyContext {
  familyName?: string;
  ancestralRegion?: string;
  currentLocation?: string;
  culturalIdentity?: string;
  primaryLanguage?: string;
  familyElders?: string[];
  traditions?: string[];
  hobbies?: string[];
  familyValues?: string[];
  preferences?: Record<string, any>;
}

// Chat hook return type
export interface HanumanChatHook {
  messages: HanumanMessage[];
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  handleSubmit: (input: string) => Promise<void>;
  handlePromptSelect: (prompt: string) => void;
  handleMorePrompts: () => void;
}
