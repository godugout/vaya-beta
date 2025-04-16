
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface FamilyStoryCardProps {
  title: string;
  description: string;
  author: string;
  imageSrc?: string;
}

const FamilyStoryCard = ({ title, description, author, imageSrc }: FamilyStoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full bg-[#1a2332] border-[#2a3546] overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-gray-300 text-sm mb-4">{description}</p>
          <div className="flex items-center text-sm text-gray-400">
            <span>Shared by {author}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FamilyStoryCard;
