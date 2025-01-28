import React from 'react';

export const HeroPattern = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(254, 247, 205, 0.15) 1%, transparent 1.5%),
          radial-gradient(circle at 50% 50%, rgba(242, 252, 226, 0.15) 1%, transparent 1.5%)
        `,
        backgroundSize: '3rem 3rem',
        backgroundPosition: '0 0, 1.5rem 1.5rem',
      }} />
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(254, 198, 161, 0.15) 1%, transparent 1.5%),
          radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.15) 1%, transparent 1.5%)
        `,
        backgroundSize: '4rem 4rem',
        backgroundPosition: '2rem 2rem, 0 0',
      }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(249, 115, 22, 0.2) 100%)',
      }} />
    </div>
  );
};