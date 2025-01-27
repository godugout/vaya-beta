import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import NarraChat from "@/components/NarraChat";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioWaveform, BookOpen, MessageSquare } from "lucide-react";

const ShareStories = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkUser();
  }, [navigate]);

  const cards = [
    {
      title: "Memorias Familiares",
      description: "Share cherished family memories and traditions that have been passed down through generations.",
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      color: "bg-[#9b87f5]",
    },
    {
      title: "Historias de Vida",
      description: "Record life stories and important moments that shaped your family's journey.",
      icon: <AudioWaveform className="h-8 w-8 text-white" />,
      color: "bg-[#F97316]",
    },
    {
      title: "Cuentos y Leyendas",
      description: "Share traditional stories, folklore, and cultural tales that define your heritage.",
      icon: <BookOpen className="h-8 w-8 text-white" />,
      color: "bg-[#0EA5E9]",
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
              {cards.map((card, index) => (
                <Card 
                  key={index} 
                  className={`${card.color} hover:shadow-lg transition-shadow duration-200`}
                >
                  <CardHeader>
                    <div className="mb-4">{card.icon}</div>
                    <CardTitle className="text-xl text-white font-outfit">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90">{card.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareStories;