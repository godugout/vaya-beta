
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Users, 
  Shield, 
  UserCog, 
  KeyRound, 
  Lock, 
  Plus,
  RefreshCw,
  Eye,
  PenSquare,
  Trash,
  HelpCircle
} from "lucide-react";

// Mock data for roles and permissions
const roles = [
  { id: 1, name: "Administrator", description: "Full system access", users: 5, system: true },
  { id: 2, name: "Family Admin", description: "Manage family and members", users: 12, system: true },
  { id: 3, name: "Content Manager", description: "Manage media and stories", users: 8, system: false },
  { id: 4, name: "Member", description: "Access to families they belong to", users: 45, system: true },
  { id: 5, name: "Guest", description: "Limited read-only access", users: 20, system: true },
  { id: 6, name: "Media Editor", description: "Upload and edit media", users: 7, system: false },
];

const permissions = [
  { id: 1, name: "View Families", description: "View family listings", roles: ["Administrator", "Family Admin", "Member", "Guest"] },
  { id: 2, name: "Manage Families", description: "Create, edit, and delete families", roles: ["Administrator", "Family Admin"] },
  { id: 3, name: "Invite Members", description: "Invite new members to families", roles: ["Administrator", "Family Admin"] },
  { id: 4, name: "Upload Media", description: "Upload photos and videos", roles: ["Administrator", "Family Admin", "Content Manager", "Media Editor"] },
  { id: 5, name: "Manage Media", description: "Edit and delete media", roles: ["Administrator", "Family Admin", "Content Manager"] },
  { id: 6, name: "Record Stories", description: "Create audio recordings", roles: ["Administrator", "Family Admin", "Content Manager", "Member"] },
  { id: 7, name: "Edit User Profiles", description: "Edit user profile information", roles: ["Administrator"] },
  { id: 8, name: "Manage System Settings", description: "Configure system-wide settings", roles: ["Administrator"] },
  { id: 9, name: "Export Data", description: "Export family data", roles: ["Administrator", "Family Admin"] },
  { id: 10, name: "Access API", description: "Use the system API", roles: ["Administrator"] },
];

const permissionMatrix = [
  { role: "Administrator", permissions: ["view", "create", "edit", "delete", "admin"] },
  { role: "Family Admin", permissions: ["view", "create", "edit", "delete"] },
  { role: "Content Manager", permissions: ["view", "create", "edit"] },
  { role: "Member", permissions: ["view", "create"] },
  { role: "Guest", permissions: ["view"] },
  { role: "Media Editor", permissions: ["view", "create", "edit"] },
];

const resources = [
  { name: "Families", description: "Family units" },
  { name: "Members", description: "Family members" },
  { name: "Media", description: "Photos, videos, and documents" },
  { name: "Stories", description: "Recorded stories" },
  { name: "Tree", description: "Family tree data" },
  { name: "Settings", description: "System configuration" },
];

export default function AdminPermissions() {
  const [roleSearch, setRoleSearch] = useState("");
  const [permissionSearch, setPermissionSearch] = useState("");
  
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(roleSearch.toLowerCase()) ||
    role.description.toLowerCase().includes(roleSearch.toLowerCase())
  );
  
  const filteredPermissions = permissions.filter(permission => 
    permission.name.toLowerCase().includes(permissionSearch.toLowerCase()) ||
    permission.description.toLowerCase().includes(permissionSearch.toLowerCase())
  );

  return (
    <AdminLayout title="Permissions Management">
      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span>Roles</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            <span>Permissions</span>
          </TabsTrigger>
          <TabsTrigger value="matrix" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Matrix</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle>User Roles</CardTitle>
                  <CardDescription>
                    Define roles for users in the system
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Role
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search roles..."
                    className="pl-8"
                    value={roleSearch}
                    onChange={(e) => setRoleSearch(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>System</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          No roles found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRoles.map((role) => (
                        <TableRow key={role.id}>
                          <TableCell className="font-medium">{role.name}</TableCell>
                          <TableCell>{role.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="flex items-center gap-1 w-fit">
                              <Users className="h-3 w-3" />
                              <span>{role.users}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {role.system ? (
                              <Badge>System</Badge>
                            ) : (
                              <Badge variant="outline">Custom</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={role.system}>
                                <PenSquare className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={role.system}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle>System Permissions</CardTitle>
                  <CardDescription>
                    Manage permissions that can be assigned to roles
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Permission
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search permissions..."
                    className="pl-8"
                    value={permissionSearch}
                    onChange={(e) => setPermissionSearch(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Permission</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPermissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6">
                          No permissions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPermissions.map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell className="font-medium">{permission.name}</TableCell>
                          <TableCell>{permission.description}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {permission.roles.slice(0, 2).map((role, index) => (
                                <Badge key={index} variant="outline">
                                  {role}
                                </Badge>
                              ))}
                              {permission.roles.length > 2 && (
                                <Badge variant="outline">
                                  +{permission.roles.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <PenSquare className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="matrix">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle>Permission Matrix</CardTitle>
                  <CardDescription>
                    Configure which roles have access to which resources
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset Defaults
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[140px]">Resource</TableHead>
                      {permissionMatrix.map(role => (
                        <TableHead key={role.role} className="text-center min-w-[100px]">
                          {role.role}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.map((resource) => (
                      <TableRow key={resource.name}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{resource.name}</div>
                            <div className="text-xs text-muted-foreground">{resource.description}</div>
                          </div>
                        </TableCell>
                        
                        {permissionMatrix.map(role => (
                          <TableCell key={`${resource.name}-${role.role}`} className="text-center">
                            <div className="flex flex-col items-center space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground mr-1">View</span>
                                <Switch
                                  checked={role.permissions.includes("view")}
                                  disabled={!role.permissions.includes("view")}
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground mr-1">Create</span>
                                <Switch
                                  checked={role.permissions.includes("create")}
                                  disabled={!role.permissions.includes("create")}
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground mr-1">Edit</span>
                                <Switch
                                  checked={role.permissions.includes("edit")}
                                  disabled={!role.permissions.includes("edit")}
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground mr-1">Delete</span>
                                <Switch
                                  checked={role.permissions.includes("delete")}
                                  disabled={!role.permissions.includes("delete")}
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground mr-1">Admin</span>
                                <Switch
                                  checked={role.permissions.includes("admin")}
                                  disabled={!role.permissions.includes("admin")}
                                />
                              </div>
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <HelpCircle className="h-4 w-4 mr-1" />
                <span>Changes to the permission matrix are saved automatically</span>
              </div>
              <div>
                <Button>
                  <Shield className="mr-2 h-4 w-4" />
                  Save All Changes
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
