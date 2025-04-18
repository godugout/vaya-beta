
import { useState, useCallback, useEffect } from 'react';
import { TimelineFilters } from './TimelineFilters';
import { TimelineItemCard } from './TimelineItemCard';
import { useTimeline } from './useTimeline';
import { TimelinePeriod, TimelineFilters as FiltersType } from './types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModernCard } from '@/components/ui/modern-card';
import { PatternBackground } from '@/components/ui/pattern-background';
import { AlertCircle, Users, RefreshCcw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

export const TimelineView = () => {
  const [filters, setFilters] = useState<FiltersType>({
    contentTypes: [],
    groupBy: 'month'
  });
  
  const [hasFamilies, setHasFamilies] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [familyError, setFamilyError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    const checkFamilies = async () => {
      try {
        setLoading(true);
        setFamilyError(null);
        
        const { data, error } = await supabase
          .from('families')
          .select('id')
          .limit(1);
        
        if (error) throw error;
        
        setHasFamilies(data && data.length > 0);
      } catch (error: any) {
        console.error('Error checking families:', error);
        setFamilyError(error);
        setHasFamilies(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkFamilies();
  }, [retryCount]);
  
  const timeline = useTimeline(filters);
  const { isLoading, items, error } = timeline;
  
  // Memoize the result of groupItemsByPeriod to prevent unnecessary recalculations
  const timelineGroups = timeline.groupItemsByPeriod ? 
    timeline.groupItemsByPeriod(items, filters.groupBy) : 
    [];
  
  const handleFilterChange = useCallback((newFilters: FiltersType) => {
    setFilters(newFilters);
  }, []);
  
  const handlePeriodChange = useCallback((period: TimelinePeriod) => {
    setFilters(prev => ({
      ...prev,
      groupBy: period
    }));
  }, []);

  const handleRetry = useCallback(() => {
    setRetryCount(count => count + 1);
  }, []);

  if (loading) {
    return (
      <ModernCard variant="modern" className="p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-2/3 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="flex justify-center">
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </ModernCard>
    );
  }

  if (familyError) {
    return (
      <ModernCard variant="modern" className="p-8 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Connection Error</h3>
        <p className="text-muted-foreground mb-6">
          We encountered an error connecting to the database. This might be due to network issues.
        </p>
        <Button onClick={handleRetry} variant="outline" className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Retry Connection
        </Button>
      </ModernCard>
    );
  }

  if (hasFamilies === false) {
    return (
      <ModernCard variant="modern" className="p-12 text-center">
        <PatternBackground pattern="family-languages" opacity="light" />
        <h3 className="text-xl font-semibold mb-2">No Families Found</h3>
        <p className="text-muted-foreground mb-6">
          You need to create or join a family to see your timeline
        </p>
        <Button onClick={() => window.location.href = "/families"}>
          <Users className="h-4 w-4 mr-2" />
          Go to Families
        </Button>
      </ModernCard>
    );
  }

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
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : timelineGroups.length > 0 ? (
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
        </div>
      ) : (
        <ModernCard variant="modern" className="p-12 text-center">
          <PatternBackground pattern="family-languages" opacity="light" />
          <h3 className="text-xl font-semibold mb-2">No timeline items found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or add more family memories to your timeline
          </p>
        </ModernCard>
      )}

      {/* Error handling */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            There was an error loading your timeline. Please try again later.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
