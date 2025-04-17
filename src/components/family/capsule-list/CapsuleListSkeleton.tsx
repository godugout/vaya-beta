
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export const CapsuleListSkeleton = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Family Capsules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </CardHeader>
            <CardContent className="pb-2 space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="h-10 w-full bg-gray-200 rounded" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
