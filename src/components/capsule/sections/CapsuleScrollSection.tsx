import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import CreateCapsuleForm from "@/components/capsule/CreateCapsuleForm";
import { CapsuleTable } from "@/components/capsule/CapsuleTable";
import { CapsuleFilters } from "@/components/capsule/CapsuleFilters";
import { CapsulePills } from "@/components/capsule/sections/CapsulePills";
import { Capsule, CapsuleStatus } from "@/types/capsule";

interface CapsuleScrollSectionProps {
  capsules: Capsule[];
}

export const CapsuleScrollSection = ({ capsules }: CapsuleScrollSectionProps) => {
  const [sortField, setSortField] = useState<'date' | 'title' | 'status'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<CapsuleStatus[]>([]);

  const handleSort = (field: 'date' | 'title' | 'status') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAndFilteredCapsules = [...capsules]
    .filter(capsule => 
      statusFilter.length === 0 || 
      (capsule.metadata?.status && statusFilter.includes(capsule.metadata.status))
    )
    .sort((a, b) => {
      if (sortField === 'date') {
        const dateA = new Date(a.metadata?.date || '').getTime();
        const dateB = new Date(b.metadata?.date || '').getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      if (sortField === 'title') {
        return sortDirection === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sortField === 'status') {
        return sortDirection === 'asc'
          ? (a.metadata?.status || '').localeCompare(b.metadata?.status || '')
          : (b.metadata?.status || '').localeCompare(a.metadata?.status || '');
      }
      return 0;
    });

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Your Family Capsules</h3>
                <div className="flex items-center gap-4">
                  <CapsuleFilters 
                    statusFilter={statusFilter}
                    onFilterChange={setStatusFilter}
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-vaya-capsules hover:bg-vaya-capsules/90 text-white">
                        Create a Capsule <Camera className="ml-2 h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <CreateCapsuleForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            
            <CapsuleTable 
              capsules={sortedAndFilteredCapsules}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          </div>
        </div>
      </div>
      
      <CapsulePills />
    </>
  );
};