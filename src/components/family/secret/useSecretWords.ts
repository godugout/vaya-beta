
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface FamilyAccessCode {
  id: string;
  secret_word: string;
  created_at: string;
  active: boolean;
}

export function useSecretWords(familyId: string) {
  const [secretWords, setSecretWords] = useState<FamilyAccessCode[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSecretWords = async () => {
    try {
      const { data, error } = await supabase
        .from('family_access_codes')
        .select('*')
        .eq('family_id', familyId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSecretWords(data || []);
    } catch (error: any) {
      console.error('Error fetching secret words:', error);
      toast({
        title: 'Error',
        description: 'Failed to load family secret words',
        variant: 'destructive',
      });
    }
  };

  const addSecretWord = async (newSecretWord: string) => {
    if (!newSecretWord.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a secret word',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('family_access_codes')
        .insert({
          family_id: familyId,
          secret_word: newSecretWord,
          created_by: userData.user?.id,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'New family secret word added',
      });
      fetchSecretWords();
    } catch (error: any) {
      console.error('Error adding secret word:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deactivateSecretWord = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('family_access_codes')
        .update({ active: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Family secret word deactivated',
      });
      fetchSecretWords();
    } catch (error: any) {
      console.error('Error deactivating secret word:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (familyId) {
      fetchSecretWords();
    }
  }, [familyId]);

  return {
    secretWords,
    loading,
    addSecretWord,
    deactivateSecretWord
  };
}
