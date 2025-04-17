
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Capsule } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

/**
 * Hook for creating a new capsule
 */
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

/**
 * Hook for adding an item to a capsule
 */
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
