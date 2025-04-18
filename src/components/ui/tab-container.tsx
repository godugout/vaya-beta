
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabContainerProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
  listClassName?: string;
  contentClassName?: string;
  variant?: "default" | "filled" | "outline";
}

export function TabContainer({
  tabs,
  defaultValue,
  className,
  listClassName,
  contentClassName,
  variant = "default",
}: TabContainerProps) {
  const initialTab = defaultValue || tabs[0]?.value;
  
  const variantClasses = {
    default: "bg-muted",
    filled: "bg-card shadow-sm",
    outline: "border rounded-xl p-1 bg-background",
  };

  return (
    <Tabs defaultValue={initialTab} className={cn("w-full", className)}>
      <TabsList className={cn("mb-6", variantClasses[variant], listClassName)}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-1.5">
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent 
          key={tab.value} 
          value={tab.value}
          className={cn("rounded-md", contentClassName)}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
