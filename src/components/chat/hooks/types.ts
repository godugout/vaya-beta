
// Chat message types
export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

// Family context types
export interface FamilyMember {
  name: string;
  relation: string;
}

export interface FamilyInfo {
  familyName: string;
  members: FamilyMember[];
  traditions: string[];
  importantDates: string[];
}

// Prompt types
export interface PromptItem {
  id: string;
  content: string;
  context?: string;
  category: string;
  tags?: string[];
  isSpanish?: boolean;
}

export interface PromptCategory {
  id: string;
  name: string;
  nameEs?: string;
  description?: string;
  descriptionEs?: string;
  icon?: React.ReactNode;
  prompts: PromptItem[];
}

// Props for components
export interface PromptCategoriesProps {
  onPromptSelect: (prompt: string) => void;
  isSpanish: boolean;
  edition?: string;
}

// Chat configuration types
export interface ChatConfig {
  apiKey?: string;
  endpoint?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}
