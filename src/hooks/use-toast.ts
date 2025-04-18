
import { toast as sonnerToast, type Toast as SonnerToast } from "sonner";
import {
  useToast as useShadcnToast,
} from "@/components/ui/toast";

export const toast = sonnerToast;

export function useToast() {
  return useShadcnToast();
}
