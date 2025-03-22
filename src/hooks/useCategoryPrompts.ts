
import { useState, useEffect, useMemo } from "react";
import { Bookmark, History, MessagesSquare, FileText, Star, Heart, Globe, Users, Home, Quote } from "lucide-react";
import { PromptCategory, LocalizedPrompt } from "@/components/chat/types";
import { supabase } from "@/integrations/supabase/client";
import { hanumanPromptCategories, hanumanPrompts } from "@/data/hanumanPrompts";

export const useCategoryPrompts = (edition: string = "standard") => {
  const [categories, setCategories] = useState<PromptCategory[]>([]);
  const [categoryPrompts, setCategoryPrompts] = useState<{ [key: string]: { en: string; es: string }[] }>({});

  // Define default categories if the API call fails
  const defaultCategories: PromptCategory[] = [
    {
      id: "family-history",
      name_en: "Family History",
      name_es: "Historia Familiar",
      description_en: "Explore your family's past",
      description_es: "Explora el pasado de tu familia",
      colorKey: "default",
      icon: <Bookmark className="h-4 w-4" />
    },
    {
      id: "memories",
      name_en: "Shared Memories",
      name_es: "Recuerdos Compartidos",
      description_en: "Recall special moments",
      description_es: "Recuerda momentos especiales",
      colorKey: "default",
      icon: <History className="h-4 w-4" />
    },
    {
      id: "traditions",
      name_en: "Traditions",
      name_es: "Tradiciones",
      description_en: "Share family customs",
      description_es: "Comparte costumbres familiares",
      colorKey: "default",
      icon: <Star className="h-4 w-4" />
    },
    {
      id: "life-lessons",
      name_en: "Life Lessons",
      name_es: "Lecciones de Vida",
      description_en: "Wisdom across generations",
      description_es: "Sabiduría a través de generaciones",
      colorKey: "default",
      icon: <MessagesSquare className="h-4 w-4" />
    }
  ];

  // Default prompts in case API fetch fails
  const defaultPrompts: { [key: string]: { en: string; es: string }[] } = {
    "family-history": [
      { en: "How did your family first come to where you live now?", es: "¿Cómo llegó tu familia por primera vez a donde vives ahora?" },
      { en: "What stories have you heard about your great-grandparents?", es: "¿Qué historias has escuchado sobre tus bisabuelos?" },
      { en: "Do you know the story of how your grandparents met?", es: "¿Conoces la historia de cómo se conocieron tus abuelos?" }
    ],
    "memories": [
      { en: "What's your earliest childhood memory?", es: "¿Cuál es tu primer recuerdo de la infancia?" },
      { en: "Tell me about a family vacation that stands out in your memory.", es: "Cuéntame sobre unas vacaciones familiares que destaquen en tu memoria." },
      { en: "What games did you play with your siblings or cousins growing up?", es: "¿A qué juegos jugabas con tus hermanos o primos cuando eras pequeño?" }
    ],
    "traditions": [
      { en: "Is there a special dish that's always served at family gatherings?", es: "¿Hay algún plato especial que siempre se sirve en las reuniones familiares?" },
      { en: "What holiday traditions are most important in your family?", es: "¿Qué tradiciones festivas son más importantes en tu familia?" },
      { en: "Are there any unique rituals or customs that your family practices?", es: "¿Hay rituales o costumbres únicas que practique tu familia?" }
    ],
    "life-lessons": [
      { en: "What's the most important lesson your parents taught you?", es: "¿Cuál es la lección más importante que te enseñaron tus padres?" },
      { en: "What wisdom would you like to pass on to future generations?", es: "¿Qué sabiduría te gustaría transmitir a las generaciones futuras?" },
      { en: "Tell me about a challenge that shaped who you are today.", es: "Cuéntame sobre un desafío que moldeó quién eres hoy." }
    ]
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (edition === "hanuman") {
        setCategories(hanumanPromptCategories);
        
        // Format Hanuman prompts for the expected structure
        const formattedPrompts: { [key: string]: { en: string; es: string }[] } = {};
        
        hanumanPromptCategories.forEach(category => {
          const categoryId = category.id;
          formattedPrompts[categoryId] = hanumanPrompts
            .filter(prompt => prompt.category_id === categoryId)
            .map(prompt => ({
              en: prompt.prompt_en,
              es: prompt.prompt_es
            }));
        });
        
        setCategoryPrompts(formattedPrompts);
        return;
      }
      
      try {
        // Fetch from Supabase if not using Hanuman edition
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('prompt_categories')
          .select('*')
          .eq('active', true);
          
        if (categoriesError) {
          console.error("Error fetching categories:", categoriesError);
          setCategories(defaultCategories);
          setCategoryPrompts(defaultPrompts);
          return;
        }
        
        if (categoriesData && categoriesData.length > 0) {
          // Map the database response to our expected format with icons
          const formattedCategories: PromptCategory[] = categoriesData.map((cat: any) => {
            let icon = <Bookmark className="h-4 w-4" />;
            
            switch (cat.icon_key) {
              case 'history': icon = <History className="h-4 w-4" />; break;
              case 'quote': icon = <Quote className="h-4 w-4" />; break;
              case 'star': icon = <Star className="h-4 w-4" />; break;
              case 'message': icon = <MessagesSquare className="h-4 w-4" />; break;
              case 'file': icon = <FileText className="h-4 w-4" />; break;
              case 'heart': icon = <Heart className="h-4 w-4" />; break;
              case 'globe': icon = <Globe className="h-4 w-4" />; break;
              case 'users': icon = <Users className="h-4 w-4" />; break;
              case 'home': icon = <Home className="h-4 w-4" />; break;
              default: break;
            }
            
            return {
              id: cat.id,
              name_en: cat.name_en,
              name_es: cat.name_es || cat.name_en,
              description_en: cat.description_en,
              description_es: cat.description_es || cat.description_en,
              colorKey: cat.color_key || 'default',
              icon
            };
          });
          
          setCategories(formattedCategories);
          
          // Now fetch prompts for each category
          const fetchPromptsByCategoryId = async (categoryId: string) => {
            const { data: promptsData, error: promptsError } = await supabase
              .from('localized_prompts')
              .select('*')
              .eq('category_id', categoryId)
              .eq('active', true);
              
            if (promptsError) {
              console.error(`Error fetching prompts for category ${categoryId}:`, promptsError);
              return defaultPrompts[categoryId] || [];
            }
            
            if (promptsData && promptsData.length > 0) {
              return promptsData.map((prompt: any) => ({
                en: prompt.prompt_en,
                es: prompt.prompt_es || prompt.prompt_en
              }));
            }
            
            return defaultPrompts[categoryId] || [];
          };
          
          // Fetch prompts for all categories and update state
          const allCategoryPrompts: { [key: string]: { en: string; es: string }[] } = {};
          
          for (const category of formattedCategories) {
            allCategoryPrompts[category.id] = await fetchPromptsByCategoryId(category.id);
          }
          
          setCategoryPrompts(allCategoryPrompts);
        } else {
          setCategories(defaultCategories);
          setCategoryPrompts(defaultPrompts);
        }
      } catch (error) {
        console.error("Error in useCategoryPrompts:", error);
        setCategories(defaultCategories);
        setCategoryPrompts(defaultPrompts);
      }
    };

    fetchCategories();
  }, [edition]);

  return { categories, categoryPrompts };
};
