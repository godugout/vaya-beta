
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { FamilyContext } from "@/components/chat/types";

export const useFamilyContextManagement = () => {
  const [familyContext, setFamilyContext] = useState<any>(null);
  const { toast } = useToast();

  const loadFamilyContext = async () => {
    // Try to get from local storage first
    const localContext = localStorage.getItem('familyContextData');
    
    if (localContext) {
      setFamilyContext(JSON.parse(localContext));
      return;
    }
    
    // Then try to get from Supabase if user is logged in
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data, error } = await supabase
        .from('user_family_context')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.error("Error fetching family context:", error);
        return;
      }
      
      if (data) {
        setFamilyContext(data.context_data);
        // Also save to localStorage for quicker access next time
        localStorage.setItem('familyContextData', JSON.stringify(data.context_data));
      }
    } catch (error) {
      console.error("Error in loadFamilyContext:", error);
    }
  };

  const saveFamilyContext = async (contextData: FamilyContext) => {
    try {
      // Save to localStorage
      localStorage.setItem('familyContextData', JSON.stringify(contextData));
      setFamilyContext(contextData);
      
      // Save to Supabase if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { error } = await supabase
        .from('user_family_context')
        .upsert({ 
          user_id: user.id, 
          context_data: contextData,
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'user_id' 
        });
      
      if (error) {
        console.error("Error saving family context:", error);
        toast({
          title: "Error",
          description: "Failed to save your family context",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Success",
        description: "Your family context has been saved",
        variant: "default",
      });
    } catch (error) {
      console.error("Error in saveFamilyContext:", error);
      toast({
        title: "Error",
        description: "Failed to save your family context",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadFamilyContext();
  }, []);

  return {
    familyContext,
    loadFamilyContext,
    saveFamilyContext
  };
};
