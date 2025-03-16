
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Plus, Lock, Image, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface PlaceholderTabProps {
  title: string;
  description?: string;
  comingSoon?: boolean;
}

export function PlaceholderTab({ 
  title, 
  description, 
  comingSoon = true 
}: PlaceholderTabProps) {
  const defaultDescription = `This is where ${title.toLowerCase()} will be displayed once the feature is available.`;
  
  // Get the appropriate icon based on the title
  const getIcon = () => {
    if (title.includes("Photos")) return Image;
    if (title.includes("Stories")) return BookOpen;
    return Info;
  };
  
  const Icon = getIcon();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {title}
            {comingSoon && (
              <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 px-2 py-0.5 rounded-full font-normal">
                Coming Soon
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center p-6">
            <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              {comingSoon ? 
                <Lock className="h-6 w-6 text-gray-500" /> : 
                <Icon className="h-6 w-6 text-blue-500" />
              }
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {description || defaultDescription}
            </p>
            <Button 
              variant={comingSoon ? "outline" : "default"}
              className={comingSoon ? "opacity-50 cursor-not-allowed" : ""}
              disabled={comingSoon}
            >
              <Plus className="h-4 w-4 mr-2" />
              {comingSoon ? "Feature Coming Soon" : `Create New ${title}`}
            </Button>
          </div>
          
          {comingSoon && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm text-gray-500 dark:text-gray-400">
              <p className="flex items-start">
                <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>We're working on bringing this feature to you soon. Check back for updates!</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
