export interface Message {
  role: "assistant" | "user";
  content: string;
  attachments?: {
    type: "audio" | "image";
    url: string;
  }[];
}

export interface PromptCategory {
  id: string;
  name_en: string;
  name_es: string;
  icon: string;
  active?: boolean;
}

export interface LocalizedPrompt {
  id: string;
  category_id: string;
  prompt_en: string;
  prompt_es: string;
  cultural_context_en: string | null;
  cultural_context_es: string | null;
  active?: boolean;
}