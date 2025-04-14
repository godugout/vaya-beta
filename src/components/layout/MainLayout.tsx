
import React from 'react';
import HanumanTopNav from "@/components/navigation/HanumanTopNav";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <HanumanTopNav />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};
