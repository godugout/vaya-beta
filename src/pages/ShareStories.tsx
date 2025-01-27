import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import NarraChat from "@/components/NarraChat";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioWaveform, BookOpen, MessageSquare } from "lucide-react";
import StyleEditor from "@/components/StyleEditor";

interface StoryCategory {
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  icon: React.ReactNode;
  colorKey: string;
  chatCategory: string;
}

const ShareStories = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSpanish, setIsSpanish] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkUser();
  }, [navigate]);

  // Hardcoded colors that override any family brand colors
  const categoryColors = {
    "Primary Orange": "#F97316",
    "Ocean Blue": "#0EA5E9",
    "Nature Green": "#84CC16"
  };

  const categories: StoryCategory[] = [
    {
      title_en: "Tradiciones Familiares",
      title_es: "Tradiciones Familiares",
      description_en: "Share cherished family traditions and customs that have been passed down through generations.",
      description_es: "Comparte tradiciones y costumbres familiares que han pasado de generación en generación.",
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      colorKey: "Primary Orange",
      chatCategory: "traditions"
    },
    {
      title_en: "Historias de Vida",
      title_es: "Historias de Vida",
      description_en: "Record personal journeys and important moments that shaped your family's story.",
      description_es: "Graba historias personales y momentos importantes que formaron la historia de tu familia.",
      icon: <AudioWaveform className="h-8 w-8 text-white" />,
      colorKey: "Ocean Blue",
      chatCategory: "life-lessons"
    },
    {
      title_en: "Herencia Cultural",
      title_es: "Herencia Cultural",
      description_en: "Share stories about your Costa Rican heritage and cultural experiences.",
      description_es: "Comparte historias sobre tu herencia costarricense y experiencias culturales.",
      icon: <BookOpen className="h-8 w-8 text-white" />,
      colorKey: "Nature Green",
      chatCategory: "heritage"
    },
  ];

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <NarraChat />
          </div>
        </div>
        <StyleEditor />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8 bg-white rounded-lg shadow">
              <NarraChat />
            </div>
            <div className="col-span-4 space-y-6">
              {categories.map((category, index) => {
                const bgColor = categoryColors[category.colorKey as keyof typeof categoryColors];
                
                return (
                  <Card 
                    key={index} 
                    style={{ backgroundColor: bgColor }}
                    className="hover:shadow-lg transition-shadow duration-200"
                  >
                    <CardHeader>
                      <div className="mb-4">{category.icon}</div>
                      <CardTitle className="text-xl text-white font-outfit">
                        {isSpanish ? category.title_es : category.title_en}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/90 font-inter">
                        {isSpanish ? category.description_es : category.description_en}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <StyleEditor />
    </div>
  );
};

export default ShareStories;