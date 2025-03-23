
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
      
      <div className="container max-w-7xl mx-auto py-12 px-4 relative z-10 mt-16">
        <div className="backdrop-blur-sm bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-green-900/15 rounded-3xl shadow-[0_0_40px_rgba(255,126,0,0.15)] p-8 overflow-hidden border-none">
          {/* Decorative cosmic elements */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-hanuman-primary/10 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-hanuman-green/10 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-hanuman-saffron/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
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
      </div>
    </div>
  );
};

export default HanumanEdition;
