
import { useState } from 'react';
import { FamilyTreeMain } from "@/components/family/FamilyTreeMain";
import { TreeDeciduous, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedContainer } from "@/components/animation/AnimatedContainer";

export const FamilyTreeSection = () => {
  return (
    <AnimatedContainer variant="fade" className="relative">
      <div className="flex items-center mb-8">
        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
          <TreeDeciduous className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Family Tree Components</h2>
          <p className="text-gray-400">Visual representations of family connections and storytelling progress</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <h3 className="text-2xl font-semibold text-blue-300">Smart Family Tree Builder</h3>
          <div className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent ml-4"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="md:w-2/3">
            <p className="text-gray-400 mb-6">
              Upload spreadsheets or JSON files to automatically generate your family tree, or build it manually by adding each member.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30 p-3 flex gap-3 items-center">
              <UploadCloud className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-sm font-semibold text-blue-300">Quick Start</p>
                <p className="text-xs text-gray-400">Upload CSV, JSON or Excel files</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-1 backdrop-blur-sm shadow-xl">
          <div className="h-[600px] rounded-lg overflow-hidden">
            <FamilyTreeMain />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};
