import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
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

  return (
    <TableRow className="hover:bg-gray-50/50">
      <TableCell className="text-left text-lg font-bold px-6">{capsule.title}</TableCell>
      <TableCell className="text-left px-6">{capsule.description}</TableCell>
      <TableCell className="text-center px-6">{capsule.metadata?.creatorInitials}</TableCell>
      <TableCell className="text-center px-6">
        {capsule.metadata?.status && (
          <span className={getStatusClass(capsule.metadata.status)}>
            {capsule.metadata.status}
          </span>
        )}
      </TableCell>
      <TableCell className="text-center px-6">
        {new Date(capsule.metadata?.date || "").toLocaleDateString()}
      </TableCell>
      <TableCell className="text-right px-6">
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
          <Link to={capsule.link}>
            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
};