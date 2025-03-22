
import { useState, useEffect } from 'react';

export const useAdminDiagnostics = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyPressCount, setKeyPressCount] = useState(0);
  const [lastKeyTime, setLastKeyTime] = useState(0);

  const openPanel = () => setIsOpen(true);
  const closePanel = () => setIsOpen(false);
  const togglePanel = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + D to toggle the panel
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        togglePanel();
        return;
      }
      
      // Secret pattern: press 'v' 3 times within 1 second
      if (e.key.toLowerCase() === 'v') {
        const now = Date.now();
        
        if (now - lastKeyTime < 1000) {
          setKeyPressCount(prev => prev + 1);
        } else {
          setKeyPressCount(1);
        }
        
        setLastKeyTime(now);
      } else {
        setKeyPressCount(0);
      }
    };

    if (keyPressCount >= 3) {
      openPanel();
      setKeyPressCount(0);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyPressCount, lastKeyTime]);

  return {
    isOpen,
    openPanel,
    closePanel,
    togglePanel
  };
};
