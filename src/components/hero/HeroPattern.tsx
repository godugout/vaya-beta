
export const HeroPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Light dots pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255, 165, 0, 0.3) 1%, transparent 1.5%),
          radial-gradient(circle at 75% 75%, rgba(255, 165, 0, 0.3) 1%, transparent 1.5%),
          radial-gradient(circle at 50% 50%, rgba(255, 165, 0, 0.3) 1%, transparent 1.5%)
        `,
        backgroundSize: '6rem 6rem',
        backgroundPosition: '0 0, 3rem 3rem, 1.5rem 1.5rem'
      }} />
      
      {/* Background wavy lines */}
      <div className="absolute inset-0 mix-blend-soft-light opacity-30" style={{
        backgroundImage: `
          linear-gradient(45deg, rgba(255, 120, 0, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 120, 0, 0.2) 50%, rgba(255, 120, 0, 0.2) 75%, transparent 75%, transparent)
        `,
        backgroundSize: '8rem 8rem',
        animationName: 'wavePattern',
        animationDuration: '50s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite'
      }} />
    </div>
  );
};
