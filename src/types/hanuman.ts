
export interface HanumanPromptItem {
  id: string;
  content: string;
  category: string;
}

export interface HanumanMessage {
  role: "user" | "assistant";
  content: string;
}

export interface HanumanChatHook {
  messages: HanumanMessage[];
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handlePromptSelect: (prompt: string) => void;
  handleMorePrompts: () => void;
}
