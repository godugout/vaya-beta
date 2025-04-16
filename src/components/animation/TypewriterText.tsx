
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  phrases,
  className,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseDuration = 2000
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

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

  return (
    <span className={cn("relative inline-block", className)}>
      {displayText}
      <motion.span
        className="ml-0.5 inline-block w-0.5 h-6 bg-current"
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      />
    </span>
  );
};

export default TypewriterText;
