
import React from 'react';
import HanumanTopNav from "@/components/navigation/HanumanTopNav";
import HanumanBackground from "@/components/hanuman/HanumanBackground";
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
      <HanumanBackground />
      <HanumanTopNav />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-1 lg:col-span-1">
            <HanumanSidebar 
              categories={categories} 
              activeCategory={activeCategory} 
              onCategorySelect={setActiveCategory} 
            />
          </div>
          
          {/* Main Chat Area */}
          <div className="md:col-span-2 lg:col-span-2">
            <EnhancedHanumanChat activeCategory={activeCategory} />
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <HanumanResourcesSidebar />
          </div>
        </div>
      </div>
      
      {/* Mobile bottom resources (only visible on small screens) */}
      <div className="lg:hidden px-4 py-4">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-hanuman-orange/20">
          <h3 className="text-sm font-semibold text-hanuman-gold mb-2">Resources</h3>
          <p className="text-xs text-white/70">View more resources related to your conversation in landscape mode or on larger screens.</p>
        </div>
      </div>
    </div>
  );
};

export default HanumanEdition;
