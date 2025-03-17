
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SuggestedPrompt } from "./types";
import { NarraStoryPrompt } from "./NarraStoryPrompt";
import { Pin, History, MessagesSquare, FileText } from "lucide-react";

interface SuggestedPromptsProps {
  isSpanish: boolean;
  onPromptSelect: (prompt: string) => void;
}

export const SuggestedPrompts = ({ isSpanish, onPromptSelect }: SuggestedPromptsProps) => {
  const suggestedPrompts: SuggestedPrompt[] = [
    {
      id: "traditions",
      promptEn: "Tell me about a family tradition that's special to you.",
      promptEs: "Cuéntame sobre una tradición familiar que sea especial para ti.",
      icon: <Bookmark className="h-4 w-4" />
    },
    {
      id: "memories",
      promptEn: "What's your earliest childhood memory?",
      promptEs: "¿Cuál es tu primer recuerdo de la infancia?",
      icon: <History className="h-4 w-4" />
    },
    {
      id: "recipes",
      promptEn: "Is there a family recipe that has been passed down through generations?",
      promptEs: "¿Hay alguna receta familiar que se haya transmitido de generación en generación?",
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: "lessons",
      promptEn: "What's the most important lesson your parents taught you?",
      promptEs: "¿Cuál es la lección más importante que te enseñaron tus padres?",
      icon: <MessagesSquare className="h-4 w-4" />
    }
  ];

  const promptCategories = [
    {
      id: "traditions",
      titleEn: "Family Traditions",
      titleEs: "Tradiciones Familiares",
      descriptionEn: "Share stories about special traditions",
      descriptionEs: "Comparte historias sobre tradiciones especiales",
      icon: <Pin className="h-4 w-4 text-lovable-teal" />
    },
    {
      id: "childhood",
      titleEn: "Childhood Memories",
      titleEs: "Recuerdos de la Infancia",
      descriptionEn: "Reflect on special moments",
      descriptionEs: "Reflexiona sobre momentos especiales",
      icon: <History className="h-4 w-4 text-lovable-magenta" />
    },
    {
      id: "lessons",
      titleEn: "Life Lessons",
      titleEs: "Lecciones de Vida",
      descriptionEn: "Share wisdom and teachings",
      descriptionEs: "Comparte sabiduría y enseñanzas",
      icon: <MessagesSquare className="h-4 w-4 text-lovable-blue" />
    },
    {
      id: "stories",
      titleEn: "Family Stories",
      titleEs: "Historias Familiares",
      descriptionEn: "Recount passed-down stories",
      descriptionEs: "Relata historias transmitidas",
      icon: <FileText className="h-4 w-4 text-lovable-teal" />
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promptCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                {category.icon}
                {isSpanish ? category.titleEs : category.titleEn}
              </CardTitle>
              <CardDescription>
                {isSpanish ? category.descriptionEs : category.descriptionEn}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <NarraStoryPrompt
                    key={i}
                    prompt={isSpanish
                      ? `¿Cuál es una tradición familiar que continúas practicando hasta hoy?`
                      : `What's a family tradition you continue to practice today?`
                    }
                    onClick={onPromptSelect}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

import { Bookmark } from "lucide-react";
