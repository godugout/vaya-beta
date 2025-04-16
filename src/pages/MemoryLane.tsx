
import MemoryFeedLayout from "@/components/memory/MemoryFeedLayout";
import AddMemoryButton from "@/components/memory/AddMemoryButton";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { MessageCircle, User, Tag, Calendar, Bookmark } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useNavigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

const MemoryLane = () => {
  const navigate = useNavigate();

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pb-16 md:pb-0">
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-2">
              <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-outfit font-semibold text-gray-900 dark:text-white mb-4">Our Memories</h1>
                <ToggleGroup 
                  type="multiple" 
                  className="hidden md:flex bg-gray-50 dark:bg-gray-700/50 border rounded-lg p-1 shadow-sm"
                >
                  <ToggleGroupItem 
                    value="people" 
                    aria-label="Filter by people"
                    className="data-[state=on]:bg-autumn/10 data-[state=on]:text-autumn dark:data-[state=on]:bg-autumn/20"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">People</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="topics" 
                    aria-label="Filter by topics"
                    className="data-[state=on]:bg-autumn/10 data-[state=on]:text-autumn dark:data-[state=on]:bg-autumn/20"
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Topics</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="date" 
                    aria-label="Filter by date"
                    className="data-[state=on]:bg-autumn/10 data-[state=on]:text-autumn dark:data-[state=on]:bg-autumn/20"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Date</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="bookmarks" 
                    aria-label="Show bookmarks"
                    className="data-[state=on]:bg-autumn/10 data-[state=on]:text-autumn dark:data-[state=on]:bg-autumn/20"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Bookmarks</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <MemoryFeedLayout />
              </div>
            </div>

            <div className="hidden lg:block space-y-6">
              <div className="bg-gradient-to-br from-autumn/5 to-water/5 dark:from-autumn/10 dark:to-water/10 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                <h2 className="text-lg font-outfit font-semibold text-gray-900 dark:text-white mb-4">
                  Coming Soon
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Family highlights and upcoming events will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile CTA Bar */}
        <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-white/80 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 backdrop-blur-md z-40">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-2 border-autumn hover:bg-autumn/10 text-autumn dark:border-autumn dark:text-autumn"
              onClick={() => navigate("/narra")}
            >
              Ask Family
              <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
            <AddMemoryButton 
              className="flex-1"
              size="default"
            />
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default MemoryLane;
