
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, Heart, Share2, Box } from "lucide-react";

export const FamilyBox = ({ familyId }: { familyId: string }) => {
  return (
    <Card className="border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Box className="h-5 w-5 text-autumn" />
          <CardTitle className="text-lg">Family Box</CardTitle>
        </div>
        <CardDescription>
          Save items to organize and revisit later
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center justify-start" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            <span>Bookmarks</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-start" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            <span>Favorites</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-start" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            <span>Shared Items</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-start" size="sm">
            <Box className="h-4 w-4 mr-2" />
            <span>Saved Items</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
