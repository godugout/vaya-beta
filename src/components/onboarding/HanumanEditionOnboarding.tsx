
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FamilyContextOnboarding } from "./FamilyContextOnboarding";
import { useLanguage } from "@/contexts/LanguageContext";

const screens = [
  {
    id: "welcome",
    title: {
      en: "Welcome to the Hanuman Edition",
      es: "Bienvenido a la Edición Hanuman"
    },
    description: {
      en: "Discover a culturally enriched storytelling experience designed specifically for South Asian families",
      es: "Descubre una experiencia narrativa culturalmente enriquecida diseñada específicamente para familias del sur asiático"
    },
    image: "/lovable-uploads/530d6c54-2d96-42b1-ac19-0192889eb279.png"
  },
  {
    id: "features",
    title: {
      en: "Culturally Relevant Prompts",
      es: "Indicaciones Culturalmente Relevantes"
    },
    description: {
      en: "Explore prompts tailored for North Indian and Gujarati families, with familiar references to traditions, festivals, and values",
      es: "Explora indicaciones adaptadas para familias del norte de la India y gujarati, con referencias familiares a tradiciones, festivales y valores"
    },
    image: "/lovable-uploads/409da586-864c-4df0-9e54-61c03fa7bfdd.png"
  },
  {
    id: "languages",
    title: {
      en: "Multilingual Support",
      es: "Soporte Multilingüe"
    },
    description: {
      en: "Experience storytelling enriched with Sanskrit, Hindi, and Gujarati terminology for a more authentic cultural connection",
      es: "Experimenta la narración enriquecida con terminología de sánscrito, hindi y gujarati para una conexión cultural más auténtica"
    },
    image: "/lovable-uploads/28c7c4bc-01c1-461e-829b-3730a83cec0d.png"
  }
];

export function HanumanEditionOnboarding({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState(0);
  const [showFamilyContext, setShowFamilyContext] = useState(false);
  const { isSpanish } = useLanguage();
  
  const handleNext = () => {
    if (step < screens.length - 1) {
      setStep(step + 1);
    } else {
      setShowFamilyContext(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    onOpenChange(false);
  };

  if (showFamilyContext) {
    return (
      <FamilyContextOnboarding 
        open={open} 
        onOpenChange={handleComplete}
      />
    );
  }

  const currentScreen = screens[step];
  const lang = isSpanish ? 'es' : 'en';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white">
        <div className="flex flex-col h-full">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={currentScreen.image} 
              alt={currentScreen.title[lang]} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {currentScreen.title[lang]}
              </h2>
              <p className="text-white/90">
                {currentScreen.description[lang]}
              </p>
            </div>
          </div>

          <div className="p-6 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {currentScreen.id === "welcome" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {isSpanish ? "Jai Hanuman!" : "Jai Hanuman!"}
                    </h3>
                    <div className="flex items-center justify-center mb-4">
                      <img 
                        src="/lovable-uploads/530d6c54-2d96-42b1-ac19-0192889eb279.png" 
                        alt="Om Symbol" 
                        className="w-16 h-16"
                      />
                    </div>
                    <p>
                      {isSpanish 
                        ? "La Edición Hanuman de Vaya honra las ricas tradiciones y valores de las familias del sur asiático, ayudándole a preservar historias y recuerdos significativos para las generaciones futuras."
                        : "The Hanuman Edition of Vaya honors the rich traditions and values of South Asian families, helping you preserve meaningful stories and memories for future generations."}
                    </p>
                    <p>
                      {isSpanish 
                        ? "Estamos aquí para ayudarle a capturar las historias que importan, desde tradiciones familiares hasta enseñanzas de los mayores."
                        : "We're here to help you capture the stories that matter, from family traditions to teachings from elders."}
                    </p>
                  </div>
                )}

                {currentScreen.id === "features" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">
                        {isSpanish ? "Indicaciones culturalmente resonantes:" : "Culturally resonant prompts:"}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          {isSpanish 
                            ? "Exploración del patrimonio familiar"
                            : "Family heritage exploration"}
                        </li>
                        <li>
                          {isSpanish 
                            ? "Tradiciones y celebraciones"
                            : "Traditions and celebrations"}
                        </li>
                        <li>
                          {isSpanish 
                            ? "Sabiduría de los mayores"
                            : "Wisdom from elders"}
                        </li>
                        <li>
                          {isSpanish 
                            ? "Historias de migración y transición"
                            : "Migration and transition stories"}
                        </li>
                        <li>
                          {isSpanish 
                            ? "Valores y enseñanzas culturales"
                            : "Cultural values and teachings"}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {currentScreen.id === "languages" && (
                  <div className="space-y-4">
                    <p>
                      {isSpanish 
                        ? "La Edición Hanuman incorpora términos y conceptos culturalmente significativos:"
                        : "The Hanuman Edition incorporates culturally significant terms and concepts:"}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <h4 className="font-medium text-amber-800 mb-1">{isSpanish ? "Sánscrito" : "Sanskrit"}</h4>
                        <p className="text-sm text-amber-700">Dharma, Sanskara, Parampara, Katha, Smriti</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-1">{isSpanish ? "Gujarati" : "Gujarati"}</h4>
                        <p className="text-sm text-green-700">Parivar, Varta, Sanskruti, Vahevaar, Vaarso</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      {isSpanish 
                        ? "Para personalizar mejor su experiencia, nos gustaría conocer más sobre su familia y su contexto cultural."
                        : "To better personalize your experience, we'd like to learn more about your family and cultural context."}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 border-t flex justify-between items-center">
            <div className="flex items-center gap-1">
              {screens.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === step ? "bg-autumn" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {isSpanish ? "Atrás" : "Back"}
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-autumn hover:bg-autumn/90 text-white"
              >
                {step === screens.length - 1 ? (
                  <span>{isSpanish ? "Personalizar" : "Customize"}</span>
                ) : (
                  <>
                    {isSpanish ? "Siguiente" : "Next"}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
