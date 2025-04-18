
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDevAuth } from "@/hooks/useDevAuth";

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

import { DesktopNav } from "./components/nav/DesktopNav";
import { MobileTopNav } from "./components/nav/MobileTopNav";
import { MobileBottomNav } from "./components/nav/MobileBottomNav";

const App = () => {
  const [isNavMinimized, setIsNavMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsNavMinimized(!isNavMinimized);
  };

  useDevAuth(); // Add this line for development auto-login

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <DesktopNav 
        showMinimizeButton={true} 
        onToggleMinimize={toggleMinimize} 
        isMinimized={isNavMinimized}
        className="hidden md:flex h-16 border-b w-full" 
      />
      <MobileTopNav className="md:hidden" />
      
      <main className={`flex-grow transition-all ${isNavMinimized ? 'md:pl-16' : 'md:pl-0'}`}>
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
      </main>
      
      <MobileBottomNav className="md:hidden" />
    </div>
  );
};

export default App;
