import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Plus, ChevronUp, Users, Gift, Heart, Star, Music } from "lucide-react";
import CreateCapsuleForm from "@/components/capsule/CreateCapsuleForm";
import { DesktopGrid } from "@/components/ui/capsule/DesktopGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { StepCard } from "@/components/ui/capsule/StepCard";
import { Camera as CameraIcon, BookOpen, Sparkles } from "lucide-react";

// Hardcoded data for testing
const mockCapsules = [
  {
    title: "Family Reunion 2024",
    link: "/capsules/reunion-2024",
    icon: Users,
    colorKey: "orange",
    metadata: {
      creatorInitials: "JD",
      itemCount: 12,
      status: "upcoming" as const,
      date: "2024-07-15",
    }
  },
  {
    title: "Holiday Memories",
    link: "/capsules/holidays",
    icon: Gift,
    colorKey: "green",
    metadata: {
      creatorInitials: "MC",
      itemCount: 8,
      status: "active" as const,
      date: "2023-12-25",
    }
  },
  {
    title: "Wedding Anniversary",
    link: "/capsules/anniversary",
    icon: Heart,
    colorKey: "orange",
    metadata: {
      creatorInitials: "AS",
      itemCount: 15,
      status: "locked" as const,
      date: "2024-02-14",
    }
  }
];

interface CapsuleScrollSectionProps {
  capsules: {
    title: string;
    link: string;
    icon: any;
    colorKey: string;
    metadata?: {
      creatorAvatar?: string;
      creatorInitials: string;
      itemCount: number;
      status: "upcoming" | "active" | "locked" | "revealed";
      date: string;
    };
  }[];
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

          <h2 className="text-xl font-semibold text-gray-900 flex-1 text-center">
            Family Capsules
          </h2>

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
                    variant="outline"
                    className="hidden sm:flex border-2 border-vaya-capsules hover:bg-vaya-capsules/10 text-vaya-capsules"
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

      <div className="container mx-auto px-4 py-8">
        {isMobile ? null : <DesktopGrid capsules={mockCapsules} />}
      </div>

      {/* Fallback List View */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4">
          {mockCapsules.map((capsule) => (
            <div 
              key={capsule.title}
              className={cn(
                "p-6 rounded-2xl border transition-all duration-300",
                capsule.metadata?.status === "active" && "bg-vaya-accent-green/20",
                capsule.metadata?.status === "upcoming" && "bg-vaya-accent-yellow/20",
                capsule.metadata?.status === "locked" && "bg-vaya-accent-blue/20",
                capsule.metadata?.status === "revealed" && "bg-vaya-accent-orange/20"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-full",
                  `bg-vaya-${capsule.colorKey}`
                )}>
                  <capsule.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{capsule.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{capsule.metadata?.itemCount} items</span>
                    <span className="capitalize px-2 py-1 rounded-full text-xs font-medium bg-white shadow-sm">
                      {capsule.metadata?.status}
                    </span>
                    <span>{new Date(capsule.metadata?.date || "").toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-outfit">Create Your Family Time Capsule</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Preserve your family's precious moments and stories in a digital time capsule. 
              Open it together on a special date to relive the memories.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <StepCard
              step={1}
              icon={CameraIcon}
              title="Capture & Create"
              description="Add photos, voice messages, and written stories that tell your family's unique journey. Each piece becomes part of your legacy."
              color="bg-vaya-accent-orange/20"
              iconColor="text-vaya-capsules"
              className="hover:scale-105 transition-transform duration-300"
            />
            
            <StepCard
              step={2}
              icon={BookOpen}
              title="Set the Perfect Date"
              description="Choose a meaningful future moment for your capsule's reveal - a wedding, graduation, or family reunion. Make it special!"
              color="bg-vaya-accent-yellow/20"
              iconColor="text-vaya-capsules"
              className="hover:scale-105 transition-transform duration-300"
            />
            
            <StepCard
              step={3}
              icon={Users}
              title="Invite Loved Ones"
              description="Share the capsule with family and friends. Let everyone contribute their memories, stories, and wishes for the future."
              color="bg-vaya-accent-green/20"
              iconColor="text-vaya-capsules"
              className="hover:scale-105 transition-transform duration-300"
            />

            <StepCard
              step={4}
              icon={Sparkles}
              title="Experience the Magic"
              description="When the day arrives, gather together and experience the joy of opening your capsule. Relive precious memories and celebrate your family's story."
              color="bg-vaya-accent-blue/20"
              iconColor="text-vaya-capsules"
              className="reveal-card hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};