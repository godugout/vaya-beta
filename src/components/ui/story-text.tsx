
import React, { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const storyTextVariants = cva(
  "font-story", 
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      leading: {
        tight: "leading-tight",
        normal: "leading-normal",
        relaxed: "leading-relaxed",
        loose: "leading-loose",
      },
      fontStyle: {
        normal: "font-normal",
        italic: "font-italic",
        quote: "italic pl-4 border-l-4 border-autumn my-4",
      },
      textColor: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        light: "text-gray-200",
      },
      language: {
        english: "font-story",
        gujarati: "font-gujarati gujarati-content",
        hindi: "font-hindi hindi-content",
      },
    },
    defaultVariants: {
      size: "md",
      leading: "relaxed",
      fontStyle: "normal",
      textColor: "default",
      language: "english",
    },
  }
);

export interface StoryTextProps 
  extends React.HTMLAttributes<HTMLParagraphElement>,
    Omit<VariantProps<typeof storyTextVariants>, 'textColor'> {
  as?: React.ElementType;
  textColor?: "default" | "muted" | "light";
}

const StoryText = forwardRef<HTMLParagraphElement, StoryTextProps>(
  ({ className, size, leading, fontStyle, textColor, language, as: Component = "p", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(storyTextVariants({ size, leading, fontStyle, textColor, language }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

StoryText.displayName = "StoryText";

interface StoryHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "sm" | "md" | "lg" | "xl";
  language?: "english" | "gujarati" | "hindi";
}

const StoryHeading = forwardRef<HTMLHeadingElement, StoryHeadingProps>(
  ({ className, level = 2, size = "lg", language = "english", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "text-lg",
      md: "text-xl",
      lg: "text-2xl",
      xl: "text-3xl",
    };
    
    const languageClasses = {
      english: "font-story",
      gujarati: "font-gujarati gujarati-content",
      hindi: "font-hindi hindi-content"
    };
    
    const Heading = `h${level}` as keyof JSX.IntrinsicElements;
    
    return (
      <Heading
        ref={ref}
        className={cn(
          "font-semibold tracking-tight mb-4",
          sizeClasses[size],
          languageClasses[language],
          className
        )}
        {...props}
      >
        {children}
      </Heading>
    );
  }
);

StoryHeading.displayName = "StoryHeading";

const StorySectionTitle = forwardRef<HTMLHeadingElement, StoryHeadingProps>(
  ({ className, level = 3, size = "md", language = "english", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "text-base",
      md: "text-xl",
      lg: "text-2xl",
      xl: "text-3xl",
    };
    
    const languageClasses = {
      english: "font-story",
      gujarati: "font-gujarati gujarati-content",
      hindi: "font-hindi hindi-content"
    };
    
    const Heading = `h${level}` as keyof JSX.IntrinsicElements;
    
    return (
      <Heading
        ref={ref}
        className={cn(
          "font-medium tracking-tight mb-3",
          sizeClasses[size],
          languageClasses[language],
          className
        )}
        {...props}
      >
        {children}
      </Heading>
    );
  }
);

StorySectionTitle.displayName = "StorySectionTitle";

// StoryQuote component
const StoryQuote = forwardRef<HTMLQuoteElement, React.HTMLAttributes<HTMLQuoteElement> & { language?: "english" | "gujarati" | "hindi"; size?: "xs" | "sm" | "md" | "lg" | "xl"; leading?: "tight" | "normal" | "relaxed" | "loose"; }>(
  ({ className, size = "md", leading = "relaxed", language = "english", children, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          "italic pl-4 border-l-4 border-autumn my-4",
          storyTextVariants({ size, leading, language }),
          className
        )}
        {...props}
      >
        {children}
      </blockquote>
    );
  }
);

StoryQuote.displayName = "StoryQuote";

// StoryDivider component
const StoryDivider = forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn("my-6 border-t border-gray-200 dark:border-gray-700", className)}
        {...props}
      />
    );
  }
);

StoryDivider.displayName = "StoryDivider";

// StoryCitation component
const StoryCitation = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { size?: "xs" | "sm" | "md" | "lg" | "xl" }>(
  ({ className, size = "xs", children, ...props }, ref) => {
    return (
      <cite
        ref={ref}
        className={cn(
          "text-muted-foreground italic", 
          storyTextVariants({ size }),
          className
        )}
        {...props}
      >
        {children}
      </cite>
    );
  }
);

StoryCitation.displayName = "StoryCitation";

export { StoryText, StoryHeading, StorySectionTitle, StoryQuote, StoryDivider, StoryCitation };
