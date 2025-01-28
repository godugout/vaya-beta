import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Capsule, CapsuleStatus } from "@/types/capsule";
import { cn } from "@/lib/utils";

interface CapsuleTableProps {
  capsules: Capsule[];
  sortField: 'date' | 'title' | 'status';
  sortDirection: 'asc' | 'desc';
  onSort: (field: 'date' | 'title' | 'status') => void;
}

export const CapsuleTable = ({ capsules, sortField, sortDirection, onSort }: CapsuleTableProps) => {
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
              <Link to={capsule.link}>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};