
import { ReactNode } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
  attachments?: { type: "audio" | "image"; url: string }[];
}

export interface LocalizedPrompt {
  id: string;
  category_id: string;
  prompt_en: string;
  prompt_es: string;
  prompt_hi?: string;
  prompt_gu?: string;
  cultural_context_en?: string;
  cultural_context_es?: string;
  cultural_context_hi?: string;
  cultural_context_gu?: string;
  active: boolean;
  edition?: string;
  category_name_en?: string;
  category_name_es?: string;
}

export interface PromptCategory {
  id: string;
  name_en: string;
  name_es: string;
  name_hi?: string;
  name_gu?: string;
  description_en: string;
  description_es: string;
  description_hi?: string;
  description_gu?: string;
  colorKey: string;
  icon: ReactNode;
}

export interface FamilyContext {
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
