
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { storyTextVariants } from "./StoryText";

export interface StoryVerseProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  leading?: "tight" | "normal" | "relaxed" | "loose";
  language?: "english" | "gujarati" | "hindi" | "sanskrit";
  indent?: boolean;
  isLast?: boolean;
}

export const StoryVerse = forwardRef<HTMLParagraphElement, StoryVerseProps>(
  ({ className, size = "md", leading = "relaxed", language = "english", indent = false, isLast = false, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          storyTextVariants({ size, leading, language }),
          indent && "pl-6",
          !isLast && "mb-2",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

StoryVerse.displayName = "StoryVerse";

export interface StoryStanzaProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  language?: "english" | "gujarati" | "hindi" | "sanskrit";
}

export const StoryStanza = forwardRef<HTMLDivElement, StoryStanzaProps>(
  ({ className, size = "md", language = "english", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mb-6",
          language === "gujarati" && "font-gujarati gujarati-content",
          language === "hindi" && "font-hindi hindi-content",
          language === "sanskrit" && "font-sanskrit sanskrit-content",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StoryStanza.displayName = "StoryStanza";

export interface StoryPoemProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  author?: string;
  year?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  language?: "english" | "gujarati" | "hindi" | "sanskrit";
  centered?: boolean;
}

export const StoryPoem = forwardRef<HTMLDivElement, StoryPoemProps>(
  ({ 
    className, 
    title, 
    author, 
    year, 
    size = "md", 
    language = "english",
    centered = false,
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "my-6 py-4",
          centered && "text-center",
          className
        )}
        {...props}
      >
        {title && (
          <h3 className={cn(
            "font-story font-medium mb-2",
            size === "xs" && "text-sm",
            size === "sm" && "text-base",
            size === "md" && "text-lg",
            size === "lg" && "text-xl",
            size === "xl" && "text-2xl",
            language === "gujarati" && "font-gujarati gujarati-content",
            language === "hindi" && "font-hindi hindi-content",
            language === "sanskrit" && "font-sanskrit sanskrit-content",
            centered && "text-center"
          )}>
            {title}
          </h3>
        )}
        
        <div className="poem-content">
          {children}
        </div>
        
        {(author || year) && (
          <div className={cn(
            "mt-4 text-muted-foreground italic",
            size === "xs" && "text-xs",
            size === "sm" && "text-sm",
            size === "md" && "text-base",
            centered && "text-center"
          )}>
            {author && <span>{author}</span>}
            {author && year && <span>, </span>}
            {year && <span>{year}</span>}
          </div>
        )}
      </div>
    );
  }
);

StoryPoem.displayName = "StoryPoem";
