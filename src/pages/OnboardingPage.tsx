
import React, { useState } from 'react';
import { AidaLayout } from '@/components/layout/AidaLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const OnboardingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const slides = [
    {
      title: "Ask what you've always wanted to know",
      description: '"Tell me about your proudest moment"',
      image: "/lovable-uploads/f0ede801-068f-43a9-85ba-16652b3ca7a8.png"
    },
    {
      title: "Capture Their Stories",
      description: "Ask questions - let them share naturally through voice, text, photos, or video",
      image: "/lovable-uploads/f0ede801-068f-43a9-85ba-16652b3ca7a8.png"
    },
    {
      title: "Experience Memories",
      description: "Build collections that grow more precious with time",
      image: "/lovable-uploads/f0ede801-068f-43a9-85ba-16652b3ca7a8.png"
    }
  ];
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/home');
    }
  };
  
  return (
    <AidaLayout className="flex flex-col justify-between">
      <div className="h-full flex flex-col justify-between py-8">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <div className="mb-8">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-32 h-32 mx-auto opacity-75"
            />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">
            {slides[currentSlide].title}
          </h1>
          
          <p className="text-gray-600">
            {slides[currentSlide].description}
          </p>
        </div>
        
        <div className="mt-8">
          <div className="flex justify-center mb-8">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`aida-onboarding-dot ${index === currentSlide ? 'aida-onboarding-dot-active' : ''}`}
              />
            ))}
          </div>
          
          <button 
            className="w-full bg-black text-white rounded-full py-3 font-medium"
            onClick={handleNext}
          >
            {currentSlide < slides.length - 1 ? 'Continue' : 'Start here'}
          </button>
        </div>
      </div>
    </AidaLayout>
  );
};
