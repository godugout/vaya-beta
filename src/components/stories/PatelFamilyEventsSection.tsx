
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { SearchInput } from '@/components/input/SearchInput';
import { FadeIn } from '@/components/animation/FadeIn';
import FamilyEventRow, { FamilyEvent } from './FamilyEventRow';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow
} from '@/components/ui/table';

const sampleEvents: FamilyEvent[] = [
  {
    icon: '🎓',
    name: 'Riya\'s Graduation',
    description: 'Celebrating Riya\'s medical school graduation',
    owner: 'AP',
    status: 'upcoming',
    date: '5/14/2025'
  },
  {
    icon: '💍',
    name: 'Amit & Priya\'s Wedding',
    description: 'Family wedding celebration memories',
    owner: 'MP',
    status: 'locked',
    date: '12/11/2024'
  }
];

export const PatelFamilyEventsSection = () => {
  const handleViewEvent = (event: FamilyEvent) => {
    console.log('View event:', event);
    // Implementation for viewing the event details
  };

  return (
    <FadeIn className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Family Events & Celebrations</h2>
      
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        <SearchInput 
          placeholder="Search capsules..." 
          className="max-w-xs"
        />
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="border-gray-300 dark:border-gray-600">
            Upcoming
          </Button>
          <Button variant="outline" className="border-gray-300 dark:border-gray-600">
            Active
          </Button>
          <Button variant="outline" className="border-gray-300 dark:border-gray-600">
            Locked
          </Button>
          <Button variant="outline" className="border-gray-300 dark:border-gray-600">
            Revealed
          </Button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleEvents.map((event, index) => (
                <FamilyEventRow 
                  key={index} 
                  event={event} 
                  onViewEvent={handleViewEvent}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </FadeIn>
  );
};

export default PatelFamilyEventsSection;
