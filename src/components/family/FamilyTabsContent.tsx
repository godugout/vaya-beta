
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Key, BookOpen, Image } from "lucide-react";
import { FamilySecretManager } from "@/components/family/FamilySecretManager";
import { FamilyMembersTab } from "@/components/family/FamilyMembersTab";
import { PlaceholderTab } from "@/components/family/PlaceholderTab";
import { useState } from "react";
import { Family } from "@/hooks/useFamilyDetail";

interface FamilyTabsContentProps {
  family: Family;
  isAdmin: boolean;
}

export function FamilyTabsContent({ family, isAdmin }: FamilyTabsContentProps) {
  const [activeTab, setActiveTab] = useState("members");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
        <TabsTrigger value="members" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Members</span>
        </TabsTrigger>
        {isAdmin && (
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">Access</span>
          </TabsTrigger>
        )}
        <TabsTrigger value="stories" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Stories</span>
        </TabsTrigger>
        <TabsTrigger value="photos" className="flex items-center gap-2">
          <Image className="h-4 w-4" />
          <span className="hidden sm:inline">Photos</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="members">
        <FamilyMembersTab 
          members={family.members} 
          familyId={family.id}
          isAdmin={isAdmin}
        />
      </TabsContent>
      
      {isAdmin && (
        <TabsContent value="access">
          <FamilySecretManager familyId={family.id} />
        </TabsContent>
      )}
      
      <TabsContent value="stories">
        <PlaceholderTab 
          title="Family Stories" 
          description="Share and preserve your family's most cherished memories and stories."
          comingSoon={false}
        />
      </TabsContent>
      
      <TabsContent value="photos">
        <PlaceholderTab 
          title="Family Photos" 
          description="Create and share family photo albums that will be treasured for generations."
          comingSoon={false}
        />
      </TabsContent>
    </Tabs>
  );
}
