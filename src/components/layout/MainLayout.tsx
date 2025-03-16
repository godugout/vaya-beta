
import React, { useState } from 'react';
import { MainNav } from '@/components/MainNav';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from "@/components/ui/toaster";
import { MobileBottomNav } from '@/components/nav/MobileBottomNav';
import { MobileTopNav } from '@/components/nav/MobileTopNav';
import { DesktopNav } from '@/components/nav/DesktopNav';
import { useNavigate } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className = "" }: MainLayoutProps) => {
  const navigate = useNavigate();
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  
  const handleVoiceToggle = () => {
    setIsVoiceActive(prev => !prev);
  };
  
  const handleSettingsToggle = () => {
    setIsSimplifiedView(prev => !prev);
  };
  
  const handleSignOut = async () => {
    // Placeholder for sign out functionality
    console.log("Sign out clicked");
    return Promise.resolve();
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Mobile Top Navigation */}
      <MobileTopNav 
        user={null} 
        handleSignOut={handleSignOut} 
        navigate={navigate}
        isSimplifiedView={isSimplifiedView}
        onSettingsToggle={handleSettingsToggle}
      />
      
      {/* Desktop Navigation */}
      <DesktopNav 
        user={null} 
        handleSignOut={handleSignOut} 
        navigate={navigate}
        isSimplifiedView={isSimplifiedView}
        isVoiceActive={isVoiceActive}
        onVoiceToggle={handleVoiceToggle}
      />
      
      {/* Voice Navigation Banner - show when voice is active */}
      {isVoiceActive && (
        <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-autumn text-white flex items-center justify-center">
              <span className="text-xs">Om</span>
            </div>
            <span className="text-sm font-medium">Hanuman voice navigation active</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-400">Listening...</span>
          </div>
        </div>
      )}
      
      <main className={`flex-grow pt-16 ${className}`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <Footer />
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        user={null} 
        navigate={navigate}
        isSimplifiedView={isSimplifiedView}
        isVoiceActive={isVoiceActive}
        onVoiceToggle={handleVoiceToggle}
      />
      
      <Toaster />
    </div>
  );
};
