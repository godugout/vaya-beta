
import { useInfiniteQuery } from "@tanstack/react-query";
import { CapsuleData } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ITEMS_PER_PAGE = 10;

/**
 * Hook to fetch a paginated list of capsules with optional status filtering
 */
export const useCapsulesList = (status?: string[]) => {
  const { toast } = useToast();

  return useInfiniteQuery({
    queryKey: ["capsules", { status }],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      try {
        let query = supabase
          .from('capsules')
          .select('*')
          .order('created_at', { ascending: false });

        if (status && status.length > 0) {
          query = query.in('status', status);
        }

        const { data, error } = await query.range(from, to);

        if (error) {
          throw error;
        }

        // For each capsule, get the count of items
        const capsulesWithItemCounts = await Promise.all(
          data.map(async (capsule) => {
            const { count, error: countError } = await supabase
              .from('capsule_items')
              .select('*', { count: 'exact', head: true })
              .eq('capsule_id', capsule.id);

            if (countError) {
              console.error("Error fetching capsule items count:", countError);
              return { ...capsule, itemCount: 0 };
            }

            return {
              ...capsule,
              itemCount: count || 0
            } as CapsuleData;
          })
        );

        return {
          capsules: capsulesWithItemCounts,
          nextPage: capsulesWithItemCounts.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
        };
      } catch (error) {
        console.error("Error fetching capsules:", error);
        toast({
          variant: "destructive",
          title: "Error fetching capsules",
          description: "There was a problem loading your capsules. Please try again.",
        });

        return {
          capsules: [],
          nextPage: undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};
