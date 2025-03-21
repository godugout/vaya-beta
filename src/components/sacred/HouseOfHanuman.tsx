
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LanguageScriptPicker } from '@/components/nav/LanguageScriptPicker';
import { HouseOfHanumanContent } from './HouseOfHanumanContent';
import '@/styles/components/gujarati-content.css';

export const HouseOfHanuman: React.FC = () => {
  return (
    <Card className="max-w-4xl mx-auto bg-gradient-to-r from-[#1A1F2C] to-[#2D2B55] shadow-xl">
      <CardContent className="p-0">
        <div className="flex justify-end p-4">
          <LanguageScriptPicker />
        </div>
        
        <div className="px-4 pb-8">
          <HouseOfHanumanContent withAnimation={true} />
        </div>
      </CardContent>
    </Card>
  );
};
