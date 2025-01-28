import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CapsuleTableHeaderProps {
  sortField: 'date' | 'title' | 'status';
  sortDirection: 'asc' | 'desc';
  onSort: (field: 'date' | 'title' | 'status') => void;
}

export const CapsuleTableHeader = ({ sortField, sortDirection, onSort }: CapsuleTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="hover:bg-gray-50/50">
        <TableHead 
          className="cursor-pointer text-center px-6"
          onClick={() => onSort('title')}
        >
          Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
        </TableHead>
        <TableHead className="text-center px-6">Note</TableHead>
        <TableHead className="text-center px-6">Creator</TableHead>
        <TableHead 
          className="cursor-pointer text-center px-6"
          onClick={() => onSort('status')}
        >
          Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
        </TableHead>
        <TableHead 
          className="cursor-pointer text-center px-6"
          onClick={() => onSort('date')}
        >
          Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
        </TableHead>
        <TableHead className="text-center px-6">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};