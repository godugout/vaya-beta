
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface SecretWordSectionProps {
  user: any | null;
}

// Special secret words that are always accepted
const SPECIAL_SECRET_WORDS = ['hanuman', 'jsk', 'sriram', 'ramramram'];

export const SecretWordSection = ({ user }: SecretWordSectionProps) => {
  const navigate = useNavigate();
  const [secretWord, setSecretWord] = useState('');
  const [joiningFamily, setJoiningFamily] = useState(false);
  const { toast } = useToast();
  
  const handleJoinWithSecretWord = async () => {
    if (!secretWord.trim()) return;
    
    setJoiningFamily(true);
    try {
      // Check if the secret word is one of the special words that should always be accepted
      if (SPECIAL_SECRET_WORDS.includes(secretWord.toLowerCase().trim())) {
        // Get the first family to join
        const { data: families, error: familiesError } = await supabase
          .from('families')
          .select('id')
          .limit(1);
          
        if (familiesError) throw familiesError;
        
        if (families && families.length > 0) {
          const familyId = families[0].id;
          
          if (user) {
            // User is logged in, add them to the family
            const { error: memberError } = await supabase
              .from('family_members')
              .insert({
                family_id: familyId,
                user_id: user.id,
                role: 'member'
              });
              
            if (memberError) throw memberError;
            
            toast({
              title: "Welcome to the Family!",
              description: "You've successfully joined using a special access code.",
            });
            
            // Navigate to that family
            navigate(`/family/${familyId}`);
          } else {
            // User is not logged in, send them to auth with the secret word
            navigate(`/auth?secret=${encodeURIComponent(secretWord)}`);
          }
          return;
        }
      }
      
      // Standard flow for checking the secret word in the database
      const { data: familyId, error } = await supabase.rpc('check_family_secret', {
        _secret_word: secretWord.trim()
      });

      if (error) throw error;
      
      if (familyId) {
        if (user) {
          // User is logged in, add them to the family
          const { error: memberError } = await supabase
            .from('family_members')
            .insert({
              family_id: familyId,
              user_id: user.id,
              role: 'member'
            });
            
          if (memberError) throw memberError;
          
          toast({
            title: "Welcome to the Family!",
            description: "You've successfully joined with the family secret word.",
          });
          
          // Navigate to that family
          navigate(`/family/${familyId}`);
        } else {
          // User is not logged in, send them to auth with the secret word
          navigate(`/auth?secret=${encodeURIComponent(secretWord)}`);
        }
      } else {
        throw new Error('Invalid secret word. Please try again or contact your family administrator.');
      }
    } catch (error: any) {
      console.error('Error joining family:', error);
      toast({
        title: "Error Joining Family",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setJoiningFamily(false);
    }
  };

  if (!user) {
    return (
      <div className="mb-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="secret-word" className="text-white">Have a family secret word?</Label>
          <div className="flex gap-2">
            <Input
              id="secret-word"
              placeholder="Enter family secret word"
              value={secretWord}
              onChange={(e) => setSecretWord(e.target.value)}
              className="bg-slate-700 text-white border-slate-600"
            />
            <Button 
              onClick={handleJoinWithSecretWord}
              disabled={!secretWord.trim() || joiningFamily}
              className="whitespace-nowrap"
            >
              {joiningFamily ? "Joining..." : "Join Family"}
            </Button>
          </div>
          <p className="text-xs text-gray-400">
            If you have a secret word from your family, enter it here to join.
          </p>
        </div>
      </div>
    );
  }
  
  return null;
};
