import React from 'react';

export const HeroPattern = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, #FEF7CD 1%, transparent 1.5%),
          radial-gradient(circle at 50% 50%, #F2FCE2 1%, transparent 1.5%)
        `,
        backgroundSize: '3rem 3rem',
        backgroundPosition: '0 0, 1.5rem 1.5rem',
      }} />
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, #FEC6A1 1%, transparent 1.5%),
          radial-gradient(circle at 50% 50%, #0EA5E9 1%, transparent 1.5%)
        `,
        backgroundSize: '4rem 4rem',
        backgroundPosition: '2rem 2rem, 0 0',
      }} />
    </div>
  );
};