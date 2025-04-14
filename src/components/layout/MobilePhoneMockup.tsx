
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-7xl mx-auto flex items-center gap-8">
        {/* Quick actions panel - only visible on larger screens */}
        <div className="hidden lg:flex w-64 flex-col gap-4">
          <div className="glass-morphism p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-2">Device</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isApple ? <Apple className="text-white" /> : <Smartphone className="text-white" />}
                <span className="text-white text-sm">{isApple ? 'iPhone' : 'Android'}</span>
              </div>
              <Switch
                checked={isApple}
                onCheckedChange={setIsApple}
              />
            </div>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="flex-1 flex justify-center py-16">
          <div className={cn(
            "relative w-full max-w-md overflow-hidden transition-all duration-300",
            isApple ? [
              "rounded-[3.5rem] bg-black p-6",
              "before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2",
              "before:w-36 before:h-8 before:bg-black before:rounded-b-3xl",
            ] : [
              "rounded-[2.5rem] bg-black p-5",
              "before:content-[''] before:absolute before:top-4 before:right-4",
              "before:w-3 before:h-3 before:bg-gray-600 before:rounded-full",
            ]
          )}>
            {/* Phone Screen */}
            <div className={cn(
              "relative overflow-hidden bg-white w-full",
              "rounded-[2rem] shadow-inner",
              "h-[calc(100vh-22rem)] max-h-[700px] min-h-[580px]"
            )}>
              {/* Content container with padding */}
              <div className="h-full overflow-y-auto pt-6 pb-14">
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* Engagement panel - only visible on larger screens */}
        <div className="hidden lg:flex w-64 flex-col gap-4">
          <div className="glass-morphism p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-sm bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors">
                New Story
              </button>
              <button className="w-full text-sm bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors">
                View Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
