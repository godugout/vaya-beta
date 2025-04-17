
import React, { useState } from 'react';
import { TimelineFilters } from './TimelineFilters';
import { TimelineItemCard } from './TimelineItemCard';
import { useTimeline } from './useTimeline';
import { TimelinePeriod, TimelineFilters as FiltersType } from './types';
import { format, parseISO, subDays, subMonths, subYears } from 'date-fns';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export const TimelineView = () => {
  const [filters, setFilters] = useState<FiltersType>({
    contentTypes: [],
    groupBy: 'month'
  });
  
  const { isLoading, timelineGroups } = useTimeline(filters);

  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };
  
  const handlePeriodChange = (period: TimelinePeriod) => {
    setFilters(prev => ({
      ...prev,
      groupBy: period
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-lg p-4">
        <TimelineFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
      </div>
      
      <div className="flex justify-center mb-4">
        <Tabs 
          defaultValue={filters.groupBy} 
          value={filters.groupBy}
          onValueChange={(value) => handlePeriodChange(value as TimelinePeriod)}
          className="w-full max-w-md"
        >
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="decade">Decade</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
              </div>
            </div>
          ))}
        </div>
      ) : timelineGroups.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No timeline items found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or add some new memories.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {timelineGroups.map((group) => (
            <div key={group.startDate} className="space-y-3">
              <h3 className="text-lg font-semibold border-b pb-2">{group.label}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((item) => (
                  <TimelineItemCard key={`${item.type}-${item.id}`} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
