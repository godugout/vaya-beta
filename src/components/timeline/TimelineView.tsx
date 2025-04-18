
import { useState } from 'react';
import { TimelineFilters } from './TimelineFilters';
import { TimelineItemCard } from './TimelineItemCard';
import { useTimeline } from './useTimeline';
import { TimelinePeriod, TimelineFilters as FiltersType } from './types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModernCard } from '@/components/ui/modern-card';
import { PatternBackground } from '@/components/ui/pattern-background';

export const TimelineView = () => {
  const [filters, setFilters] = useState<FiltersType>({
    contentTypes: [],
    groupBy: 'month'
  });
  
  const timeline = useTimeline(filters);
  const { isLoading, items } = timeline;
  const timelineGroups = timeline.groupItemsByPeriod(items, filters.groupBy);
  
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
      <ModernCard variant="modern" withPattern className="overflow-visible">
        <TimelineFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
      </ModernCard>
      
      <div className="flex justify-center mb-4">
        <Tabs 
          defaultValue={filters.groupBy} 
          value={filters.groupBy}
          onValueChange={(value) => handlePeriodChange(value as TimelinePeriod)}
          className="w-full max-w-md bg-background/80 backdrop-blur-sm rounded-full p-1 border"
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
      
      <div className="space-y-16">
        {timelineGroups.map((group) => (
          <section key={group.startDate} className="relative">
            <div className="sticky top-20 z-10 mb-8 flex items-center gap-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-autumn to-leaf bg-clip-text text-transparent">
                {group.label}
              </h3>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-autumn/20 to-leaf/20 rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item) => (
                <TimelineItemCard key={`${item.type}-${item.id}`} item={item} />
              ))}
            </div>
          </section>
        ))}
        
        {timelineGroups.length === 0 && !isLoading && (
          <ModernCard variant="modern" className="p-12 text-center">
            <PatternBackground pattern="family-languages" opacity="light" />
            <h3 className="text-xl font-semibold mb-2">No memories yet</h3>
            <p className="text-muted-foreground">
              Start capturing your family's precious moments to build your timeline
            </p>
          </ModernCard>
        )}
      </div>
    </div>
  );
};
