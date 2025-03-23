
import React from 'react';
import HanumanTopNav from "@/components/navigation/HanumanTopNav";
import EnhancedHanumanBackground from "@/components/hanuman/EnhancedHanumanBackground";
import { EnhancedHanumanChat } from "@/components/hanuman/EnhancedHanumanChat";
import HanumanSidebar from "@/components/hanuman/HanumanSidebar";
import HanumanResourcesSidebar from "@/components/hanuman/HanumanResourcesSidebar";
import { HanumanSidebarCategory } from "@/types/hanuman";
import { useState } from "react";

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
      
      <div className="container max-w-7xl mx-auto py-10 px-4 relative z-10 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 relative z-10">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <HanumanSidebar 
              categories={categories} 
              activeCategory={activeCategory} 
              onCategorySelect={setActiveCategory} 
            />
          </div>
          
          {/* Main Chat Area */}
          <div className="md:col-span-2">
            <div className="backdrop-blur-sm bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-green-900/15 rounded-3xl shadow-[0_0_40px_rgba(255,126,0,0.15)] p-5 h-full overflow-hidden border-none">
              <EnhancedHanumanChat activeCategory={activeCategory} />
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden lg:block">
            <HanumanResourcesSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HanumanEdition;
