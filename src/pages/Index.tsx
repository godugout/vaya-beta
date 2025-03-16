import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/MainLayout';
import { supabase } from '@/integrations/supabase/client';

export default function Index() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [hasFamilies, setHasFamilies] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  
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
              {!user && " Sign in with your email and your family's secret word to get started."}
              {user && hasFamilies === false && " You don't have a family set up yet. Create one to get started."}
            </p>
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
