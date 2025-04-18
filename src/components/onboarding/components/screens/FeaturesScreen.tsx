
import { FadeIn } from "@/components/animation/FadeIn";

interface FeaturesScreenProps {
  lang: 'en' | 'es';
}

export const FeaturesScreen = ({ lang }: FeaturesScreenProps) => {
  return (
    <FadeIn>
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
    </FadeIn>
  );
};
