
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FamiliesHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Your Families</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Connect with your loved ones and share your legacy</p>
      </div>
      
      <Button 
        onClick={() => navigate("/create-family")}
        size="sm"
        className="mt-4 md:mt-0 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Family
      </Button>
    </div>
  );
};
