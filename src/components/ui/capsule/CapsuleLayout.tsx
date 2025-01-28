import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileCapsuleList } from "./MobileCapsuleList";
import { DesktopGrid } from "./DesktopGrid";
import CapsuleHeader from "./CapsuleHeader";
import { Camera } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateCapsuleForm from "@/components/capsule/CreateCapsuleForm";
import { CapsulePills } from "./CapsulePills";
import type { CapsuleLayoutProps } from "./types";

export const CapsuleLayout = ({ capsules }: CapsuleLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen pb-32 md:pb-16">
      <div className="relative">
        <CapsuleHeader />
        <div className="pt-8 md:pt-16 pb-16 md:pb-24">
          {isMobile ? (
            <MobileCapsuleList capsules={capsules} />
          ) : (
            <div className="container mx-auto px-4">
              <DesktopGrid capsules={capsules} />
            </div>
          )}
        </div>
      </div>

      <CapsulePills />

      {/* Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-vaya-capsules hover:bg-vaya-capsules/90 text-white shadow-lg transition-all duration-300"
              size="lg"
            >
              Create a Capsule <Camera className="ml-2 h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <CreateCapsuleForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop Floating Button */}
      <div className="hidden md:block fixed bottom-8 right-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="bg-vaya-capsules hover:bg-vaya-capsules/90 text-white shadow-lg transition-all duration-300"
              size="lg"
            >
              Create a Capsule <Camera className="ml-2 h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <CreateCapsuleForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};