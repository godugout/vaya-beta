
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentShowcase } from "@/components/showcase/ContentShowcase";
import { InputShowcase } from "@/components/showcase/InputShowcase";
import { ActionShowcase } from "@/components/showcase/ActionShowcase";
import { NavigationShowcase } from "@/components/showcase/NavigationShowcase";
import { MobileAppLayout } from "@/components/layout/MobileAppLayout";

export default function ComponentsShowcase() {
  return (
    <MobileAppLayout>
      <h1 className="text-3xl font-bold mb-6 text-hanuman-text-primary">Vaya Components</h1>
      
      <Tabs defaultValue="content" className="mb-8">
        <TabsList className="mb-6 w-full grid grid-cols-2 sm:grid-cols-4 gap-1 bg-hanuman-cosmic-blue/30">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
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
    </MobileAppLayout>
  );
}
