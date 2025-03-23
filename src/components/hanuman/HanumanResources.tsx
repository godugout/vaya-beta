
import React from "react";
import { Bookmark, Download, ExternalLink, FileText, Flag, Info, Link, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface HanumanResource {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  link?: string;
}

interface HanumanResourcesProps {
  onResourceSelect?: (resource: HanumanResource) => void;
}

const HanumanResources: React.FC<HanumanResourcesProps> = ({ onResourceSelect }) => {
  const { isSpanish } = useLanguage();
  
  const resources: HanumanResource[] = [
    {
      id: "guide",
      title: isSpanish ? "Guía de Conversación" : "Conversation Guide",
      description: isSpanish ? "Consejos para una conversación significativa" : "Tips for meaningful conversation",
      icon: FileText,
      link: "#guide"
    },
    {
      id: "templates",
      title: isSpanish ? "Plantillas" : "Templates",
      description: isSpanish ? "Preguntas preparadas para momentos especiales" : "Prepared questions for special moments",
      icon: Bookmark,
      link: "#templates"
    },
    {
      id: "share",
      title: isSpanish ? "Compartir" : "Share Story",
      description: isSpanish ? "Comparte tu historia con la familia" : "Share your story with family",
      icon: Share2,
      link: "#share"
    },
    {
      id: "export",
      title: isSpanish ? "Exportar" : "Export",
      description: isSpanish ? "Guarda esta conversación" : "Save this conversation",
      icon: Download,
      link: "#export"
    }
  ];

  const handleClick = (resource: HanumanResource) => {
    if (onResourceSelect) {
      onResourceSelect(resource);
    }
  };

  return (
    <div className="side-column">
      <div className="side-column-header flex items-center justify-between">
        <span>{isSpanish ? "Recursos" : "Resources"}</span>
        <Info size={16} className="text-gray-500" />
      </div>
      
      <div className="side-column-body space-y-4">
        {resources.map((resource) => (
          <motion.div
            key={resource.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(resource)}
            className="cursor-pointer"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-hanuman-primary/10 flex items-center justify-center">
                    <resource.icon size={18} className="text-hanuman-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{resource.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {resource.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        
        {/* Hanuman illustration card */}
        <Card className="bg-gradient-to-br from-hanuman-bg-light to-white dark:from-hanuman-bg-dark dark:to-gray-900 overflow-hidden border border-hanuman-primary/20">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <h4 className="text-sm font-medium text-hanuman-primary">
                {isSpanish ? "Sabiduría de Hanuman" : "Hanuman's Wisdom"}
              </h4>
              <p className="text-xs">
                {isSpanish 
                  ? "La fuerza de Hanuman viene de su devoción y servicio." 
                  : "Hanuman's strength comes from his devotion and service."}
              </p>
              <div className="h-24 flex items-center justify-center opacity-60">
                <div className="bg-hanuman-bg bg-contain bg-center bg-no-repeat h-full w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="side-column-footer">
        <div className="flex justify-center items-center gap-1 text-xs">
          <ExternalLink size={12} />
          <span>{isSpanish ? "Más recursos" : "More resources"}</span>
        </div>
      </div>
    </div>
  );
};

export default HanumanResources;
