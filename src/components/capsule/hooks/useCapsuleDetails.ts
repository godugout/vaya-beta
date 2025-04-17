
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

/**
 * Hook to fetch details for a specific capsule by ID
 */
export const useCapsuleDetails = (id?: string) => {
  const { toast } = useToast();

  return useInfiniteQuery({
    queryKey: ["capsule", id],
    queryFn: async () => {
      if (!id) {
        return { capsule: null, items: [] };
      }

      try {
        // Fetch the capsule
        const { data: capsule, error: capsuleError } = await supabase
          .from('capsules')
          .select('*')
          .eq('id', id)
          .single();

        if (capsuleError) {
          throw capsuleError;
        }

        // Fetch the capsule items
        const { data: items, error: itemsError } = await supabase
          .from('capsule_items')
          .select('*')
          .eq('capsule_id', id)
          .order('created_at', { ascending: false });

        if (itemsError) {
          throw itemsError;
        }

        return {
          capsule,
          items,
        };
      } catch (error) {
        console.error("Error fetching capsule:", error);
        toast({
          variant: "destructive",
          title: "Error fetching capsule",
          description: "There was a problem loading the capsule. Please try again.",
        });

        return {
          capsule: null,
          items: [],
        };
      }
    },
    getNextPageParam: () => null,
    initialPageParam: 0,
    enabled: !!id,
  });
};
