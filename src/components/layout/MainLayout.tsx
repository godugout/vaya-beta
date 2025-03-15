
import React from 'react';
import { MainNav } from '@/components/MainNav';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from "@/components/ui/toaster";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className = "" }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-sky-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <MainNav />
      <main className={`flex-grow pt-16 ${className}`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};
