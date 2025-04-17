
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FilterPanelProps {
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  activeFilters: string[];
  toggleFilter: (filter: string) => void;
}

export const FilterPanel = ({ 
  filterOpen, 
  setFilterOpen, 
  activeFilters, 
  toggleFilter 
}: FilterPanelProps) => {
  return (
    <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="flex items-center justify-center gap-2 w-full">
          <Filter className="w-4 h-4" />
          Filters
          {activeFilters.length > 0 && (
            <Badge variant="destructive" className="ml-2">{activeFilters.length}</Badge>
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 mt-2 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold mb-2">Filter By</h3>
          <div className="space-y-2">
            <Button 
              size="sm" 
              variant={activeFilters.includes('stories') ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => toggleFilter('stories')}
            >
              Has Stories
            </Button>
            <Button 
              size="sm" 
              variant={activeFilters.includes('direct') ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => toggleFilter('direct')}
            >
              Direct Family
            </Button>
            <Button 
              size="sm" 
              variant={activeFilters.includes('recent') ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => toggleFilter('recent')}
            >
              Recently Added
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
