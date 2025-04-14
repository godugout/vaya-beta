
import React, { useEffect } from "react";
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

  // Add Hanuman theme class when the component mounts
  useEffect(() => {
    document.body.classList.add('hanuman-theme');
    return () => {
      document.body.classList.remove('hanuman-theme');
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Memory Lane | Vaya</title>
      </Helmet>
      
      <MainLayout>
        <div className="hanuman-container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-2">
              <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-outfit font-semibold text-hanuman-text-primary hanuman-text-glow">Our Memories</h1>
                <ToggleGroup 
                  type="multiple" 
                  className="hidden md:flex bg-hanuman-card-bg border-hanuman-border-color border rounded-lg p-1 shadow-sm"
                >
                  <ToggleGroupItem 
                    value="people" 
                    aria-label="Filter by people"
                    className="data-[state=on]:bg-hanuman-primary/10 data-[state=on]:text-hanuman-primary"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">People</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="topics" 
                    aria-label="Filter by topics"
                    className="data-[state=on]:bg-hanuman-primary/10 data-[state=on]:text-hanuman-primary"
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Topics</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="date" 
                    aria-label="Filter by date"
                    className="data-[state=on]:bg-hanuman-primary/10 data-[state=on]:text-hanuman-primary"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Date</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="bookmarks" 
                    aria-label="Show bookmarks"
                    className="data-[state=on]:bg-hanuman-primary/10 data-[state=on]:text-hanuman-primary"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Bookmarks</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <MemoryFeedLayout />
            </div>

            <div className="hidden lg:block space-y-6">
              <div className="hanuman-card p-6">
                <h2 className="text-lg font-outfit font-semibold text-hanuman-text-primary mb-4">
                  Coming Soon
                </h2>
                <p className="text-hanuman-text-secondary">
                  Family highlights and upcoming events will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile CTA Bar */}
        <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-hanuman-card-bg border-t border-hanuman-border-color z-40">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-2 border-hanuman-primary hover:bg-hanuman-primary/10 text-hanuman-primary"
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
