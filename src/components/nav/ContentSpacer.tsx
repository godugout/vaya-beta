
import React from "react";
import { useLocation } from "react-router-dom";

interface ContentSpacerProps {
  isMinimized: boolean;
  isMobile: boolean;
}

export const ContentSpacer = ({ isMinimized, isMobile }: ContentSpacerProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Don't add spacing for the homepage
  if (isHomePage) {
    return null;
  }

  return (
    <div 
      className="w-full transition-height duration-300"
      style={{
        height: isMinimized 
          ? "3rem" // 12px for minimized nav
          : isMobile 
            ? "5rem" // 20px for mobile
            : "6rem" // 24px for desktop
      }}
    />
  );
};
