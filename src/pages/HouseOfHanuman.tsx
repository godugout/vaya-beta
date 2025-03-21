
import React, { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { HouseOfHanumanContent } from '@/components/sacred/HouseOfHanumanContent';
import '@fontsource/baloo-bhai-2/400.css';
import '@fontsource/baloo-bhai-2/600.css';
import '@fontsource/baloo-bhai-2/700.css';
import '@fontsource/rasa/400.css';
import '@fontsource/rasa/500.css';
import '@fontsource/rasa/600.css';

const HouseOfHanuman = () => {
  // Add the font links when the component mounts
  useEffect(() => {
    document.title = "House of Hanuman | VayaSpace";
    
    // Apply special background for this page
    document.body.classList.add('purple-cosmic-bg');
    
    return () => {
      // Remove the background class when component unmounts
      document.body.classList.remove('purple-cosmic-bg');
    };
  }, []);

  return (
    <MainLayout className="house-of-hanuman">
      <HouseOfHanumanContent />
    </MainLayout>
  );
};

export default HouseOfHanuman;
