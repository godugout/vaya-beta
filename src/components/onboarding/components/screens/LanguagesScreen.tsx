
import { FadeIn } from "@/components/animation/FadeIn";

interface LanguagesScreenProps {
  lang: 'en' | 'es';
}

export const LanguagesScreen = ({ lang }: LanguagesScreenProps) => {
  return (
    <FadeIn>
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
    </FadeIn>
  );
};
