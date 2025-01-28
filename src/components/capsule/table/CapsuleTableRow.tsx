import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Lock, Plus, Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Capsule, CapsuleStatus } from "@/types/capsule";

interface CapsuleTableRowProps {
  capsule: Capsule;
  isBookmarked: boolean;
  isLoading: boolean;
  onBookmark: (capsuleId: string) => void;
}

export const CapsuleTableRow = ({ 
  capsule, 
  isBookmarked, 
  isLoading, 
  onBookmark 
}: CapsuleTableRowProps) => {
  const getStatusClass = (status: CapsuleStatus) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    const statusClasses = {
      upcoming: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      locked: "bg-yellow-100 text-yellow-800",
      revealed: "bg-purple-100 text-purple-800"
    };
    return cn(baseClasses, statusClasses[status]);
  };

  const isAccessible = capsule.metadata?.status === 'active' || capsule.metadata?.status === 'upcoming';

  return (
    <TableRow className="hover:bg-gray-50/50">
      <TableCell className="text-left text-lg font-bold pl-6 pr-4">{capsule.title}</TableCell>
      <TableCell className="text-left px-4">{capsule.description}</TableCell>
      <TableCell className="text-center px-4">{capsule.metadata?.creatorInitials}</TableCell>
      <TableCell className="text-center px-4">
        {capsule.metadata?.status && (
          <span className={getStatusClass(capsule.metadata.status)}>
            {capsule.metadata.status}
          </span>
        )}
      </TableCell>
      <TableCell className="text-center px-4">
        {new Date(capsule.metadata?.date || "").toLocaleDateString()}
      </TableCell>
      <TableCell className="text-right pl-4 pr-6">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmark(capsule.link.split('/').pop() || '')}
            className={cn(
              "h-8 w-8",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            disabled={isLoading}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            asChild
            disabled={!isAccessible}
          >
            <Link to={`/capsule/${capsule.link.split('/').pop()}${isAccessible ? '/add' : ''}`}>
              {isAccessible ? (
                <Plus className="h-4 w-4" />
              ) : (
                <div className="w-4" /> // Placeholder for alignment
              )}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              !isAccessible && "text-gray-400"
            )}
            asChild
          >
            <Link to={capsule.link}>
              {isAccessible ? (
                <Eye className="h-4 w-4" />
              ) : (
                <Lock className="h-4 w-4 text-red-400" />
              )}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};