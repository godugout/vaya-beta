
import React from "react";
import { cn } from "@/lib/utils";

interface ContentSpacerProps {
  isMinimized: boolean;
  isMobile: boolean;
}

export const ContentSpacer = ({ isMinimized, isMobile }: ContentSpacerProps) => {
  return (
    <div className={cn(
      "h-20",
      isMobile && "h-24",
      isMinimized && "h-12"
    )} />
  );
};
