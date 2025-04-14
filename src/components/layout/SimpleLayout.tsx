
import React from 'react';

interface SimpleLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className={`w-full max-w-md mx-auto min-h-screen border-x border-gray-200 px-4 py-6 ${className}`}>
        {children}
      </div>
    </div>
  );
};
