import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import CreateCapsuleForm from "@/components/capsule/CreateCapsuleForm";
import { DesktopGrid } from "@/components/ui/capsule/DesktopGrid";
import { MobileCapsuleList } from "@/components/ui/capsule/MobileCapsuleList";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Capsule } from "@/components/ui/capsule/types";

interface CapsuleScrollSectionProps {
  capsules: Capsule[];
}

export const CapsuleScrollSection = ({ capsules }: CapsuleScrollSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-white">
      {/* Secondary Title Bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Family Capsules</h2>
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {isMobile ? (
          <MobileCapsuleList capsules={capsules} />
        ) : (
          <DesktopGrid capsules={capsules} />
        )}
      </div>
    </div>
  );
};