
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentShowcase } from "@/components/showcase/ContentShowcase";
import { InputShowcase } from "@/components/showcase/InputShowcase";
import { ActionShowcase } from "@/components/showcase/ActionShowcase";
import { NavigationShowcase } from "@/components/showcase/NavigationShowcase";

export default function ComponentsShowcase() {
  return (
    <div className="container max-w-7xl py-10">
      <h1 className="text-4xl font-bold mb-10">Vaya Component Library</h1>
      
      <Tabs defaultValue="content" className="mb-10">
        <TabsList className="mb-8">
          <TabsTrigger value="content">Content Containers</TabsTrigger>
          <TabsTrigger value="input">Input Controls</TabsTrigger>
          <TabsTrigger value="actions">Action Components</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
        </TabsList>
        
        {/* Content Containers */}
        <TabsContent value="content">
          <ContentShowcase />
        </TabsContent>
        
        {/* Input Controls */}
        <TabsContent value="input">
          <InputShowcase />
        </TabsContent>
        
        {/* Action Components */}
        <TabsContent value="actions">
          <ActionShowcase />
        </TabsContent>

        {/* Navigation Components */}
        <TabsContent value="navigation">
          <NavigationShowcase />
        </TabsContent>
      </Tabs>
    </div>
  );
}
