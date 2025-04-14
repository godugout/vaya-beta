
import React, { useState } from 'react';
import { Smartphone, Apple } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface MobilePhoneMockupProps {
  children: React.ReactNode;
}

export const MobilePhoneMockup = ({ children }: MobilePhoneMockupProps) => {
  const [isApple, setIsApple] = useState(true);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="relative w-full max-w-[1200px] flex items-stretch justify-center gap-6">
        {/* Device selector panel - shown on larger screens */}
        <div className="hidden lg:flex flex-col gap-4 w-64">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-4 rounded-xl">
            <h3 className="text-white font-medium mb-4">Device Settings</h3>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {isApple ? <Apple className="text-white" size={18} /> : <Smartphone className="text-white" size={18} />}
                <span className="text-white text-sm">
                  {isApple ? 'iPhone 15 Pro' : 'Pixel 8 Pro'}
                </span>
              </div>
              <Switch
                checked={isApple}
                onCheckedChange={setIsApple}
              />
            </div>
          </div>
        </div>

        {/* Phone mockup container with generous vertical spacing */}
        <div className="flex-1 max-w-sm flex flex-col items-center justify-center py-12">
          {/* Phone device frame */}
          <div className={cn(
            "relative overflow-hidden shadow-2xl transition-all duration-300",
            isApple 
              ? "bg-black rounded-[44px] border-[14px] border-black"
              : "bg-black rounded-[36px] border-[10px] border-black"
          )}>
            {/* Dynamic notch or camera cutout */}
            {isApple ? (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-[26px] bg-black rounded-b-3xl z-10"></div>
            ) : (
              <div className="absolute top-4 right-1/2 translate-x-1/2 w-3 h-3 bg-neutral-700 rounded-full z-10"></div>
            )}
            
            {/* Phone screen */}
            <div className="relative overflow-hidden bg-white w-[320px] h-[690px] rounded-[24px]">
              {/* Scrollable content area with safe padding */}
              <div className="h-full overflow-y-auto py-6 px-2">
                {children}
              </div>
            </div>
            
            {/* Home indicator/pill */}
            <div className={cn(
              "absolute bottom-2 left-1/2 -translate-x-1/2 bg-gray-500/30 z-10",
              isApple
                ? "w-[120px] h-[5px] rounded-full"
                : "w-[140px] h-[5px] rounded-full"
            )}></div>
          </div>
        </div>

        {/* Features panel - shown on larger screens */}
        <div className="hidden lg:flex flex-col gap-4 w-64">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-4 rounded-xl h-fit">
            <h3 className="text-white font-medium mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <button className="w-full text-sm bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors">
                New Message
              </button>
              <button className="w-full text-sm bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors">
                New Group
              </button>
              <button className="w-full text-sm bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors">
                Profile Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
