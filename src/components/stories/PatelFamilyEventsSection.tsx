
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { SearchInput } from '@/components/input/SearchInput';
import { FadeIn } from '@/components/animation/FadeIn';

export const PatelFamilyEventsSection = () => {
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
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-2">🎓</span>
                    <span className="font-medium">Riya's Graduation</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Celebrating Riya's medical school graduation
                </td>
                <td className="px-6 py-4 whitespace-nowrap">AP</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">upcoming</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">5/14/2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-2">💍</span>
                    <span className="font-medium">Amit & Priya's Wedding</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Family wedding celebration memories
                </td>
                <td className="px-6 py-4 whitespace-nowrap">MP</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">locked</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">12/11/2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </FadeIn>
  );
};

export default PatelFamilyEventsSection;
