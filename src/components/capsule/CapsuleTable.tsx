import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Capsule, CapsuleStatus } from "@/types/capsule";
import { cn } from "@/lib/utils";
import { Bookmark, BookmarkCheck, MessageSquare, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateCapsuleForm from "./CreateCapsuleForm";

interface CapsuleTableProps {
  capsules: Capsule[];
  sortField: 'date' | 'title' | 'status';
  sortDirection: 'asc' | 'desc';
  onSort: (field: 'date' | 'title' | 'status') => void;
}

export const CapsuleTable = ({ capsules, sortField, sortDirection, onSort }: CapsuleTableProps) => {
  const [bookmarkedCapsules, setBookmarkedCapsules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const { data: bookmarks, error } = await supabase
          .from('bookmarks')
          .select('memory_id')
          .eq('created_by', (await supabase.auth.getUser()).data.user?.id);

        if (error) throw error;

        setBookmarkedCapsules(bookmarks.map(b => b.memory_id));
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        toast({
          title: "Error loading bookmarks",
          description: "There was an error loading your bookmarks",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, [toast]);

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
    // Skip if the capsuleId isn't a valid UUID
    if (!capsuleId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      toast({
        title: "Invalid capsule ID",
        description: "This capsule cannot be bookmarked in demo mode",
        variant: "destructive",
      });
      return;
    }

    try {
      if (bookmarkedCapsules.includes(capsuleId)) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('memory_id', capsuleId)
          .eq('created_by', (await supabase.auth.getUser()).data.user?.id);

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
              created_by: (await supabase.auth.getUser()).data.user?.id,
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
      console.error('Error updating bookmark:', error);
      toast({
        title: "Error",
        description: "There was an error updating your bookmark",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50/50">
            <TableHead 
              className="cursor-pointer font-semibold text-lg px-6"
              onClick={() => onSort('title')}
            >
              Capsules {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="px-6">Creator</TableHead>
            <TableHead 
              className="cursor-pointer px-6"
              onClick={() => onSort('status')}
            >
              Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead 
              className="cursor-pointer px-6"
              onClick={() => onSort('date')}
            >
              Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="text-right px-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {capsules.map((capsule) => (
            <TableRow 
              key={capsule.title}
              className="hover:bg-gray-50/50"
            >
              <TableCell className="font-medium px-6">{capsule.title}</TableCell>
              <TableCell className="px-6">{capsule.metadata?.creatorInitials}</TableCell>
              <TableCell className="px-6">
                {capsule.metadata?.status && (
                  <span className={getStatusClass(capsule.metadata.status)}>
                    {capsule.metadata.status}
                  </span>
                )}
              </TableCell>
              <TableCell className="px-6">
                {new Date(capsule.metadata?.date || "").toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right px-6">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleBookmark(capsule.link.split('/').pop() || '')}
                    className={cn(
                      "h-8 w-8",
                      isLoading && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isLoading}
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="px-6">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 text-base text-gray-600">
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-medium">Share memories with your family by creating a new time capsule</span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-vaya-capsules hover:bg-vaya-capsules/90 text-base">
                      <Plus className="h-5 w-5 mr-2" />
                      Create Capsule
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <CreateCapsuleForm />
                  </DialogContent>
                </Dialog>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};