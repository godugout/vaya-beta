
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Plus, X } from 'lucide-react';

interface FamilyAccessCode {
  id: string;
  secret_word: string;
  created_at: string;
  active: boolean;
}

export function FamilySecretManager({ familyId }: { familyId: string }) {
  const [secretWords, setSecretWords] = useState<FamilyAccessCode[]>([]);
  const [newSecretWord, setNewSecretWord] = useState('');
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

  useEffect(() => {
    if (familyId) {
      fetchSecretWords();
    }
  }, [familyId]);

  const addSecretWord = async () => {
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

      setNewSecretWord('');
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Secret word copied to clipboard',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Family Secret Words</CardTitle>
        <CardDescription>
          Manage the secret words that allow family members to join this family.
          Share these only with people you want to invite.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter a new secret word"
            value={newSecretWord}
            onChange={(e) => setNewSecretWord(e.target.value)}
          />
          <Button 
            onClick={addSecretWord} 
            disabled={loading || !newSecretWord.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {secretWords.length === 0 ? (
            <p className="text-sm text-gray-500">No secret words found. Create one to allow family members to join.</p>
          ) : (
            secretWords.map((code) => (
              <div 
                key={code.id} 
                className={`flex items-center justify-between p-3 rounded-md ${
                  code.active ? 'bg-gray-100 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900 opacity-50'
                }`}
              >
                <div className="flex-1">
                  <p className="font-medium">{code.secret_word}</p>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(code.created_at).toLocaleDateString()}
                    {!code.active && ' (Inactive)'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {code.active && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(code.secret_word)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deactivateSecretWord(code.id)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-gray-500">
          Active secret words: {secretWords.filter(code => code.active).length}
        </p>
      </CardFooter>
    </Card>
  );
}
