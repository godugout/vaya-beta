
import { Helmet } from "react-helmet";
import MemoryFeedLayout from "@/components/memory/MemoryFeedLayout";
import AddMemoryButton from "@/components/memory/AddMemoryButton";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { MessageCircle, User, Tag, Calendar, Bookmark } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useNavigate } from "react-router-dom";

const MemoryLane = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Memory Lane | Vaya</title>
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-2">
              <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-outfit font-semibold text-space-text-primary">Our Memories</h1>
                <ToggleGroup 
                  type="multiple" 
                  className="hidden md:flex bg-space-ui-surface border-space-ui-border border rounded-lg p-1 shadow-sm"
                >
                  <ToggleGroupItem 
                    value="people" 
                    aria-label="Filter by people"
                    className="data-[state=on]:bg-space-ui-accent/10 data-[state=on]:text-space-ui-accent"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">People</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="topics" 
                    aria-label="Filter by topics"
                    className="data-[state=on]:bg-space-ui-accent/10 data-[state=on]:text-space-ui-accent"
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Topics</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="date" 
                    aria-label="Filter by date"
                    className="data-[state=on]:bg-space-ui-accent/10 data-[state=on]:text-space-ui-accent"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Date</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="bookmarks" 
                    aria-label="Show bookmarks"
                    className="data-[state=on]:bg-space-ui-accent/10 data-[state=on]:text-space-ui-accent"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Bookmarks</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <MemoryFeedLayout />
            </div>

            <div className="hidden lg:block space-y-6">
              <div className="bg-space-ui-surface rounded-lg shadow-sm p-6 border border-space-ui-border">
                <h2 className="text-lg font-outfit font-semibold text-space-text-primary mb-4">
                  Coming Soon
                </h2>
                <p className="text-space-text-secondary">
                  Family highlights and upcoming events will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile CTA Bar */}
        <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-space-ui-surface border-t border-space-ui-border z-40">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-2 border-space-ui-accent hover:bg-space-ui-accent/10 text-space-ui-accent"
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
      </MainLayout>
    </>
  );
};

export default MemoryLane;
