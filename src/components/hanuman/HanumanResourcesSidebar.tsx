
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, LucideIcon, Star, Sparkles, ExternalLink, Link } from "lucide-react";

interface ResourceItem {
  id: string;
  icon: React.ReactNode;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
}

interface EventItem {
  id: string;
  titleEn: string;
  titleEs: string;
  date: string;
  descriptionEn: string;
  descriptionEs: string;
}

interface HanumanResourcesSidebarProps {
  isSpanish: boolean;
}

const HanumanResourcesSidebar: React.FC<HanumanResourcesSidebarProps> = ({
  isSpanish
}) => {
  const resources: ResourceItem[] = [
    {
      id: "resource-1",
      icon: <BookOpen className="h-5 w-5" />,
      titleEn: "Storytelling Guide",
      titleEs: "Guía de Narración",
      descriptionEn: "Tips for sharing your memories effectively",
      descriptionEs: "Consejos para compartir tus memorias efectivamente"
    },
    {
      id: "resource-2",
      icon: <Sparkles className="h-5 w-5" />,
      titleEn: "Effective Questions",
      titleEs: "Preguntas Efectivas",
      descriptionEn: "How to ask questions that reveal meaningful stories",
      descriptionEs: "Cómo hacer preguntas que revelen historias significativas"
    }
  ];
  
  const events: EventItem[] = [
    {
      id: "event-1",
      titleEn: "Harvest Festival",
      titleEs: "Festival de la Cosecha",
      date: "October 15",
      descriptionEn: "Annual celebration of harvest and traditions",
      descriptionEs: "Celebración anual de la cosecha y tradiciones"
    }
  ];
  
  const inspirationItems = [
    { id: "stories", iconEn: "Stories", iconEs: "Historias" },
    { id: "photos", iconEn: "Photos", iconEs: "Fotos" },
    { id: "music", iconEn: "Music", iconEs: "Música" }
  ];

  return (
    <div className="space-y-4">
      {/* Resources Card */}
      <Card className="hanuman-card">
        <CardHeader className="pb-2 border-b border-hanuman-gold/10">
          <CardTitle className="flex items-center text-hanuman-gold text-lg">
            <BookOpen className="h-5 w-5 mr-2 text-hanuman-orange" />
            {isSpanish ? "Recursos" : "Resources"}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-3 px-3">
          <div className="space-y-3">
            {resources.map((resource) => (
              <div key={resource.id} className="hanuman-resource-card p-3 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-hanuman-orange/10">
                    {resource.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white/90">
                      {isSpanish ? resource.titleEs : resource.titleEn}
                    </h3>
                    <p className="text-xs text-white/70 mt-1">
                      {isSpanish ? resource.descriptionEs : resource.descriptionEn}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="px-0 py-1 h-auto mt-2 text-xs text-hanuman-orange hover:text-hanuman-gold hover:bg-transparent"
                    >
                      {isSpanish ? "Ver Guía" : "View Guide"}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Events Card */}
      <Card className="hanuman-card">
        <CardHeader className="pb-2 border-b border-hanuman-gold/10">
          <CardTitle className="flex items-center text-hanuman-gold text-lg">
            <Calendar className="h-5 w-5 mr-2 text-hanuman-orange" />
            {isSpanish ? "Próximos Eventos" : "Upcoming Events"}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-3 px-3">
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="hanuman-resource-card p-3 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-hanuman-orange/10">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white/90">
                      {isSpanish ? event.titleEs : event.titleEn}
                    </h3>
                    <p className="text-xs text-white/70 mt-1">
                      {event.date}
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      {isSpanish ? event.descriptionEs : event.descriptionEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Inspiration Card */}
      <Card className="hanuman-card">
        <CardHeader className="pb-2 border-b border-hanuman-gold/10">
          <CardTitle className="flex items-center text-hanuman-gold text-lg">
            <Star className="h-5 w-5 mr-2 text-hanuman-orange" />
            {isSpanish ? "Inspiración" : "Inspiration"}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-3 px-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-hanuman-orange/20">
                <img
                  src="/lovable-uploads/5b62d353-1780-4d72-8790-0ba3b7d85e21.png"
                  alt="Hanuman"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {inspirationItems.map((item) => (
              <Button
                key={item.id}
                variant="outline"
                className="border-hanuman-orange/20 bg-white/5 hover:bg-hanuman-orange/10 hover:border-hanuman-orange/30"
              >
                {isSpanish ? item.iconEs : item.iconEn}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HanumanResourcesSidebar;
