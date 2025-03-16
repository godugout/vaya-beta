
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { CapsuleStatus } from '@/types/capsule';

export interface FamilyEvent {
  icon: string;
  name: string;
  description: string;
  owner: string;
  status: CapsuleStatus;
  date: string;
}

interface FamilyEventRowProps {
  event: FamilyEvent;
  onViewEvent?: (event: FamilyEvent) => void;
}

export const FamilyEventRow: React.FC<FamilyEventRowProps> = ({ 
  event,
  onViewEvent 
}) => {
  const getBadgeClass = (status: CapsuleStatus) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'locked':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'revealed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleClick = () => {
    if (onViewEvent) {
      onViewEvent(event);
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className="mr-2">{event.icon}</span>
          <span className="font-medium">{event.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {event.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{event.owner}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge className={getBadgeClass(event.status)}>{event.status}</Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{event.date}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <Button variant="ghost" size="sm" className="text-gray-500" onClick={handleClick}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
};

export default FamilyEventRow;
