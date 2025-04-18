
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
    <div className="relative overflow-hidden">
      <div className="relative">
        <img 
          src={screen.image} 
          alt={screen.title[lang]} 
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
        <OnboardingHeader 
          title={screen.title[lang]}
          description={screen.description[lang]}
        />
      </div>
      
      <motion.div
        key={screen.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="p-6"
      >
        {screen.id === "welcome" && <WelcomeScreen lang={lang} />}
        {screen.id === "features" && <FeaturesScreen lang={lang} />}
        {screen.id === "languages" && <LanguagesScreen lang={lang} />}
      </motion.div>
    </div>
  );
};
