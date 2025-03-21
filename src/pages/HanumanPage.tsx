
import React from 'react';
import { HouseOfHanuman } from '@/components/sacred/HouseOfHanuman';
import { LanguageProvider } from '@/contexts/LanguageContext';

const HanumanPage: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-heading text-white text-center mb-8">
            Sacred Teachings
          </h1>
          
          <HouseOfHanuman />
          
          <div className="mt-10 text-center text-sm text-white/60">
            <p>
              The teachings of Hanuman inspire strength and devotion across generations.
            </p>
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default HanumanPage;
