
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const EmptyFamiliesState = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="col-span-full" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-black dark:text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Create Your First Family</h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
            Start your family journey by creating your first family group. Invite members and begin preserving your legacy together.
          </p>
          <Button 
            onClick={() => navigate("/create-family")}
            size="lg"
            className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Family
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
