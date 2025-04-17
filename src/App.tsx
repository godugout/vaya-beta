import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster"

import { Index } from "./pages";
import { Auth } from "./pages/Auth";
import { Profile } from "./pages/Profile";
import { Families } from "./pages/Families";
import { CreateFamily } from "./pages/CreateFamily";
import { FamilyCapsules } from "./pages/FamilyCapsules";
import { ShareStories } from "./pages/ShareStories";
import { MemoryLane } from "./pages/MemoryLane";
import MemoryPost from "./pages/MemoryPost";
import StoryDetailsPage from "./pages/StoryDetails";
import CapsuleDetails from "./pages/CapsuleDetails";

import { DesktopNav } from "./components/nav/desktop/DesktopNav";
import { MobileTopNav } from "./components/nav/MobileTopNav";
import { MobileBottomNav } from "./components/nav/MobileBottomNav";
import Timeline from "./pages/Timeline";

const App = () => {
  const [isNavMinimized, setIsNavMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsNavMinimized(!isNavMinimized);
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <DesktopNav 
            className="hidden md:flex" 
            showMinimizeButton={true} 
            onToggleMinimize={toggleMinimize} 
            isMinimized={isNavMinimized}
          />
          <MobileTopNav className="md:hidden" />
          
          <div className={`flex-grow transition-all ${isNavMinimized ? 'md:ml-16' : 'md:ml-64'}`}>
            <Routes>
              <Route path="/" element={<Index />} />
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
          </div>
          
          <MobileBottomNav className="md:hidden" />
        </div>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
