
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type FeedbackVariant = 'success' | 'error' | 'warning' | 'info';

interface FeedbackMessageProps {
  variant?: FeedbackVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const variantStyles = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    textColor: 'text-green-800 dark:text-green-200',
    iconColor: 'text-green-500 dark:text-green-400',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    textColor: 'text-red-800 dark:text-red-200',
    iconColor: 'text-red-500 dark:text-red-400',
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    textColor: 'text-amber-800 dark:text-amber-200',
    iconColor: 'text-amber-500 dark:text-amber-400',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-800 dark:text-blue-200',
    iconColor: 'text-blue-500 dark:text-blue-400',
  },
};

export function FeedbackMessage({
  variant = 'info',
  title,
  children,
  className,
  onClose,
  icon,
}: FeedbackMessageProps) {
  const styles = variantStyles[variant];
  const IconComponent = styles.icon;
  
  const motionConfig = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 }
  };

  return (
    <motion.div
      {...motionConfig}
      className={cn(
        'rounded-lg border p-4 flex items-start space-x-3',
        styles.bgColor,
        styles.borderColor,
        className
      )}
    >
      <div className={cn('flex-shrink-0', styles.iconColor)}>
        {icon || <IconComponent className="h-5 w-5" />}
      </div>
      <div className="flex-grow">
        {title && (
          <h3 className={cn('font-semibold', styles.textColor)}>{title}</h3>
        )}
        <div className={cn('text-sm', styles.textColor)}>{children}</div>
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className={cn('flex-shrink-0 ml-2', styles.textColor, 'hover:opacity-75')}
          aria-label="Close notification"
        >
          <XCircle className="h-5 w-5" />
        </button>
      )}
    </motion.div>
  );
}
