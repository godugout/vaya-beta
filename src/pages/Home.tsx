
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">{t('welcome')}</h1>
        <p className="text-xl mb-8">Preserve your family's memories and stories for generations to come.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-black/40 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Record Memories</h2>
            <p>Capture audio stories from family members</p>
          </div>
          
          <div className="bg-black/40 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Build Your Family Tree</h2>
            <p>Connect generations and visualize your heritage</p>
          </div>
          
          <div className="bg-black/40 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Create Time Capsules</h2>
            <p>Save memories to be revealed in the future</p>
          </div>
        </div>
      </div>
    </div>
  );
}
