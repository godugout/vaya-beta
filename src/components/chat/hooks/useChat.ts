
import { useMessages } from "./useMessages";
import { useInput } from "./useInput";
import { usePromptManager } from "./usePromptManager";
import { useFamilyContextManagement } from "@/hooks/useFamilyContextManagement";

export const useChat = () => {
  const { input, setInput } = useInput();
  const { messages, setMessages, handleSendMessage } = useMessages();
  const { edition, setHanumanEdition, handleMorePrompts } = usePromptManager(setMessages);
  const { familyContext, saveFamilyContext } = useFamilyContextManagement();

  const handleSend = (messageContent?: { content: string; attachments?: { type: "audio" | "image"; url: string }[] }, isSpanish: boolean = false) => {
    const content = messageContent?.content || input;
    if (!content.trim()) return;
    
    handleSendMessage({ content }, isSpanish);
    setInput("");
  };

  return {
    messages,
    input,
    setInput,
    handleSend,
    handleMorePrompts,
    familyContext,
    saveFamilyContext,
    edition,
    setHanumanEdition,
  };
};
