import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CapsuleData, Capsule } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ITEMS_PER_PAGE = 10;

export const useCapsules = (status?: string[]) => {
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

export const useCapsule = (id?: string) => {
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

export const useCreateCapsule = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (capsule: Partial<Capsule>) => {
      const { data, error } = await supabase
        .from('capsules')
        .insert(capsule)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["capsules"] });
      toast({
        title: "Capsule created",
        description: "Your capsule has been created successfully.",
      });
    },
    onError: (error) => {
      console.error("Error creating capsule:", error);
      toast({
        variant: "destructive",
        title: "Error creating capsule",
        description: "There was a problem creating your capsule. Please try again.",
      });
    },
  });
};

export const useAddItemToCapsule = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      capsuleId, 
      itemType, 
      itemId 
    }: { 
      capsuleId: string; 
      itemType: 'memory' | 'story' | 'media'; 
      itemId: string;
    }) => {
      const { data, error } = await supabase
        .from('capsule_items')
        .insert({
          capsule_id: capsuleId,
          item_type: itemType,
          item_id: itemId,
          added_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["capsule", variables.capsuleId] });
      toast({
        title: "Item added",
        description: "The item has been added to the capsule.",
      });
    },
    onError: (error) => {
      console.error("Error adding item to capsule:", error);
      toast({
        variant: "destructive",
        title: "Error adding item",
        description: "There was a problem adding the item to the capsule. Please try again.",
      });
    },
  });
};
