
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const WelcomePage = () => {
  return (
    <div className="aida-welcome">
      <div className="aida-logo">
        <img 
          src="/lovable-uploads/a13e3eee-a6a0-40a3-8dea-0f28af1f142e.png" 
          alt="Vaya Logo" 
          className="w-8 h-8"
        />
      </div>
      
      <h1 className="aida-welcome-title">Vaya</h1>
      
      <h2 className="aida-welcome-subtitle">
        Stories Fade.<br />
        Save Them.
      </h2>
      
      <p className="text-[#aaadb0] mb-8">
        Every person you know has a story waiting to be told
      </p>
      
      <div className="w-full max-w-xs space-y-4 mt-4">
        <Link to="/onboarding" className="block w-full">
          <button className="w-full bg-white text-black rounded-full py-3 font-medium">
            Begin
          </button>
        </Link>
        
        <Link to="/login" className="block w-full">
          <button className="w-full bg-transparent border border-white text-white rounded-full py-3 font-medium">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};
