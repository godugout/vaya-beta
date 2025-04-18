
import { motion } from "framer-motion";
import { OnboardingHeader } from "./OnboardingHeader";
import { OnboardingScreen as OnboardingScreenType } from "../constants/onboardingScreens";

interface OnboardingScreenProps {
  screen: OnboardingScreenType;
  lang: 'en' | 'es';
}

export const OnboardingScreen = ({ screen, lang }: OnboardingScreenProps) => {
  return (
    <div className="relative h-48 overflow-hidden">
      <img 
        src={screen.image} 
        alt={screen.title[lang]} 
        className="w-full h-full object-cover"
      />
      <OnboardingHeader 
        title={screen.title[lang]}
        description={screen.description[lang]}
      />
      <motion.div
        key={screen.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="space-y-4"
      >
        {screen.id === "welcome" && (
          <div className="space-y-4 p-6">
            <h3 className="text-lg font-medium">
              {lang === 'es' ? "Jai Hanuman!" : "Jai Hanuman!"}
            </h3>
            <p>
              {lang === 'es' 
                ? "La Edición Hanuman de Vaya honra las ricas tradiciones y valores de las familias del sur asiático, ayudándole a preservar historias y recuerdos significativos para las generaciones futuras."
                : "The Hanuman Edition of Vaya honors the rich traditions and values of South Asian families, helping you preserve meaningful stories and memories for future generations."}
            </p>
            <p>
              {lang === 'es' 
                ? "Estamos aquí para ayudarle a capturar las historias que importan, desde tradiciones familiares hasta enseñanzas de los mayores."
                : "We're here to help you capture the stories that matter, from family traditions to teachings from elders."}
            </p>
          </div>
        )}
        
        {screen.id === "features" && (
          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <h4 className="font-medium">
                {lang === 'es' ? "Indicaciones culturalmente resonantes:" : "Culturally resonant prompts:"}
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  {lang === 'es' 
                    ? "Exploración del patrimonio familiar"
                    : "Family heritage exploration"}
                </li>
                <li>
                  {lang === 'es' 
                    ? "Tradiciones y celebraciones"
                    : "Traditions and celebrations"}
                </li>
                <li>
                  {lang === 'es' 
                    ? "Sabiduría de los mayores"
                    : "Wisdom from elders"}
                </li>
                <li>
                  {lang === 'es' 
                    ? "Historias de migración y transición"
                    : "Migration and transition stories"}
                </li>
                <li>
                  {lang === 'es' 
                    ? "Valores y enseñanzas culturales"
                    : "Cultural values and teachings"}
                </li>
              </ul>
            </div>
          </div>
        )}

        {screen.id === "languages" && (
          <div className="space-y-4 p-6">
            <p>
              {lang === 'es' 
                ? "La Edición Hanuman incorpora términos y conceptos culturalmente significativos:"
                : "The Hanuman Edition incorporates culturally significant terms and concepts:"}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 p-3 rounded-lg">
                <h4 className="font-medium text-amber-800 mb-1">{lang === 'es' ? "Sánscrito" : "Sanskrit"}</h4>
                <p className="text-sm text-amber-700">Dharma, Sanskara, Parampara, Katha, Smriti</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-medium text-green-800 mb-1">{lang === 'es' ? "Gujarati" : "Gujarati"}</h4>
                <p className="text-sm text-green-700">Parivar, Varta, Sanskruti, Vahevaar, Vaarso</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              {lang === 'es' 
                ? "Para personalizar mejor su experiencia, nos gustaría conocer más sobre su familia y su contexto cultural."
                : "To better personalize your experience, we'd like to learn more about your family and cultural context."}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
