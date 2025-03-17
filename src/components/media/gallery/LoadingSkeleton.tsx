
import { Card, CardContent } from "@/components/ui/card";

export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="overflow-hidden bg-gray-100 dark:bg-gray-800/50 animate-pulse">
          <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
          <CardContent className="p-4">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
