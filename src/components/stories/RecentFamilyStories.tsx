import { FadeIn } from "@/components/animation/FadeIn";
import { Card } from "@/components/ui/card";

const RecentFamilyStories = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Recent Family Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Story cards */}
            <Card className="p-6 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Story Title
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Story preview text with improved contrast...
              </p>
            </Card>
            {/* More story cards... */}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default RecentFamilyStories;
