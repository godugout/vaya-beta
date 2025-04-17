
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChevronDown, Filter, Search } from "lucide-react";
import { TimelineFilters, TimelinePeriod } from "./types";
import { PopularTags } from "../tags/PopularTags";
import { format } from "date-fns";

interface TimelineFilterProps {
  filters: TimelineFilters;
  onFilterChange: (filters: TimelineFilters) => void;
}

export const TimelineFilter = ({ filters, onFilterChange }: TimelineFilterProps) => {
  const [searchValue, setSearchValue] = useState(filters.searchQuery || "");
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, searchQuery: searchValue });
  };
  
  const handleContentTypeToggle = (type: string) => {
    const currentTypes = filters.contentTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    onFilterChange({ ...filters, contentTypes: newTypes });
  };
  
  const handleGroupByChange = (value: string) => {
    onFilterChange({ ...filters, groupBy: value as TimelinePeriod });
  };
  
  const handleTagClick = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    onFilterChange({ ...filters, tags: newTags });
  };
  
  const clearFilters = () => {
    onFilterChange({
      contentTypes: ['story', 'memory', 'photo'],
      groupBy: 'month'
    });
    setSearchValue("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-1 items-center">
                <Filter className="h-4 w-4" />
                <span>Content Type</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter Content</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={(filters.contentTypes || []).includes('story')}
                onCheckedChange={() => handleContentTypeToggle('story')}
              >
                Stories
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={(filters.contentTypes || []).includes('memory')}
                onCheckedChange={() => handleContentTypeToggle('memory')}
              >
                Memories
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={(filters.contentTypes || []).includes('photo')}
                onCheckedChange={() => handleContentTypeToggle('photo')}
              >
                Photos
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={(filters.contentTypes || []).includes('audio')}
                onCheckedChange={() => handleContentTypeToggle('audio')}
              >
                Audio
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full" 
                onClick={clearFilters}
              >
                Reset Filters
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-1 items-center">
                <Calendar className="h-4 w-4" />
                <span>
                  {filters.dateRange?.start 
                    ? `${format(new Date(filters.dateRange.start), 'MMM yyyy')} - ${filters.dateRange?.end ? format(new Date(filters.dateRange.end), 'MMM yyyy') : 'Now'}`
                    : 'Date Range'}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[350px] p-4">
              <DropdownMenuLabel>Select Date Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="py-2">
                {/* Date range picker would go here in a real implementation */}
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => onFilterChange({ ...filters, dateRange: undefined })}
                  >
                    All Time
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      const now = new Date();
                      const oneYearAgo = new Date();
                      oneYearAgo.setFullYear(now.getFullYear() - 1);
                      onFilterChange({
                        ...filters,
                        dateRange: {
                          start: oneYearAgo.toISOString(),
                          end: now.toISOString()
                        }
                      });
                    }}
                  >
                    Last Year
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      const now = new Date();
                      const threeMonthsAgo = new Date();
                      threeMonthsAgo.setMonth(now.getMonth() - 3);
                      onFilterChange({
                        ...filters,
                        dateRange: {
                          start: threeMonthsAgo.toISOString(),
                          end: now.toISOString()
                        }
                      });
                    }}
                  >
                    Last 3 Months
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="w-full sm:w-auto">
          <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
            <Input
              type="search"
              placeholder="Search memories and stories..."
              className="w-full sm:w-64"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button type="submit" size="icon" className="ml-2">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Group By</h3>
          <Tabs 
            defaultValue={filters.groupBy || "month"} 
            onValueChange={handleGroupByChange}
            className="w-auto"
          >
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
              <TabsTrigger value="decade">Decade</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div>
        <PopularTags onTagClick={handleTagClick} limit={6} />
      </div>
    </div>
  );
};
