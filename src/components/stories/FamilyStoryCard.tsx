
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

interface FamilyStoryCardProps {
  title: string;
  description: string;
  author: string;
  imageSrc?: string;
  date?: string;
  storyCount?: number;
}

const FamilyStoryCard = ({ 
  title, 
  description, 
  author, 
  imageSrc, 
  date,
  storyCount 
}: FamilyStoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900">
        {imageSrc && (
          <div className="h-40 w-full overflow-hidden">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            {storyCount !== undefined && (
              <span className="px-2.5 py-0.5 bg-blue-600/30 text-blue-200 text-xs font-medium rounded-full">
                {storyCount} {storyCount === 1 ? 'Story' : 'Stories'}
              </span>
            )}
          </div>
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">{description}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">By {author}</span>
            {date && (
              <div className="flex items-center text-gray-400 text-xs">
                <CalendarDays className="h-3.5 w-3.5 mr-1" />
                {date}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FamilyStoryCard;
