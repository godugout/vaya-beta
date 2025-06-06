
// This is our custom hook implementation to work with both shadcn/ui toast and sonner
import { toast as sonnerToast } from "sonner";
import * as React from "react";
import { createContext, useContext, useState } from "react";

import type * as ToastPrimitives from "@radix-ui/react-toast";
import {
  type ToastActionElement,
  type ToastProps
} from "@/components/ui/toast";

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const ToastContext = createContext<{
  toasts: ToasterToast[];
  addToast: (toast: Omit<ToasterToast, "id">) => void;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
} | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider(props: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

  const addToast = React.useCallback(
    ({ ...props }: Omit<ToasterToast, "id">) => {
      setToasts((toasts) => [
        ...toasts,
        { id: crypto.randomUUID(), ...props },
      ]);
    },
    [setToasts]
  );

  const dismissToast = React.useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  }, [setToasts]);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, [setToasts]);

  const contextValue = {
    toasts,
    addToast,
    dismissToast,
    dismissAll
  };

  // We're returning a regular object here, not JSX
  return React.createElement(
    ToastContext.Provider,
    { value: contextValue },
    props.children
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    // If we're not in a ToastProvider, use sonner's toast directly
    return {
      toast: (props: ToastProps) => {
        if (typeof props === "string") {
          sonnerToast(props);
        } else {
          // Call sonner toast with title and description
          sonnerToast(props.title as string, {
            description: props.description,
          });
        }
      },
      toasts: [],
      dismiss: (id?: string) => {},
      dismissAll: () => {},
    };
  }

  return {
    toast: (props: ToastProps) => {
      if (typeof props === "string") {
        context.addToast({ title: props });
      } else {
        context.addToast(props as Omit<ToasterToast, "id">);
      }
    },
    toasts: context.toasts,
    dismiss: context.dismissToast,
    dismissAll: context.dismissAll,
  };
}

export const toast = (props: ToastProps) => {
  // Use sonner toast directly for simpler API
  if (typeof props === "string") {
    return sonnerToast(props);
  } 
  
  // Remove the variant property when passing to sonnerToast as it's not supported
  return sonnerToast(props.title as string, {
    description: props.description,
    // Don't pass variant to sonnerToast as it's not part of ExternalToast type
  });
};
