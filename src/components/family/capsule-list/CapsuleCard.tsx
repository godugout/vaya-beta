
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { CapsuleData } from "@/components/capsule/types";

interface CapsuleCardProps {
  capsule: CapsuleData;
  index: number;
}

export const CapsuleCard = ({ capsule, index }: CapsuleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full p-6 hover:shadow-md transition-all duration-200">
        <div className="flex flex-col h-full">
          <div className="mb-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              capsule.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
              capsule.status === 'active' ? 'bg-green-100 text-green-700' :
              capsule.status === 'locked' ? 'bg-amber-100 text-amber-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {capsule.status}
            </span>
          </div>
          <h3 className="text-lg font-medium mb-2">{capsule.title}</h3>
          <p className="text-sm text-gray-600 mb-4 flex-grow">{capsule.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(capsule.created_at), "MMM d, yyyy")}</span>
            </div>
            {capsule.reveal_date && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{format(new Date(capsule.reveal_date), "MMM d, yyyy")}</span>
              </div>
            )}
          </div>
          <Link 
            to={`/capsule/${capsule.id}`}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            View Capsule →
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};
