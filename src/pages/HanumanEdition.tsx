
import React from 'react';
import { useState } from "react";
import HanumanTopNav from "@/components/navigation/HanumanTopNav";
import EnhancedHanumanBackground from "@/components/hanuman/EnhancedHanumanBackground";
import { EnhancedHanumanChat } from "@/components/hanuman/EnhancedHanumanChat";
import HanumanSidebar from "@/components/hanuman/HanumanSidebar";
import { HanumanSidebarCategory } from "@/types/hanuman";
import { HanumanResourcesTabs } from "@/components/hanuman/HanumanResourcesTabs";

const HanumanEdition: React.FC = () => {
  // Sample categories for the sidebar
  const [categories] = useState<HanumanSidebarCategory[]>([
    { id: "family", name: "Family History", description: "Explore your family's roots and heritage" },
    { id: "traditions", name: "Traditions", description: "Discover and share family traditions" },
    { id: "stories", name: "Personal Stories", description: "Share personal memories and experiences" },
    { id: "wisdom", name: "Ancestral Wisdom", description: "Pass down knowledge and lessons" },
    { id: "celebrations", name: "Celebrations", description: "Remember important family events" }
  ]);
  
  const [activeCategory, setActiveCategory] = useState("family");

  return (
    <div className="hanuman-theme min-h-screen flex flex-col bg-hanuman-dark text-white relative">
      <EnhancedHanumanBackground />
      <HanumanTopNav />
      
      <div className="container max-w-7xl mx-auto py-6 pb-4 px-4 relative z-10 mt-16 flex-1 flex flex-col">
        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10 flex-1">
          {/* Left Sidebar - 1/3 width with glassmorphism effect */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-green-900/15 backdrop-blur-sm rounded-2xl border border-hanuman-orange/20 shadow-[0_0_30px_rgba(255,126,0,0.15)] h-full overflow-hidden">
              <HanumanSidebar 
                categories={categories} 
                activeCategory={activeCategory} 
                onCategorySelect={setActiveCategory} 
              />
            </div>
          </div>
          
          {/* Main Chat Area - 2/3 width */}
          <div className="md:col-span-2">
            <EnhancedHanumanChat activeCategory={activeCategory} />
          </div>
        </div>
        
        {/* Full-width Resources Tabs Section */}
        <div className="mt-8 relative z-10">
          <HanumanResourcesTabs />
        </div>
      </div>
    </div>
  );
};

export default HanumanEdition;
