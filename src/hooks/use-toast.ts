
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

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        dismissToast,
        dismissAll,
      }}
    >
      {children}
    </ToastContext.Provider>
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
  
  return sonnerToast(props.title as string, {
    description: props.description,
    variant: props.variant
  });
};
