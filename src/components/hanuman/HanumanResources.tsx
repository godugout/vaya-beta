
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Book, BookOpen, Bookmark, FileText, Download, ExternalLink } from "lucide-react";
import { HanumanResource } from "@/types/hanuman";
import { Card, CardContent } from "@/components/ui/card";

const HanumanResources: React.FC = () => {
  const { isSpanish } = useLanguage();
  
  const resources: HanumanResource[] = [
    {
      id: "1",
      title: isSpanish ? "Guía para Entrevistas Familiares" : "Family Interview Guide",
      description: isSpanish ? "Preguntas para entrevistar a tus familiares" : "Questions to interview family members",
      icon: Book,
      link: "#"
    },
    {
      id: "2",
      title: isSpanish ? "Técnicas de Narración" : "Storytelling Techniques",
      description: isSpanish ? "Aprende a compartir historias de manera efectiva" : "Learn to share stories effectively",
      icon: BookOpen,
      link: "#"
    },
    {
      id: "3",
      title: isSpanish ? "Tradiciones Familiares Comunes" : "Common Family Traditions",
      description: isSpanish ? "Ideas para preservar la herencia cultural" : "Ideas for preserving cultural heritage",
      icon: Bookmark,
      link: "#"
    },
    {
      id: "4",
      title: isSpanish ? "Plantilla para árbol genealógico" : "Family Tree Template",
      description: isSpanish ? "Documento para rastrear la historia familiar" : "Document to track family history",
      icon: FileText,
      link: "#"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">
          {isSpanish ? "Recursos para Historias" : "Storytelling Resources"}
        </h2>
        
        <div className="space-y-3">
          {resources.map((resource) => {
            const ResourceIcon = resource.icon;
            
            return (
              <Card 
                key={resource.id}
                className="border-hanuman-primary/10 hover:border-hanuman-primary/30 transition-all hover:bg-hanuman-primary/5"
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-hanuman-primary/10 rounded-full p-2 flex-shrink-0">
                      <ResourceIcon className="h-4 w-4 text-hanuman-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{resource.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{resource.description}</p>
                    </div>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 flex-shrink-0 text-gray-500 hover:text-hanuman-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-sm font-medium mb-3">
          {isSpanish ? "Herramientas y Plantillas" : "Tools & Templates"}
        </h3>
        
        <Card className="bg-gradient-to-br from-hanuman-purple/10 to-hanuman-primary/5 border-hanuman-purple/20">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Download className="h-4 w-4 text-hanuman-purple" />
              <span>{isSpanish ? "Kit de Historia Familiar" : "Family History Kit"}</span>
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              {isSpanish 
                ? "Descarga estas plantillas para documentar tu historia familiar completa" 
                : "Download these templates to document your complete family history"}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-hanuman-purple/30 text-hanuman-purple hover:bg-hanuman-purple/10"
            >
              {isSpanish ? "Descargar Kit" : "Download Kit"}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-sm font-medium mb-3">
          {isSpanish ? "Aprenda Más" : "Learn More"}
        </h3>
        
        <div className="text-xs text-gray-600 dark:text-gray-400">
          <p>{isSpanish 
            ? "Explora cómo la documentación de historias familiares puede fortalecer los lazos entre generaciones" 
            : "Explore how documenting family stories can strengthen bonds across generations"}
          </p>
          <Button 
            variant="link" 
            size="sm" 
            className="p-0 h-auto text-xs text-hanuman-primary mt-2"
          >
            {isSpanish ? "Leer artículo completo" : "Read full article"} →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HanumanResources;
