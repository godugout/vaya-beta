
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FiltersProps {
  children: React.ReactNode;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  className?: string;
  showSearch?: boolean;
}

export function Filters({
  children,
  searchPlaceholder = "Search...",
  onSearchChange,
  className,
  showSearch = true,
}: FiltersProps) {
  return (
    <div className={cn(
      "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-background py-4",
      className
    )}>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      
      {showSearch && (
        <div className="relative w-full md:w-auto min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-9 h-10"
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

interface FilterButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FilterButton({
  children,
  active = false,
  onClick,
  className,
}: FilterButtonProps) {
  return (
    <Button
      variant={active ? "forest" : "outline"}
      size="sm"
      onClick={onClick}
      className={cn("rounded-full", className)}
    >
      {children}
    </Button>
  );
}
