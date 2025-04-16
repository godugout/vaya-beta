
import { Button } from "@/components/ui/button";
import { MessageSquare, ChevronRight } from "lucide-react";

export const DemoFooter = () => {
  return (
    <div className="flex justify-center mt-20 pb-12">
      <div className="flex gap-4">
        <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800">
          <MessageSquare className="h-4 w-4 mr-2" />
          Component Documentation
        </Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <ChevronRight className="h-4 w-4 mr-2" />
          Explore All Components
        </Button>
      </div>
    </div>
  );
};
