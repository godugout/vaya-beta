
import { useState } from "react";
import { TimelineViewProps, TimelineGroup, TimelinePeriod } from "./types";
import { useTimeline } from "./useTimeline";
import { TimelineFilter } from "./TimelineFilters";
import { TimelineItemCard } from "./TimelineItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TimelineView = ({
  items: propItems,
  isLoading: propIsLoading,
  filters: propFilters,
  onFilterChange,
  emptyStateMessage = "No items found for the selected time period"
}: TimelineViewProps) => {
  // If props are provided, use them; otherwise, use the hook
  const hookResult = useTimeline(propFilters);
  
  const items = propItems || hookResult.items;
  const isLoading = propIsLoading !== undefined ? propIsLoading : hookResult.isLoading;
  const filters = propFilters || hookResult.filters;
  const handleFilterChange = onFilterChange || hookResult.updateFilters;
  
  const groupBy = filters.groupBy || 'month';
  const groupedItems = hookResult.groupItemsByPeriod(items, groupBy as TimelinePeriod);
  
  // Navigation state
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const currentGroup = groupedItems[currentGroupIndex];
  const hasNext = currentGroupIndex < groupedItems.length - 1;
  const hasPrevious = currentGroupIndex > 0;
  
  const goToNext = () => {
    if (hasNext) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    }
  };
  
  const goToPrevious = () => {
    if (hasPrevious) {
      setCurrentGroupIndex(currentGroupIndex - 1);
    }
  };
  
  // Quick navigation to specific periods
  const [showPeriodNav, setShowPeriodNav] = useState(false);
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <TimelineFilter filters={filters} onFilterChange={handleFilterChange} />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-8 w-40" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-24 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <TimelineFilter filters={filters} onFilterChange={handleFilterChange} />
        <div className="text-center py-12 border rounded-lg">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No items found</h3>
          <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
            {emptyStateMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TimelineFilter filters={filters} onFilterChange={handleFilterChange} />
      
      {/* Period navigation */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Timeline</h2>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            disabled={!hasPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            className="min-w-32"
            onClick={() => setShowPeriodNav(!showPeriodNav)}
          >
            {currentGroup ? currentGroup.label : 'Select Period'}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={!hasNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Quick period navigation dropdown */}
      {showPeriodNav && (
        <div className="relative">
          <div className="absolute right-0 z-10 mt-2 w-56 bg-popover text-popover-foreground rounded-md shadow-lg ring-1 ring-black ring-opacity-5 max-h-96 overflow-y-auto">
            <ScrollArea className="h-96">
              <div className="py-1">
                {groupedItems.map((group, index) => (
                  <button
                    key={index}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary ${
                      index === currentGroupIndex ? 'bg-secondary' : ''
                    }`}
                    onClick={() => {
                      setCurrentGroupIndex(index);
                      setShowPeriodNav(false);
                    }}
                  >
                    {group.label} ({group.items.length})
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
      
      <div className="relative border-l-2 border-dashed border-gray-300 dark:border-gray-700 pl-8 ml-4">
        {currentGroup ? (
          <>
            <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary"></div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-1">{currentGroup.label}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{currentGroup.items.length} {currentGroup.items.length === 1 ? 'item' : 'items'}</span>
              </p>
            </div>
            
            <div className="space-y-4">
              {currentGroup.items.map((item) => (
                <div key={item.id} className="relative">
                  <div className="absolute -left-10 top-4 h-2 w-2 rounded-full bg-gray-400"></div>
                  <TimelineItemCard item={item} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-6 text-center">
            <p>No items to display. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
