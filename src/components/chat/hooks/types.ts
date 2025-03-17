
import { Message } from "../types";

export interface UseMessagesReturn {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  handleSendMessage: (messageContent?: { content: string; attachments?: { type: "audio" | "image"; url: string }[] }, isSpanish?: boolean) => void;
}

export interface UsePromptManagerReturn {
  handleMorePrompts: (isSpanish?: boolean) => void;
  edition: string;
  setHanumanEdition: () => void;
}

export interface UseInputReturn {
  input: string;
  setInput: (value: string) => void;
}
