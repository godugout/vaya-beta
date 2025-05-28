
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDevAuth } from "@/hooks/useDevAuth";
import { FamilyProvider } from "@/contexts/FamilyContext";
import { CultureProvider } from "@/contexts/CultureContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { pluginManager } from "@/plugins/PluginManager";
import { examplePlugin } from "@/plugins/examples/ExamplePlugin";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Families from "./pages/Families";
import CreateFamily from "./pages/CreateFamily";
import FamilyCapsules from "./pages/FamilyCapsules";
import ShareStories from "./pages/ShareStories";
import MemoryLane from "./pages/MemoryLane";
import MemoryPost from "./pages/MemoryPost";
import StoryDetailsPage from "./pages/StoryDetails";
import CapsuleDetails from "./pages/CapsuleDetails";
import Timeline from "./pages/Timeline";
import Foundation from "./pages/Foundation";

import { DesktopNav } from "./components/nav/DesktopNav";
import { MobileTopNav } from "./components/nav/MobileTopNav";
import { MobileBottomNav } from "./components/nav/MobileBottomNav";

const App = () => {
  const [isNavMinimized, setIsNavMinimized] = useState(false);
  const [pluginsInitialized, setPluginsInitialized] = useState(false);

  const toggleMinimize = () => {
    setIsNavMinimized(!isNavMinimized);
  };

  useDevAuth();

  // Initialize plugins
  useEffect(() => {
    const initializePlugins = async () => {
      try {
        // Register example plugin
        await pluginManager.register(examplePlugin);
        
        // Initialize all plugins
        await pluginManager.initialize();
        
        setPluginsInitialized(true);
        console.log('Plugins initialized successfully');
      } catch (error) {
        console.error('Failed to initialize plugins:', error);
        setPluginsInitialized(true); // Continue even if plugins fail
      }
    };

    initializePlugins();
  }, []);

  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <CultureProvider>
          <FamilyProvider>
            <div className="flex flex-col min-h-screen bg-background text-foreground">
              {/* Skip link for accessibility */}
              <a href="#main-content" className="skip-link focus-visible">
                Skip to main content
              </a>
              
              <ErrorBoundary>
                <DesktopNav 
                  showMinimizeButton={true} 
                  onToggleMinimize={toggleMinimize} 
                  isMinimized={isNavMinimized}
                  className="hidden md:flex h-16 border-b w-full" 
                />
                <MobileTopNav className="md:hidden" />
              </ErrorBoundary>
              
              <main 
                id="main-content"
                className={`flex-grow transition-all ${isNavMinimized ? 'md:pl-16' : 'md:pl-0'}`}
              >
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/foundation" element={<Foundation />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/families" element={<Families />} />
                    <Route path="/create-family" element={<CreateFamily />} />
                    <Route path="/family-capsules" element={<FamilyCapsules />} />
                    <Route path="/share-stories" element={<ShareStories />} />
                    <Route path="/memory-lane" element={<MemoryLane />} />
                    <Route path="/memory/:id" element={<MemoryPost />} />
                    <Route path="/story/:id" element={<StoryDetailsPage />} />
                    <Route path="/capsule/:id" element={<CapsuleDetails />} />
                    <Route path="/timeline" element={<Timeline />} />
                  </Routes>
                </ErrorBoundary>
              </main>
              
              <ErrorBoundary>
                <MobileBottomNav className="md:hidden" />
              </ErrorBoundary>
            </div>
          </FamilyProvider>
        </CultureProvider>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
};

export default App;
