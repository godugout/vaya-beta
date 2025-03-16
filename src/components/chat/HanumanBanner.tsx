
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface HanumanBannerProps {
  onFamilySettingsClick: () => void;
}

export const HanumanBanner: React.FC<HanumanBannerProps> = ({ onFamilySettingsClick }) => {
  return (
    <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 mb-6">
      <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 text-white p-2 rounded-full">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-800 font-heading">Hanuman Edition</h3>
            <p className="text-sm text-amber-700">
              Culturally relevant prompts for South Asian families
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="border-amber-400 hover:bg-amber-200 text-amber-800"
          onClick={onFamilySettingsClick}
        >
          Personalize Your Experience
        </Button>
      </CardContent>
    </Card>
  );
};
