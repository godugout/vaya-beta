
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FamilyTreeMain } from '@/components/family/FamilyTreeMain';
import { FamilyTimelineView } from '@/components/family/FamilyTimelineView';
import { EditFamilyDialog, Family } from '@/components/family/EditFamilyDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, CameraIcon, Home, Settings, Users } from 'lucide-react';

const FamilyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Mock family data - would normally come from an API or database query
  const familyData: Family = {
    id: id || '1',
    name: 'Patel Family',
    description: 'A loving family with strong traditions and values.',
    members: 12,
    createdAt: '2023-01-15',
    logoUrl: '/placeholder.svg'
  };

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-autumn/10 dark:bg-leaf/10 flex items-center justify-center overflow-hidden border-2 border-autumn dark:border-leaf">
            {familyData.logoUrl ? (
              <img src={familyData.logoUrl} alt={`${familyData.name} logo`} className="h-full w-full object-cover" />
            ) : (
              <Home className="h-8 w-8 text-autumn dark:text-leaf" />
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{familyData.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">{familyData.description}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              <Users className="h-4 w-4 mr-1" />
              <span>{typeof familyData.members === 'number' ? familyData.members : familyData.members?.length || 0} members</span>
              <span className="mx-2">•</span>
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>Created {new Date(familyData.createdAt || '').toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline" 
            className="border-autumn text-autumn hover:bg-autumn/10 dark:border-leaf dark:text-leaf dark:hover:bg-leaf/10"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Settings className="h-4 w-4 mr-2" /> Edit Family
          </Button>
          <Button
            className="bg-autumn text-white hover:bg-autumn/90 dark:bg-leaf dark:text-black dark:hover:bg-leaf/90"
          >
            <CameraIcon className="h-4 w-4 mr-2" /> Add Photos
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="tree" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="tree">Family Tree</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tree">
          <Card>
            <CardHeader>
              <CardTitle>Family Tree</CardTitle>
              <CardDescription>
                View and edit your family's genealogical tree
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FamilyTreeMain familyId={id || ''} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Family Timeline</CardTitle>
              <CardDescription>
                Important events and milestones in your family's history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FamilyTimelineView familyId={id || ''} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Family Members</CardTitle>
              <CardDescription>
                All members of your family
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Family member cards would go here */}
                <div className="rounded-lg border p-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Raj Patel</h3>
                    <p className="text-sm text-gray-500">Father</p>
                  </div>
                </div>
                <div className="rounded-lg border p-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Priya Patel</h3>
                    <p className="text-sm text-gray-500">Mother</p>
                  </div>
                </div>
                <div className="rounded-lg border p-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Aanya Patel</h3>
                    <p className="text-sm text-gray-500">Daughter</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stories">
          <Card>
            <CardHeader>
              <CardTitle>Family Stories</CardTitle>
              <CardDescription>
                Stories and memories shared by your family
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Story cards would go here */}
                <div className="rounded-lg border p-4 space-y-3">
                  <h3 className="font-medium">Summer Vacation 2022</h3>
                  <p className="text-sm text-gray-500">Our amazing trip to the mountains where we hiked, camped, and made wonderful memories.</p>
                  <div className="text-xs text-gray-400">Shared by Raj Patel • 5 months ago</div>
                </div>
                <div className="rounded-lg border p-4 space-y-3">
                  <h3 className="font-medium">Grandpa's Recipes</h3>
                  <p className="text-sm text-gray-500">Collection of traditional family recipes passed down from Grandpa Patel.</p>
                  <div className="text-xs text-gray-400">Shared by Priya Patel • 2 months ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Edit Family Dialog */}
      <EditFamilyDialog 
        family={familyData}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
};

export default FamilyDetail;
