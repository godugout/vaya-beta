import { Table, TableBody } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Capsule } from "@/types/capsule";
import { CapsuleTableHeader } from "./table/CapsuleTableHeader";
import { CapsuleTableRow } from "./table/CapsuleTableRow";
import { CapsuleTableFooter } from "./table/CapsuleTableFooter";

interface CapsuleTableProps {
  capsules: Capsule[];
  sortField: 'date' | 'title' | 'status';
  sortDirection: 'asc' | 'desc';
  onSort: (field: 'date' | 'title' | 'status') => void;
}

export const CapsuleTable = ({ 
  capsules, 
  sortField, 
  sortDirection, 
  onSort 
}: CapsuleTableProps) => {
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

  const handleBookmark = async (capsuleId: string) => {
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
          .insert([{ 
            memory_id: capsuleId,
            created_by: (await supabase.auth.getUser()).data.user?.id,
            timestamp: Math.floor(Date.now() / 1000)
          }]);

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
        <CapsuleTableHeader 
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <TableBody>
          {capsules.map((capsule) => (
            <CapsuleTableRow
              key={capsule.title}
              capsule={capsule}
              isBookmarked={bookmarkedCapsules.includes(capsule.link.split('/').pop() || '')}
              isLoading={isLoading}
              onBookmark={handleBookmark}
            />
          ))}
        </TableBody>
        <CapsuleTableFooter />
      </Table>
    </div>
  );
};