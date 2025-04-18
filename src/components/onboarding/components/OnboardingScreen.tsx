
import { motion } from "framer-motion";
import { OnboardingHeader } from "./OnboardingHeader";
import { OnboardingScreen as OnboardingScreenType } from "../constants/onboardingScreens";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { FeaturesScreen } from "./screens/FeaturesScreen";
import { LanguagesScreen } from "./screens/LanguagesScreen";

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
        {screen.id === "welcome" && <WelcomeScreen lang={lang} />}
        {screen.id === "features" && <FeaturesScreen lang={lang} />}
        {screen.id === "languages" && <LanguagesScreen lang={lang} />}
      </motion.div>
    </div>
  );
};
