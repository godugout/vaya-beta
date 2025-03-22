import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Story text variants
const storyTextVariants = cva(
  "font-story", // Base story font (Georgia)
  {
    variants: {
      size: {
        xs: "text-sm",
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl",
        xl: "text-2xl",
      },
      leading: {
        tight: "leading-tight",
        normal: "leading-normal",
        relaxed: "leading-relaxed",
        loose: "leading-loose",
      },
      style: {
        normal: "",
        italic: "italic",
        quote: "italic border-l-4 border-vaya-coral pl-4 my-6",
      },
      color: {
        default: "text-gray-900 dark:text-gray-100",
        muted: "text-gray-600 dark:text-gray-300",
        light: "text-gray-500 dark:text-gray-400",
      },
      language: {
        english: "font-story",
        gujarati: "font-gujarati",
        hindi: "font-hindi",
      }
    },
    defaultVariants: {
      size: "md",
      leading: "relaxed",
      style: "normal",
      color: "default",
      language: "english"
    },
  }
);

export interface StoryTextProps 
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof storyTextVariants> {
  as?: React.ElementType;
}

export const StoryText = React.forwardRef<HTMLParagraphElement, StoryTextProps>(
  ({ className, size, leading, style, color, language, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(storyTextVariants({ size, leading, style, color, language }), className)}
      {...props}
    />
  )
);

StoryText.displayName = "StoryText";

// Story heading variants
const storyHeadingVariants = cva(
  "font-story font-medium", // Base story font
  {
    variants: {
      size: {
        xs: "text-lg",
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      tracking: {
        normal: "tracking-normal",
        tight: "tracking-tight",
        wide: "tracking-wide",
      },
      language: {
        english: "font-story",
        gujarati: "font-gujarati",
        hindi: "font-hindi",
      }
    },
    defaultVariants: {
      size: "md",
      weight: "medium",
      tracking: "tight",
      language: "english"
    },
  }
);

export interface StoryHeadingProps 
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof storyHeadingVariants> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const StoryHeading = React.forwardRef<HTMLHeadingElement, StoryHeadingProps>(
  ({ className, size, weight, tracking, language, level = 2, ...props }, ref) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements;
    
    return (
      <Component
        ref={ref}
        className={cn(storyHeadingVariants({ size, weight, tracking, language }), className)}
        {...props}
      />
    );
  }
);

StoryHeading.displayName = "StoryHeading";

// Other story components

export const StoryQuote = React.forwardRef<
  HTMLQuoteElement, 
  React.HTMLAttributes<HTMLQuoteElement> & { language?: 'english' | 'gujarati' | 'hindi' }
>(({ className, language = 'english', ...props }, ref) => (
  <blockquote 
    ref={ref}
    className={cn(
      language === 'english' && 'story-quote',
      language === 'gujarati' && 'story-quote-gujarati',
      language === 'hindi' && 'story-quote-hindi',
      className
    )}
    {...props} 
  />
));

StoryQuote.displayName = "StoryQuote";

export const StoryDivider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("my-8 border-t border-gray-200 dark:border-gray-800", className)}
    {...props}
  />
));

StoryDivider.displayName = "StoryDivider";

export const StoryCitation = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <cite
    ref={ref}
    className={cn("block text-sm text-gray-500 dark:text-gray-400 mt-2 italic", className)}
    {...props}
  />
));

StoryCitation.displayName = "StoryCitation";
