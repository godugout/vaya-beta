
import React from 'react';

export const HeroPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url('/public/lovable-uploads/9458f25c-c9b9-48c2-8dfd-189a8ce4318f.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }} />
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1%, transparent 1.5%),
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 1%, transparent 1.5%)
        `,
        backgroundSize: '3rem 3rem',
        backgroundPosition: '0 0, 1.5rem 1.5rem',
        mixBlendMode: 'overlay'
      }} />
    </div>
  );
};
