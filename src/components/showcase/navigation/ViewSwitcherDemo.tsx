
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FamilyViewSwitcher } from "@/components/family/FamilyViewSwitcher";

export const ViewSwitcherDemo = () => {
  const [activeView, setActiveView] = useState<'grid' | 'tree' | 'timeline'>('grid');
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">View Switchers</h2>
      <Card>
        <CardHeader>
          <CardTitle>Content View Switchers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FamilyViewSwitcher activeView={activeView} setActiveView={setActiveView} />
          
          <div className="flex justify-center">
            <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <Button 
                variant={isSimplifiedView ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setIsSimplifiedView(true)}
                className="rounded-md"
              >
                Simplified View
              </Button>
              <Button 
                variant={!isSimplifiedView ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setIsSimplifiedView(false)}
                className="rounded-md"
              >
                Standard View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
