
import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Define variants for the dialog
const dialogVariants = cva(
  "sm:max-w-lg",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-900 text-black dark:text-white",
        alert: "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800",
        success: "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800",
        info: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800",
        warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800",
      },
      size: {
        sm: "sm:max-w-sm",
        default: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        full: "sm:max-w-[90%] sm:h-[90%]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
);

type DialogType = "alert" | "confirmation" | "input" | "selection";

export interface VayaDialogProps extends React.ComponentProps<typeof Dialog>, 
  VariantProps<typeof dialogVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  type?: DialogType;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function VayaDialog({
  title,
  description,
  children,
  footer,
  variant,
  size,
  showCloseButton = true,
  type = "alert",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isLoading = false,
  icon,
  ...props
}: VayaDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent 
        className={cn(dialogVariants({ variant, size }))}
        onPointerDownOutside={e => {
          // Allow closing by clicking outside for alerts, but not for other types
          if (type !== "alert") {
            e.preventDefault();
          }
        }}
      >
        {showCloseButton && (
          <DialogClose 
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        )}
        
        <DialogHeader>
          {title && (
            <DialogTitle className="flex items-center gap-2">
              {icon && <span className="inline-block mr-2">{icon}</span>}
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        
        {children}
        
        {(footer || type === "confirmation" || type === "selection") && (
          <DialogFooter className="sm:justify-end gap-2">
            {footer || (
              <>
                {(type === "confirmation" || type === "selection") && (
                  <Button variant="outline" onClick={() => props.onOpenChange?.(false)}>
                    {cancelText}
                  </Button>
                )}
                
                {(type === "confirmation" || type === "selection" || type === "input") && (
                  <Button 
                    onClick={() => {
                      onConfirm?.();
                      if (!isLoading) {
                        props.onOpenChange?.(false);
                      }
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : confirmText}
                  </Button>
                )}
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
