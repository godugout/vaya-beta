
import { FadeIn } from "@/components/animation/FadeIn";
import { Card } from "@/components/ui/card";

const RecentFamilyStories = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Recent Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Story cards */}
            <Card className="p-6 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Grandma's First Day in America
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Maria shares the story of her grandmother's first day in America after immigrating in 1965.
              </p>
            </Card>
            <Card className="p-6 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Dad's College Adventures
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                James recorded his father's hilarious stories about his wild college years during the 1980s.
              </p>
            </Card>
            <Card className="p-6 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Our Wedding Day
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                David and Sarah recorded memories from their grandparents about their wedding day 60 years ago.
              </p>
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default RecentFamilyStories;
