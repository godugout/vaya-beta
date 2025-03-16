import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Users,
  Download,
  Upload
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Family } from "@/hooks/useFamilyDetail";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImportDataDialog } from "@/components/family/tree/ImportDataDialog";
import { useTreeExport } from "@/components/family/tree/hooks/useTreeExport";
import { useFileParser } from "@/components/family/tree/hooks/useFileParser";

export default function AdminFamilies() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [currentFamilyId, setCurrentFamilyId] = useState<string | null>(null);
  
  // Mock nodes and edges for export demonstration
  const mockNodes = [];
  const mockEdges = [];
  
  // Using useTreeExport hook for its utility functions
  const { handleExportToExcel } = useTreeExport({ 
    setNodes: () => {}, 
    setEdges: () => {}, 
    autoLayoutTree: () => {} 
  });
  
  // Using useFileParser hook to get the parseExcelFile function
  const { parseExcelFile } = useFileParser();

  useEffect(() => {
    async function fetchFamilies() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("families")
          .select(`
            id,
            name,
            description,
            members:family_members(
              id,
              user_id,
              role,
              profiles:profiles(
                full_name,
                avatar_url
              )
            )
          `);
        
        if (error) {
          console.error("Error fetching families:", error);
        } else {
          // Process the data to match our Family interface
          const processedData: Family[] = data.map((family: any) => ({
            id: family.id,
            name: family.name,
            description: family.description,
            members: family.members.map((member: any) => ({
              id: member.id,
              user_id: member.user_id,
              role: member.role,
              profiles: member.profiles && member.profiles.length > 0 
                ? {
                    full_name: member.profiles[0].full_name,
                    avatar_url: member.profiles[0].avatar_url
                  }
                : null
            }))
          }));
          
          setFamilies(processedData);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFamilies();
  }, []);

  const filteredFamilies = families.filter(family => 
    family.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (family.description && family.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openImportDialog = (familyId: string) => {
    setCurrentFamilyId(familyId);
    setImportDialogOpen(true);
  };

  const handleImport = (data: any) => {
    console.log("Imported data for family", currentFamilyId, data);
    // In a real implementation, you would process the data and update the family tree
  };

  const handleExport = (familyId: string) => {
    console.log("Exporting family data for", familyId);
    // In a real implementation, you would fetch the family tree data first
    handleExportToExcel(mockNodes, mockEdges);
  };

  return (
    <AdminLayout title="Family Management">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Families</CardTitle>
              <CardDescription>
                Manage all family units and their data
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Link to="/admin/families/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Family
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search families..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export All
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Bulk Import
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">Loading families...</div>
                    </TableCell>
                  </TableRow>
                ) : filteredFamilies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="text-muted-foreground">No families found</div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFamilies.map((family) => (
                    <TableRow key={family.id}>
                      <TableCell className="font-medium">{family.name}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {family.description || "No description"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          <Users className="h-3 w-3" />
                          <span>{family.members.length}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date().toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link 
                                to={`/family/${family.id}`} 
                                className="flex items-center w-full"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link 
                                to={`/admin/families/edit/${family.id}`}
                                className="flex items-center w-full"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport(family.id)}>
                              <Download className="mr-2 h-4 w-4" />
                              Export
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openImportDialog(family.id)}>
                              <Upload className="mr-2 h-4 w-4" />
                              Import Data
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <FamilyStats families={families} />

      <ImportDataDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImportData={handleImport}
      />
    </AdminLayout>
  );
}

function FamilyStats({ families }: { families: Family[] }) {
  const totalMembers = families.reduce((sum, family) => sum + family.members.length, 0);
  
  const adminCount = families.reduce((sum, family) => {
    const adminsInFamily = family.members.filter(member => member.role === 'admin').length;
    return sum + adminsInFamily;
  }, 0);
  
  const statsItems = [
    { label: "Total Families", value: families.length },
    { label: "Total Members", value: totalMembers },
    { label: "Administrators", value: adminCount },
    { label: "Average Members", value: families.length ? (totalMembers / families.length).toFixed(1) : "0" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {statsItems.map((item, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
