import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Plus } from "lucide-react";
import CreateCapsuleForm from "@/components/capsule/CreateCapsuleForm";
import { DesktopGrid } from "@/components/ui/capsule/DesktopGrid";
import { MobileCapsuleList } from "@/components/ui/capsule/MobileCapsuleList";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Capsule } from "@/components/ui/capsule/types";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CapsuleScrollSectionProps {
  capsules: Capsule[];
}

export const CapsuleScrollSection = ({ capsules }: CapsuleScrollSectionProps) => {
  const isMobile = useIsMobile();
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const scrollToHero = () => {
    const heroElement = document.querySelector('[data-component="Hero"]');
    heroElement?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-64px 0px 0px 0px"
      }
    );

    const heroElement = document.querySelector('[data-component="Hero"]');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Secondary Title Bar */}
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out",
          "fixed left-0 right-0 bg-white border-b border-gray-200 shadow-sm",
          isHeroVisible 
            ? "top-16 opacity-0 pointer-events-none" 
            : "top-0 opacity-100 pointer-events-auto z-50"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/ef40fff0-4da4-4937-af3d-c2276b1d2588.png" 
              alt="Vaya Logo" 
              className="h-8 w-8"
            />
            <span className="font-outfit font-bold text-xl text-gray-900">
              Vaya<sup>α</sup>
            </span>
          </Link>

          {/* Centered Title */}
          <h2 className="text-xl font-semibold text-gray-900 flex-1 text-center">
            Family Capsules
          </h2>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToHero}
              className="rounded-full hover:bg-gray-100"
              title="Go back to top"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="capsules"
                    className="hidden sm:flex"
                  >
                    Add to Capsule <Plus className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <CreateCapsuleForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-vaya-capsules hover:bg-vaya-capsules/90 text-white">
                    Create a Capsule <Camera className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <CreateCapsuleForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {isMobile ? (
          <MobileCapsuleList capsules={capsules} />
        ) : (
          <DesktopGrid capsules={capsules} />
        )}
      </div>

      {/* Go Back to the Future Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Go Back to the Future</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Each capsule represents a unique collection of memories, stories, and moments 
            from your family's journey. Click on any capsule to dive deeper into your family's 
            history.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-vaya-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-semibold text-vaya-capsules">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Create a Capsule</h3>
              <p className="text-gray-600">
                Give your capsule a theme and set a date for when it should be opened. It 
                could be for a special occasion, anniversary, or future milestone.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-vaya-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-semibold text-vaya-capsules">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Add Your Memories</h3>
              <p className="text-gray-600">
                Share stories through voice messages, photos, or written notes. Each 
                contribution is kept secret until the reveal date.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-vaya-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-semibold text-vaya-capsules">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Invite Family & Friends</h3>
              <p className="text-gray-600">
                Let others contribute their memories. Everyone's additions remain a 
                surprise until the capsule is opened together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};