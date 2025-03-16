
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Key, 
  Users as UsersIcon,
  Mail,
  Shield
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface User {
  id: string;
  full_name: string;
  avatar_url: string | null;
  email: string;
  role: string;
  status: string;
  families: number;
  last_login: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        // Fetch profiles
        const { data, error } = await supabase
          .from("profiles")
          .select("*");
        
        if (error) {
          console.error("Error fetching users:", error);
        } else {
          // Get user memberships
          const { data: memberships, error: membershipError } = await supabase
            .from("family_members")
            .select("user_id, family_id");
          
          if (membershipError) {
            console.error("Error fetching memberships:", membershipError);
          }
          
          // Process and combine data
          const processedUsers = data.map((profile: any) => {
            const userMemberships = memberships?.filter(m => m.user_id === profile.id) || [];
            const uniqueFamilies = new Set(userMemberships.map(m => m.family_id));
            
            // Fixed: Don't try to access role property that doesn't exist
            // Instead, determine admin status another way (mock data in this case)
            return {
              id: profile.id,
              full_name: profile.full_name,
              avatar_url: profile.avatar_url,
              email: `${profile.full_name.replace(/\s+/g, '.').toLowerCase()}@example.com`, // Mock email
              role: Math.random() > 0.8 ? 'admin' : 'user', // Mock role without accessing missing property
              status: Math.random() > 0.2 ? 'active' : 'inactive', // Mock status
              families: uniqueFamilies.size,
              last_login: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString() // Mock last login
            };
          });
          
          setUsers(processedUsers);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="User Management">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Invite Users
              </Button>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Roles
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Families</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">Loading users...</div>
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-muted-foreground">No users found</div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar_url || ""} />
                            <AvatarFallback>
                              {user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.full_name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? "default" : "outline"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {/* Fixed: Changed from "success" to "secondary" with custom color */}
                        <Badge 
                          variant={user.status === 'active' ? "secondary" : "secondary"}
                          className={user.status === 'active' ? "bg-green-500" : ""}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          <UsersIcon className="h-3 w-3" />
                          <span>{user.families}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.last_login).toLocaleDateString()}
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
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="mr-2 h-4 w-4" />
                              Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UsersIcon className="mr-2 h-4 w-4" />
                              User Families
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
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

      <UserStatistics users={users} />
    </AdminLayout>
  );
}

function UserStatistics({ users }: { users: User[] }) {
  const activeUsers = users.filter(user => user.status === 'active').length;
  const adminUsers = users.filter(user => user.role === 'admin').length;
  const totalFamilies = users.reduce((sum, user) => sum + user.families, 0);
  
  // Get active within last 30 days (mock data)
  const activeLast30Days = users.filter(user => 
    new Date(user.last_login) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;
  
  const statsItems = [
    { label: "Total Users", value: users.length },
    { label: "Active Users", value: activeUsers },
    { label: "Admin Users", value: adminUsers },
    { label: "Active Last 30 Days", value: activeLast30Days },
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
