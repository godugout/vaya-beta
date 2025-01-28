import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Capsule, CapsuleStatus } from "@/types/capsule";
import { cn } from "@/lib/utils";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CapsuleTableProps {
  capsules: Capsule[];
  sortField: 'date' | 'title' | 'status';
  sortDirection: 'asc' | 'desc';
  onSort: (field: 'date' | 'title' | 'status') => void;
}

export const CapsuleTable = ({ capsules, sortField, sortDirection, onSort }: CapsuleTableProps) => {
  const [bookmarkedCapsules, setBookmarkedCapsules] = useState<string[]>([]);
  const { toast } = useToast();

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

  const handleBookmark = async (capsuleId: string) => {
    try {
      if (bookmarkedCapsules.includes(capsuleId)) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('memory_id', capsuleId);

        if (error) throw error;

        setBookmarkedCapsules(prev => prev.filter(id => id !== capsuleId));
        toast({
          title: "Bookmark removed",
          description: "The capsule has been removed from your bookmarks",
        });
      } else {
        const { error } = await supabase
          .from('bookmarks')
          .insert([
            { 
              memory_id: capsuleId,
              timestamp: Math.floor(Date.now() / 1000)
            }
          ]);

        if (error) throw error;

        setBookmarkedCapsules(prev => [...prev, capsuleId]);
        toast({
          title: "Bookmark added",
          description: "The capsule has been added to your bookmarks",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your bookmark",
        variant: "destructive",
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-gray-50/50">
          <TableHead 
            className="cursor-pointer"
            onClick={() => onSort('title')}
          >
            Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead>Creator</TableHead>
          <TableHead 
            className="cursor-pointer"
            onClick={() => onSort('status')}
          >
            Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead 
            className="cursor-pointer"
            onClick={() => onSort('date')}
          >
            Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {capsules.map((capsule) => (
          <TableRow 
            key={capsule.title}
            className="hover:bg-gray-50/50"
          >
            <TableCell className="font-medium">{capsule.title}</TableCell>
            <TableCell>{capsule.metadata?.creatorInitials}</TableCell>
            <TableCell>
              {capsule.metadata?.status && (
                <span className={getStatusClass(capsule.metadata.status)}>
                  {capsule.metadata.status}
                </span>
              )}
            </TableCell>
            <TableCell>
              {new Date(capsule.metadata?.date || "").toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleBookmark(capsule.link.split('/').pop() || '')}
                  className="h-8 w-8"
                >
                  {bookmarkedCapsules.includes(capsule.link.split('/').pop() || '') ? (
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
        ))}
      </TableBody>
    </Table>
  );
};