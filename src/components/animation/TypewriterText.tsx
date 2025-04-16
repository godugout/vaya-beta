
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  colorful?: boolean;
  cursorStyle?: "bar" | "underscore" | "block" | "none";
  cursorBlinkSpeed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  phrases,
  className,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseDuration = 2000,
  colorful = false,
  cursorStyle = "bar",
  cursorBlinkSpeed = 800
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Array of color classes for different phrases
  const colorClasses = [
    "text-autumn",
    "text-leaf",
    "text-water",
    "text-ui-purple",
    "bg-gradient-to-r from-autumn to-ui-orange bg-clip-text text-transparent",
    "bg-gradient-to-r from-water to-mountain bg-clip-text text-transparent",
    "bg-gradient-to-r from-ui-purple to-ui-orange bg-clip-text text-transparent",
    "bg-gradient-to-r from-leaf to-forest bg-clip-text text-transparent"
  ];

  useEffect(() => {
    if (phrases.length === 0) return;

    let timeout: NodeJS.Timeout;
    const currentPhrase = phrases[currentPhraseIndex];

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsTyping(false);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isTyping) {
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        setIsPaused(true);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentPhraseIndex, isTyping, isPaused, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  // Get current color class based on phrase index
  const getCurrentColorClass = () => {
    if (!colorful) return "";
    return colorClasses[currentPhraseIndex % colorClasses.length];
  };

  // Get cursor style class
  const getCursorStyleClass = () => {
    if (cursorStyle === "none") return "typewriter-no-cursor";
    return `typewriter-cursor-${cursorStyle}`;
  };

  return (
    <span className={cn("relative inline-block", className)}>
      <span className={getCurrentColorClass()}>
        {displayText}
      </span>
      {cursorStyle === "none" ? null : (
        <motion.span
          className={cn("ml-0.5 inline-block bg-current", getCursorStyleClass())}
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: cursorBlinkSpeed / 1000 }}
        />
      )}
    </span>
  );
};

export default TypewriterText;
