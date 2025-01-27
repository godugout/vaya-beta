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
  const [brandColors, setBrandColors] = useState<Record<string, string>>({});

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkUser();
    fetchBrandGuidelines();
  }, [navigate]);

  const fetchBrandGuidelines = async () => {
    const { data: guidelines, error } = await supabase
      .from('brand_guidelines')
      .select('name, value')
      .eq('category', 'color');

    if (error) {
      console.error('Error fetching brand guidelines:', error);
      return;
    }

    const colors = guidelines.reduce((acc: Record<string, string>, guideline) => {
      acc[guideline.name] = guideline.value;
      return acc;
    }, {});

    setBrandColors(colors);
  };

  const categories: StoryCategory[] = [
    {
      title_en: "Family Traditions",
      title_es: "Tradiciones Familiares",
      description_en: "Share cherished family traditions and customs that have been passed down through generations.",
      description_es: "Comparte tradiciones y costumbres familiares que han pasado de generación en generación.",
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      colorKey: "Primary Orange",
      chatCategory: "traditions"
    },
    {
      title_en: "Life Stories",
      title_es: "Historias de Vida",
      description_en: "Record personal journeys and important moments that shaped your family's story.",
      description_es: "Graba historias personales y momentos importantes que formaron la historia de tu familia.",
      icon: <AudioWaveform className="h-8 w-8 text-white" />,
      colorKey: "Ocean Blue",
      chatCategory: "life-lessons"
    },
    {
      title_en: "Cultural Heritage",
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
                const colorMap = {
                  "Primary Orange": "#F97316",
                  "Ocean Blue": "#0EA5E9",
                  "Nature Green": "#84CC16"
                };
                const bgColor = colorMap[category.colorKey as keyof typeof colorMap] || "#F97316";
                
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