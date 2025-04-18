
import { FadeIn } from "@/components/animation/FadeIn";
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from "@/components/ui/modern-card";
import { CheckCircle2 } from "lucide-react";

interface FeaturesScreenProps {
  lang: 'en' | 'es';
}

export const FeaturesScreen = ({ lang }: FeaturesScreenProps) => {
  return (
    <FadeIn>
      <ModernCard variant="modern" withHover className="mx-auto max-w-3xl">
        <ModernCardHeader className="bg-gradient-to-r from-water/10 to-mountain/10 border-b">
          <ModernCardTitle className="text-xl font-medium text-water dark:text-mountain">
            {lang === 'es' ? "Indicaciones culturalmente resonantes:" : "Culturally resonant prompts:"}
          </ModernCardTitle>
        </ModernCardHeader>
        <ModernCardContent className="space-y-4">
          <ul className="space-y-3">
            {[
              lang === 'es' ? "Exploración del patrimonio familiar" : "Family heritage exploration",
              lang === 'es' ? "Tradiciones y celebraciones" : "Traditions and celebrations",
              lang === 'es' ? "Sabiduría de los mayores" : "Wisdom from elders",
              lang === 'es' ? "Historias de migración y transición" : "Migration and transition stories",
              lang === 'es' ? "Valores y enseñanzas culturales" : "Cultural values and teachings"
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-leaf flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </ModernCardContent>
      </ModernCard>
    </FadeIn>
  );
};
