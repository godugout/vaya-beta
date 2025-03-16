
import React from 'react';
import { BookOpen, Calendar, Plus, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TimelineEvent {
  id: string;
  title: string;
  date: string; 
  description: string;
  type: "milestone" | "birthday" | "anniversary" | "other";
}

interface FamilyTimelineViewProps {
  familyId: string;
}

export const FamilyTimelineView = ({ familyId }: FamilyTimelineViewProps) => {
  // Example timeline events
  const events: TimelineEvent[] = [
    {
      id: "1",
      title: "Family Reunion",
      date: "June 15, 2024",
      description: "Annual family gathering at Lake Michigan",
      type: "milestone"
    },
    {
      id: "2",
      title: "Maria's Birthday",
      date: "March 22, 2024",
      description: "Celebration dinner at home",
      type: "birthday"
    },
    {
      id: "3",
      title: "Parents' Anniversary",
      date: "September 8, 2024",
      description: "40 years of marriage",
      type: "anniversary"
    }
  ];

  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "milestone":
        return <div className="h-3 w-3 bg-blue-500 rounded-full" />;
      case "birthday":
        return <div className="h-3 w-3 bg-green-500 rounded-full" />;
      case "anniversary":
        return <div className="h-3 w-3 bg-purple-500 rounded-full" />;
      default:
        return <div className="h-3 w-3 bg-gray-500 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-500" />
            Family Timeline
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {events.length > 0 ? (
            <div className="relative pl-6 border-l border-gray-200 dark:border-gray-700 space-y-6">
              {events.map((event) => (
                <div key={event.id} className="relative -ml-[7px]">
                  <div className="absolute left-0 top-1.5 -translate-x-1/2">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="pl-6">
                    <h4 className="text-sm font-semibold">{event.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{event.date}</p>
                    <p className="text-sm mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Start Your Family Timeline</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Chronicle your family's journey through time with important dates and milestones.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Timeline Event
              </Button>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-wrap gap-3 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-blue-500 rounded-full" />
          <span className="text-xs">Milestone</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-green-500 rounded-full" />
          <span className="text-xs">Birthday</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-purple-500 rounded-full" />
          <span className="text-xs">Anniversary</span>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Family ID: {familyId}
      </div>
    </div>
  );
};
