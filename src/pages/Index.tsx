
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/components/layout/MainLayout';
import { supabase } from '@/integrations/supabase/client';

export default function Index() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [hasFamilies, setHasFamilies] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [secretWord, setSecretWord] = useState('');
  const [joiningFamily, setJoiningFamily] = useState(false);
  
  useEffect(() => {
    const checkUserAndFamilies = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          const { count, error } = await supabase
            .from('families')
            .select('*', { count: 'exact', head: true });
            
          if (error) throw error;
          
          setHasFamilies(count !== null && count > 0);
        }
      } catch (error) {
        console.error('Error checking user and families:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUserAndFamilies();
  }, []);
  
  const handleJoinWithSecretWord = async () => {
    if (!secretWord.trim()) return;
    
    setJoiningFamily(true);
    try {
      // Check if the secret word is valid
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
      alert(error.message);
    } finally {
      setJoiningFamily(false);
    }
  };
  
  const handleCTAClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (hasFamilies === false) {
      navigate('/setup');
      return;
    }
    
    navigate('/families');
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Your Family App</h1>
          <p className="text-lg mb-8 text-gray-300">Preserve and share your family's history, stories, and memories</p>
          
          <div className="p-8 bg-slate-800 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Private Family Space</h2>
            <p className="mb-6 text-gray-300">
              This is a private space just for your family. Share stories, photos, and memories with the people who matter most.
            </p>
            
            {!user && (
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
            )}
            
            <Button 
              size="lg" 
              variant="default" 
              onClick={handleCTAClick}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Loading..." : 
               !user ? "Sign In or Join" : 
               hasFamilies === false ? "Create Your Family" : 
               "View Your Family"}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
