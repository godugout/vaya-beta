
import { toast as sonnerToast } from "sonner";
import type * as ToastPrimitives from "@radix-ui/react-toast";
import {
  type ToastActionElement,
  type ToastProps
} from "@/components/ui/toast";
import { useContext, createContext } from "react";

type ToastContextType = {
  toasts: ToastProps[];
  addToast: (toast: ToastProps) => void;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
};

// Create a context for toast management
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Export sonner toast for direct usage
export const toast = sonnerToast;

// Custom hook that provides the toast context
export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    const toasts: ToastProps[] = [];
    
    // Mock implementation for standalone usage
    return {
      toasts,
      toast: (props: ToastProps) => {
        toast(props);
      },
      dismiss: (id?: string) => {
        // If no ID is provided, dismiss all toasts
        if (!id) return;
      },
      dismissAll: () => {}
    };
  }
  
  return {
    toasts: context.toasts,
    toast: (props: ToastProps) => {
      context.addToast(props);
    },
    dismiss: (id: string) => {
      context.dismissToast(id);
    },
    dismissAll: () => {
      context.dismissAll();
    }
  };
}
