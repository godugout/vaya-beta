
import React from 'react';
import { useState } from "react";
import HanumanTopNav from "@/components/navigation/HanumanTopNav";
import EnhancedHanumanBackground from "@/components/hanuman/EnhancedHanumanBackground";
import { EnhancedHanumanChat } from "@/components/hanuman/EnhancedHanumanChat";
import HanumanSidebar from "@/components/hanuman/HanumanSidebar";
import HanumanResourcesSidebar from "@/components/hanuman/HanumanResourcesSidebar";
import { HanumanSidebarCategory } from "@/types/hanuman";

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
      
      <div className="container max-w-7xl mx-auto py-10 pb-4 px-4 relative z-10 mt-16 flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 relative z-10 flex-1">
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
            <EnhancedHanumanChat activeCategory={activeCategory} />
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
