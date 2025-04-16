
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreeDeciduous, Package, Bot } from "lucide-react";
import { DemoHeader } from "@/components/demo/DemoHeader";
import { DemoFooter } from "@/components/demo/DemoFooter";
import { FamilyTreeSection } from "@/components/demo/sections/FamilyTreeSection";
import { MemoryCapsuleSection } from "@/components/demo/sections/MemoryCapsuleSection";
import { NarraAssistantSection } from "@/components/demo/sections/NarraAssistantSection";

const ComponentsDemo = () => {
  const [activeTab, setActiveTab] = useState("family-tree");

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen text-white">
      <div className="container mx-auto py-12 px-4">
        <DemoHeader />
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-10">
          <TabsList className="grid grid-cols-3 w-full max-w-3xl mx-auto bg-gray-800 p-1 rounded-lg">
            <TabsTrigger 
              value="family-tree" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-md"
            >
              <TreeDeciduous className="h-4 w-4 mr-2" />
              Family Tree
            </TabsTrigger>
            <TabsTrigger 
              value="memory-capsules"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-md"
            >
              <Package className="h-4 w-4 mr-2" />
              Memory Capsules
            </TabsTrigger>
            <TabsTrigger 
              value="narra-assistant"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-md"
            >
              <Bot className="h-4 w-4 mr-2" />
              Narra Assistant
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="family-tree" className="space-y-16">
            <FamilyTreeSection />
          </TabsContent>
          
          <TabsContent value="memory-capsules" className="space-y-16">
            <MemoryCapsuleSection />
          </TabsContent>
          
          <TabsContent value="narra-assistant" className="space-y-16">
            <NarraAssistantSection />
          </TabsContent>
        </Tabs>
        
        <DemoFooter />
      </div>
    </div>
  );
};

export default ComponentsDemo;
