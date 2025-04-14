
import React from 'react';

interface AidaLayoutProps {
  children: React.ReactNode;
  className?: string;
  withPadding?: boolean;
}

export const AidaLayout: React.FC<AidaLayoutProps> = ({
  children,
  className = '',
  withPadding = true
}) => {
  return (
    <div className="min-h-screen bg-white text-black flex justify-center">
      <div 
        className={`w-full max-w-md min-h-screen ${withPadding ? 'px-4 py-6' : ''} ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
