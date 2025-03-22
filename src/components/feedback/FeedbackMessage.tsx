
import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/components/animation/AnimationProvider';

const feedbackVariants = cva(
  "rounded-lg p-4 mb-4 flex items-start gap-3 text-sm border",
  {
    variants: {
      variant: {
        success: "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-100 border-green-100 dark:border-green-800",
        info: "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-100 border-blue-100 dark:border-blue-800",
        warning: "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-100 border-yellow-100 dark:border-yellow-800",
        error: "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-100 border-red-100 dark:border-red-800",
      },
      hasAction: {
        true: "pr-10",
        false: ""
      }
    },
    defaultVariants: {
      variant: "info",
      hasAction: false
    }
  }
);

export interface FeedbackMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof feedbackVariants> {
  title?: string;
  onClose?: () => void;
  action?: React.ReactNode;
  showIcon?: boolean;
  dismissible?: boolean;
}

export function FeedbackMessage({
  variant,
  className,
  children,
  title,
  onClose,
  action,
  showIcon = true,
  dismissible = false,
  hasAction,
  ...props
}: FeedbackMessageProps) {
  const { isReduced } = useAnimation();
  
  const iconMap = {
    success: <CheckCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
  };
  
  const motionConfig = isReduced 
    ? { animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.1 } }
    : { 
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.3 }
      };

  return (
    <AnimatePresence>
      <motion.div
        {...motionConfig}
        className={cn(feedbackVariants({ variant, hasAction: !!action, className }))}
        {...props}
      >
        {showIcon && variant && (
          <div className="shrink-0">
            {iconMap[variant]}
          </div>
        )}
        
        <div className="flex-1">
          {title && <div className="font-medium mb-1">{title}</div>}
          <div className="text-sm">{children}</div>
          
          {action && (
            <div className="mt-2">
              {action}
            </div>
          )}
        </div>
        
        {dismissible && (
          <button
            type="button"
            className="absolute top-4 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
            onClick={onClose}
          >
            <X className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Dismiss</span>
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
