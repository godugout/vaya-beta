
export const HeroPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Light dots pattern with improved contrast */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(224, 102, 0, 0.4) 1%, transparent 1.5%),
          radial-gradient(circle at 75% 75%, rgba(224, 102, 0, 0.4) 1%, transparent 1.5%),
          radial-gradient(circle at 50% 50%, rgba(224, 102, 0, 0.4) 1%, transparent 1.5%)
        `,
        backgroundSize: '6rem 6rem',
        backgroundPosition: '0 0, 3rem 3rem, 1.5rem 1.5rem'
      }} />
      
      {/* Background wavy lines with improved contrast */}
      <div className="absolute inset-0 mix-blend-soft-light opacity-40" style={{
        backgroundImage: `
          linear-gradient(45deg, rgba(224, 102, 0, 0.3) 25%, transparent 25%, transparent 50%, rgba(224, 102, 0, 0.3) 50%, rgba(224, 102, 0, 0.3) 75%, transparent 75%, transparent)
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
