
import { useInfiniteQuery } from "@tanstack/react-query";
import { Story } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ITEMS_PER_PAGE = 5;

/**
 * Hook to fetch a paginated list of stories with optional featured filtering
 */
export const useStoriesList = (featuredOnly?: boolean) => {
  const { toast } = useToast();

  return useInfiniteQuery({
    queryKey: ["stories", { featuredOnly }],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      try {
        let query = supabase
          .from('stories')
          .select('*')
          .order('created_at', { ascending: false });

        if (featuredOnly) {
          query = query.eq('is_featured', true);
        }

        const { data, error } = await query.range(from, to);

        if (error) {
          throw error;
        }

        return {
          stories: data,
          nextPage: data.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
        };
      } catch (error) {
        console.error("Error fetching stories:", error);
        toast({
          variant: "destructive",
          title: "Error fetching stories",
          description: "There was a problem loading your stories. Please try again.",
        });

        return {
          stories: [],
          nextPage: undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};
