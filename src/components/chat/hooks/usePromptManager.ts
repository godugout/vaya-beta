
import { useState } from "react";
import { usePromptFetching } from "@/hooks/usePromptFetching";
import { useFamilyContextManagement } from "@/hooks/useFamilyContextManagement";
import { personalizePrompt } from "@/utils/promptPersonalization";

export const usePromptManager = (setMessages: React.Dispatch<React.SetStateAction<any[]>>) => {
  const [edition, setEdition] = useState<string>("hanuman"); // Default to Hanuman edition
  const { prompts, fetchPrompts, getNextPrompt } = usePromptFetching(edition);
  const { familyContext } = useFamilyContextManagement();

  const handleMorePrompts = (isSpanish: boolean = false) => {
    const nextPrompt = getNextPrompt(isSpanish);
    if (nextPrompt) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${personalizePrompt(nextPrompt.content, familyContext)}${nextPrompt.context ? ` (${nextPrompt.context})` : ""}`,
        },
      ]);
    }
  };

  const setHanumanEdition = () => {
    setEdition("hanuman");
    fetchPrompts();
  };

  return {
    handleMorePrompts,
    edition,
    setHanumanEdition,
  };
};
