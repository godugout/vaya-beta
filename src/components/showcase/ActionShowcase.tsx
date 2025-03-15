
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VayaButton } from "@/components/actions/Button";
import { IconButton } from "@/components/actions/IconButton";
import { ActionMenu } from "@/components/actions/ActionMenu";
import { FloatingActionButton } from "@/components/actions/FloatingActionButton";
import { 
  Play, 
  Plus, 
  Heart, 
  Share, 
  Send, 
  Mic, 
  Bell, 
  Settings, 
  Edit, 
  Trash, 
  Download, 
  Archive,
  Copy
} from "lucide-react";

export const ActionShowcase = () => {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-6">Buttons</h2>
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <VayaButton variant="primary">Primary</VayaButton>
              <VayaButton variant="secondary">Secondary</VayaButton>
              <VayaButton variant="tertiary">Tertiary</VayaButton>
              <VayaButton variant="outline">Outline</VayaButton>
              <VayaButton variant="ghost">Ghost</VayaButton>
              <VayaButton variant="destructive">Destructive</VayaButton>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <VayaButton variant="primary" size="sm">Small</VayaButton>
              <VayaButton variant="primary" size="md">Medium</VayaButton>
              <VayaButton variant="primary" size="lg">Large</VayaButton>
              <VayaButton variant="primary" size="xl">Extra Large</VayaButton>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <VayaButton variant="primary" isLoading>Loading</VayaButton>
              <VayaButton variant="primary" leftIcon={<Play />}>With Left Icon</VayaButton>
              <VayaButton variant="primary" rightIcon={<Send />}>With Right Icon</VayaButton>
              <VayaButton variant="primary" disabled>Disabled</VayaButton>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Icon Buttons</h2>
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Icon Button Variants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <IconButton variant="primary" icon={<Plus />} />
              <IconButton variant="secondary" icon={<Heart />} />
              <IconButton variant="tertiary" icon={<Share />} />
              <IconButton variant="outline" icon={<Bell />} />
              <IconButton variant="ghost" icon={<Settings />} />
              <IconButton variant="destructive" icon={<Trash />} />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <IconButton variant="primary" size="sm" icon={<Plus />} />
              <IconButton variant="primary" size="md" icon={<Plus />} />
              <IconButton variant="primary" size="lg" icon={<Plus />} />
              <IconButton variant="primary" size="xl" icon={<Plus />} />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <IconButton variant="primary" shape="circle" icon={<Plus />} />
              <IconButton variant="primary" shape="square" icon={<Plus />} />
              <IconButton variant="primary" shape="rounded" icon={<Plus />} />
              <IconButton variant="primary" isLoading icon={<Plus />} />
              <IconButton variant="primary" disabled icon={<Plus />} />
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Action Menus</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Dropdown Menu</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ActionMenu
                label="Options"
                items={[
                  { id: "edit", label: "Edit", icon: <Edit /> },
                  { id: "share", label: "Share", icon: <Share /> },
                  { id: "download", label: "Download", icon: <Download /> },
                  { id: "archive", label: "Archive", icon: <Archive /> },
                  { id: "delete", label: "Delete", icon: <Trash />, destructive: true }
                ]}
              />
            </CardContent>
          </Card>
          
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Minimal Menu</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ActionMenu
                variant="minimal"
                items={[
                  { id: "edit", label: "Edit", icon: <Edit /> },
                  { id: "share", label: "Share", icon: <Share /> },
                  { id: "download", label: "Download", icon: <Download /> },
                  { id: "copy", label: "Duplicate", icon: <Copy /> },
                  { id: "delete", label: "Delete", icon: <Trash />, destructive: true }
                ]}
                position="bottom"
              />
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Floating Action Button</h2>
        <Card className="p-6 relative h-64">
          <CardHeader>
            <CardTitle>Floating Action Button Variants</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full">
            <div className="space-y-4 text-center">
              <p className="text-gray-500">Floating Action Buttons appear fixed to the corner of the screen</p>
              <div className="flex justify-center gap-4">
                <FloatingActionButton
                  variant="primary"
                  icon={<Plus />}
                  className="position-static relative bottom-0 right-0"
                />
                <FloatingActionButton
                  variant="secondary"
                  icon={<Mic />}
                  extended
                  label="Record"
                  className="position-static relative bottom-0 right-0"
                />
              </div>
            </div>
            
            <FloatingActionButton
              variant="primary"
              icon={<Plus />}
              className="bottom-6 right-6"
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
