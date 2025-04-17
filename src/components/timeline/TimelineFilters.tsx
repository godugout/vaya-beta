
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Search, Filter, X } from 'lucide-react';
import { TimelineFilters as FiltersType } from './types';

interface TimelineFiltersProps {
  filters: FiltersType;
  onFilterChange: (filters: FiltersType) => void;
}

export const TimelineFilters = ({ filters, onFilterChange }: TimelineFiltersProps) => {
  const contentTypes = [
    { id: 'story', label: 'Stories' },
    { id: 'memory', label: 'Memories' },
    { id: 'photo', label: 'Photos' },
    { id: 'audio', label: 'Audio' },
    { id: 'capsule', label: 'Capsules' },
  ];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchQuery: e.target.value
    });
  };
  
  const handleContentTypeChange = (type: string, checked: boolean) => {
    const currentTypes = filters.contentTypes || [];
    const newTypes = checked 
      ? [...currentTypes, type]
      : currentTypes.filter(t => t !== type);
    
    onFilterChange({
      ...filters,
      contentTypes: newTypes
    });
  };
  
  const handleStartDateChange = (date: Date | undefined) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        start: date ? date.toISOString() : undefined
      }
    });
  };
  
  const handleEndDateChange = (date: Date | undefined) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        end: date ? date.toISOString() : undefined
      }
    });
  };
  
  const handleClearFilters = () => {
    onFilterChange({
      contentTypes: [],
      searchQuery: '',
      dateRange: {},
      groupBy: filters.groupBy
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for memories, stories, etc."
          className="pl-9"
          value={filters.searchQuery || ''}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label className="mb-2 block">Content Types</Label>
          <div className="space-y-2">
            {contentTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type.id}`}
                  checked={filters.contentTypes?.includes(type.id) || false}
                  onCheckedChange={(checked) => 
                    handleContentTypeChange(type.id, checked === true)
                  }
                />
                <Label htmlFor={`type-${type.id}`} className="text-sm font-normal">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Start Date</Label>
            <DatePicker
              date={filters.dateRange?.start ? new Date(filters.dateRange.start) : undefined}
              setDate={handleStartDateChange}
              className="w-full"
            />
          </div>
          
          <div>
            <Label className="mb-2 block">End Date</Label>
            <DatePicker
              date={filters.dateRange?.end ? new Date(filters.dateRange.end) : undefined}
              setDate={handleEndDateChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
          className="flex items-center gap-1"
        >
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
        
        <Button
          size="sm"
          className="flex items-center gap-1"
        >
          <Filter className="h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
