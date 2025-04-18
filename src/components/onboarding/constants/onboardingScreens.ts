
import { useLanguage } from "@/contexts/LanguageContext";

export interface OnboardingScreen {
  id: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  image: string;
}

export const onboardingScreens: OnboardingScreen[] = [
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
    image: "/lovable-uploads/33c609d9-9189-49d2-b9c1-106d8257557c.png"
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
    image: "/lovable-uploads/4425ec86-56fe-44c4-9f47-75e59d3cb287.png"
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
    image: "/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png"
  }
];
