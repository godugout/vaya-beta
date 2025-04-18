
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LanguageWelcome {
  language: string;
  welcome: string;
  region: string;
}

const welcomeMessages: LanguageWelcome[] = [
  { language: 'English', welcome: 'Welcome', region: 'Global' },
  { language: 'Spanish', welcome: 'Bienvenido', region: 'Latin America, Spain' },
  { language: 'French', welcome: 'Bienvenue', region: 'France, Canada, Africa' },
  { language: 'German', welcome: 'Willkommen', region: 'Germany, Austria' },
  { language: 'Italian', welcome: 'Benvenuto', region: 'Italy' },
  { language: 'Portuguese', welcome: 'Bem-vindo', region: 'Brazil, Portugal' },
  { language: 'Russian', welcome: 'Добро пожаловать', region: 'Russia' },
  { language: 'Chinese', welcome: '欢迎', region: 'China' },
  { language: 'Japanese', welcome: 'ようこそ', region: 'Japan' },
  { language: 'Korean', welcome: '환영합니다', region: 'Korea' },
  { language: 'Arabic', welcome: 'مرحباً', region: 'Middle East, North Africa' },
  { language: 'Hindi', welcome: 'स्वागत है', region: 'India' },
  { language: 'Thai', welcome: 'ยินดีต้อนรับ', region: 'Thailand' },
  { language: 'Vietnamese', welcome: 'Chào mừng', region: 'Vietnam' },
  { language: 'Turkish', welcome: 'Hoş geldiniz', region: 'Turkey' },
  { language: 'Greek', welcome: 'Καλώς ήρθατε', region: 'Greece' },
  { language: 'Hebrew', welcome: 'ברוך הבא', region: 'Israel' },
  { language: 'Swedish', welcome: 'Välkommen', region: 'Sweden' },
  { language: 'Dutch', welcome: 'Welkom', region: 'Netherlands' },
  { language: 'Polish', welcome: 'Witamy', region: 'Poland' },
];

interface MultilingualWelcomeProps {
  className?: string;
  displayDuration?: number;
  includeRegion?: boolean;
  textClassName?: string;
  onLanguageChange?: (language: LanguageWelcome) => void;
}

export const MultilingualWelcome: React.FC<MultilingualWelcomeProps> = ({
  className,
  displayDuration = 3000,
  includeRegion = false,
  textClassName,
  onLanguageChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % welcomeMessages.length);
        setIsTransitioning(false);
        if (onLanguageChange) {
          onLanguageChange(welcomeMessages[(currentIndex + 1) % welcomeMessages.length]);
        }
      }, 500);
    }, displayDuration);

    return () => clearInterval(intervalId);
  }, [currentIndex, displayDuration, onLanguageChange]);

  const currentMessage = welcomeMessages[currentIndex];

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div
        className={cn(
          "transition-opacity duration-500 text-center",
          isTransitioning ? "opacity-0" : "opacity-100",
          textClassName
        )}
      >
        <div className="text-2xl md:text-3xl font-bold">{currentMessage.welcome}</div>
        {includeRegion && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {currentMessage.language} • {currentMessage.region}
          </div>
        )}
      </div>
    </div>
  );
};
