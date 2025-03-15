
import React from 'react';
import HomeHero from '@/components/hero/HomeHero';
import { Features } from '@/components/home/Features';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { VoiceRecordingDemo } from '@/components/home/VoiceRecordingDemo';

const LandingPage = () => {
  return (
    <div className="w-full">
      <HomeHero isSpanish={false} />
      <VoiceRecordingDemo />
      <Features />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default LandingPage;
