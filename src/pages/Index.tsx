
import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { supabase } from '@/integrations/supabase/client';
import { HomeWelcomeSection } from '@/components/home/HomeWelcomeSection';
import { SecretWordSection } from '@/components/home/SecretWordSection';
import { HomeCTAButton } from '@/components/home/HomeCTAButton';

export default function Index() {
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

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <HomeWelcomeSection />
        
        <div className="p-8 bg-slate-800 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-white">Your Private Family Space</h2>
          <p className="mb-6 text-gray-300">
            This is a private space just for your family. Share stories, photos, and memories with the people who matter most.
          </p>
          
          <SecretWordSection user={user} />
          
          <HomeCTAButton user={user} hasFamilies={hasFamilies} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
}
