
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Camera, Feather, MessageCircle, Star, BookOpen, MusicIcon, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SidebarCard from "@/components/hanuman/SidebarCard";

const HanumanResources: React.FC = () => {
  const { isSpanish } = useLanguage();
  
  return (
    <div className="space-y-4 h-full hanuman-scroll-area">
      {/* Resource Guide */}
      <SidebarCard 
        title={isSpanish ? "Guía de Recursos" : "Resource Guide"}
        icon={<Book className="h-4 w-4 text-hanuman-gold" />}
        defaultExpanded={true}
      >
        <Card className="hanuman-resource-card">
          <CardContent className="p-3">
            <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
              <Feather className="h-3 w-3 text-hanuman-primary" />
              <span>{isSpanish ? "Cómo Contar Historias" : "Storytelling Guide"}</span>
            </h4>
            <p className="text-xs text-hanuman-text-secondary mt-1">
              {isSpanish 
                ? "Consejos para compartir tus memorias de manera efectiva" 
                : "Tips for sharing your memories effectively"}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 text-xs text-hanuman-primary hover:bg-hanuman-primary/10"
            >
              {isSpanish ? "Ver Guía" : "View Guide"}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hanuman-resource-card mt-2">
          <CardContent className="p-3">
            <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
              <MessageCircle className="h-3 w-3 text-hanuman-primary" />
              <span>{isSpanish ? "Preguntas Efectivas" : "Effective Questions"}</span>
            </h4>
            <p className="text-xs text-hanuman-text-secondary mt-1">
              {isSpanish 
                ? "Cómo hacer preguntas que revelan historias significativas" 
                : "How to ask questions that reveal meaningful stories"}
            </p>
          </CardContent>
        </Card>
      </SidebarCard>
      
      {/* Upcoming Events */}
      <SidebarCard 
        title={isSpanish ? "Próximos Eventos" : "Upcoming Events"}
        icon={<Calendar className="h-4 w-4 text-hanuman-saffron" />}
        defaultExpanded={true}
      >
        <Card className="hanuman-resource-card">
          <CardContent className="p-3">
            <div className="flex items-start gap-3">
              <div className="bg-hanuman-primary/10 rounded-full p-1.5 mt-0.5">
                <Calendar className="h-3.5 w-3.5 text-hanuman-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">{isSpanish ? "Festival de Cosecha" : "Harvest Festival"}</h4>
                <p className="text-xs text-hanuman-text-secondary mt-1">{isSpanish ? "15 de Octubre" : "October 15"}</p>
                <p className="text-xs text-hanuman-text-secondary mt-1">
                  {isSpanish ? "Celebración anual de la cosecha y tradiciones" : "Annual celebration of harvest and traditions"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </SidebarCard>
      
      {/* Media Inspiration */}
      <SidebarCard 
        title={isSpanish ? "Inspiración" : "Inspiration"}
        icon={<Star className="h-4 w-4 text-hanuman-gold" />}
      >
        <div className="grid grid-cols-2 gap-2">
          <Card className="hanuman-resource-card p-0 overflow-hidden">
            <div className="aspect-square relative">
              <img 
                src="/lovable-uploads/409da586-864c-4df0-9e54-61c03fa7bfdd.png" 
                alt="Family traditions" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-2">
                <span className="text-xs text-white font-medium">
                  {isSpanish ? "Tradiciones" : "Traditions"}
                </span>
              </div>
            </div>
          </Card>
          
          <Card className="hanuman-resource-card p-0 overflow-hidden">
            <div className="aspect-square relative">
              <img 
                src="/lovable-uploads/530d6c54-2d96-42b1-ac19-0192889eb279.png" 
                alt="Sacred spaces" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-2">
                <span className="text-xs text-white font-medium">
                  {isSpanish ? "Lugares Sagrados" : "Sacred Spaces"}
                </span>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <Button variant="outline" size="sm" className="text-xs h-auto py-1 flex items-center gap-1 bg-hanuman-bg-dark/40 border-hanuman-gold/20 text-hanuman-gold/90 hover:bg-hanuman-gold/10">
            <BookOpen className="h-3 w-3" />
            <span>{isSpanish ? "Historias" : "Stories"}</span>
          </Button>
          
          <Button variant="outline" size="sm" className="text-xs h-auto py-1 flex items-center gap-1 bg-hanuman-bg-dark/40 border-hanuman-primary/20 text-hanuman-primary/90 hover:bg-hanuman-primary/10">
            <Camera className="h-3 w-3" />
            <span>{isSpanish ? "Fotos" : "Photos"}</span>
          </Button>
          
          <Button variant="outline" size="sm" className="text-xs h-auto py-1 flex items-center gap-1 bg-hanuman-bg-dark/40 border-hanuman-green/20 text-hanuman-green/90 hover:bg-hanuman-green/10">
            <MusicIcon className="h-3 w-3" />
            <span>{isSpanish ? "Música" : "Music"}</span>
          </Button>
        </div>
      </SidebarCard>
    </div>
  );
};

export default HanumanResources;
