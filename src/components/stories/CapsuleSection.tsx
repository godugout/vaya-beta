
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingIndicator } from "@/components/animation/LoadingIndicator";
import { type Capsule } from "@/components/capsule/types";

interface CapsuleSectionProps {
  capsules: Capsule[];
  isLoading: boolean;
}

export const CapsuleSection = ({ capsules, isLoading }: CapsuleSectionProps) => {
  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Capsules</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search capsules..." 
              className="pl-10 w-full"
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingIndicator size="lg" />
          </div>
        ) : capsules.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No capsules available. Create your first capsule now!</p>
            <Button className="mt-4" onClick={() => window.location.href = "/family-capsules"}>
              Create Capsule
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {capsules.slice(0, 4).map((capsule) => (
              <Card key={capsule.id} className={`
                ${capsule.status === 'upcoming' ? "bg-purple-50 dark:bg-purple-900/20" : 
                  capsule.status === 'active' ? "bg-blue-50 dark:bg-blue-900/20" : 
                  "bg-green-50 dark:bg-green-900/20"} 
                border border-border`}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium">{capsule.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      capsule.status === 'active' ? "bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-300" : 
                      capsule.status === 'locked' ? "bg-yellow-100 dark:bg-yellow-800/40 text-yellow-700 dark:text-yellow-300" : 
                      "bg-green-100 dark:bg-green-800/40 text-green-700 dark:text-green-300"
                    }`}>
                      {capsule.status}
                    </span>
                  </div>
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-800/30">
                    <span className="text-lg">
                      {capsule.status === 'upcoming' ? "👨‍👩‍👧‍👦" : 
                       capsule.status === 'active' ? "🌴" : 
                       capsule.status === 'locked' ? "🔒" : 
                       "💍"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
