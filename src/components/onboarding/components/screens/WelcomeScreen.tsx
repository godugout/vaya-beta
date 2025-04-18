
import { FadeIn } from "@/components/animation/FadeIn";
import { Button } from "@/components/ui/button";
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from "@/components/ui/modern-card";

interface WelcomeScreenProps {
  lang: 'en' | 'es';
}

export const WelcomeScreen = ({ lang }: WelcomeScreenProps) => {
  return (
    <FadeIn>
      <ModernCard variant="modern" withHover className="space-y-4 mx-auto max-w-3xl">
        <ModernCardHeader className="bg-gradient-to-r from-forest/10 to-leaf/10 border-b">
          <ModernCardTitle className="text-xl font-medium text-forest dark:text-leaf">
            Jai Hanuman!
          </ModernCardTitle>
        </ModernCardHeader>
        <ModernCardContent className="space-y-4">
          <p className="text-foreground">
            {lang === 'es' 
              ? "La Edición Hanuman de Vaya honra las ricas tradiciones y valores de las familias del sur asiático, ayudándole a preservar historias y recuerdos significativos para las generaciones futuras."
              : "The Hanuman Edition of Vaya honors the rich traditions and values of South Asian families, helping you preserve meaningful stories and memories for future generations."}
          </p>
          <p className="text-foreground">
            {lang === 'es' 
              ? "Estamos aquí para ayudarle a capturar las historias que importan, desde tradiciones familiares hasta enseñanzas de los mayores."
              : "We're here to help you capture the stories that matter, from family traditions to teachings from elders."}
          </p>
          <div className="pt-4 flex justify-center">
            <Button variant="forest" size="lg" className="px-8">
              {lang === 'es' ? "Comenzar" : "Get Started"}
            </Button>
          </div>
        </ModernCardContent>
      </ModernCard>
    </FadeIn>
  );
};
