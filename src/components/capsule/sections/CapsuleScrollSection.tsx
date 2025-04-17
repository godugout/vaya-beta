
import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Capsule } from "@/types/capsule";
import { motion } from "framer-motion";
import { LoadingIndicator } from "@/components/animation/LoadingIndicator";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";

interface CapsuleScrollSectionProps {
  capsules: Capsule[];
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
}

export const CapsuleScrollSection = ({ 
  capsules, 
  hasNextPage, 
  fetchNextPage, 
  isFetchingNextPage 
}: CapsuleScrollSectionProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef);

  // Load more capsules when scrolling to the bottom
  useEffect(() => {
    if (isInView && hasNextPage && fetchNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {capsules.map((capsule, index) => (
          <motion.div
            key={capsule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="h-full"
          >
            <Card className="h-full p-6 hover:shadow-md transition-all duration-200">
              <div className="flex flex-col h-full">
                <div className="mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    capsule.metadata?.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                    capsule.metadata?.status === 'active' ? 'bg-green-100 text-green-700' :
                    capsule.metadata?.status === 'locked' ? 'bg-amber-100 text-amber-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {capsule.metadata?.status}
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-2">{capsule.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{capsule.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{new Date(capsule.metadata?.date).toLocaleDateString()}</span>
                  <span>{capsule.metadata?.itemCount} items</span>
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
        ))}
      </div>
      
      {hasNextPage && (
        <div 
          ref={loadMoreRef} 
          className="flex justify-center items-center py-8"
        >
          {isFetchingNextPage ? (
            <LoadingIndicator size="md" />
          ) : (
            <p className="text-gray-400 text-sm">Scroll to load more</p>
          )}
        </div>
      )}
    </div>
  );
};
