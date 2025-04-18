
import { FadeIn } from "@/components/animation/FadeIn";

interface WelcomeScreenProps {
  lang: 'en' | 'es';
}

export const WelcomeScreen = ({ lang }: WelcomeScreenProps) => {
  return (
    <FadeIn>
      <div className="space-y-4 p-6">
        <h3 className="text-lg font-medium">
          Jai Hanuman!
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
    </FadeIn>
  );
};
