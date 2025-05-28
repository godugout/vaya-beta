
import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface AsyncOperationState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseAsyncOperationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export const useAsyncOperation = <T = any>(
  options: UseAsyncOperationOptions = {}
) => {
  const { toast } = useToast();
  const [state, setState] = useState<AsyncOperationState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (asyncFn: () => Promise<T>) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const result = await asyncFn();
        setState({ data: result, loading: false, error: null });
        
        if (options.showToast && options.successMessage) {
          toast({
            title: "Success",
            description: options.successMessage,
          });
        }
        
        options.onSuccess?.(result);
        return result;
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error));
        setState(prev => ({ ...prev, loading: false, error: errorObj }));
        
        if (options.showToast) {
          toast({
            title: "Error",
            description: options.errorMessage || errorObj.message,
            variant: "destructive",
          });
        }
        
        options.onError?.(errorObj);
        throw errorObj;
      }
    },
    [options, toast]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};
