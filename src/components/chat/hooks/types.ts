
export interface PromptItem {
  id: string;
  content: string;
  category?: string;
  isSpanish?: boolean;
}

export interface PromptCategory {
  id: string;
  name: string;
  nameSpanish: string;
  iconName: string;
  prompts: PromptItem[];
}

export interface PromptCategoriesProps {
  onPromptSelect: (prompt: string) => void;
  isSpanish: boolean;
  edition?: string;
}
