
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { motion } from 'framer-motion';

interface GuestMenuProps {
  navigate: (path: string) => void;
}

export const GuestMenu: React.FC<GuestMenuProps> = ({ navigate }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button 
        onClick={() => navigate('/auth')}
        className="bg-autumn hover:bg-autumn/90 text-white flex items-center gap-2"
      >
        <UserRoundPlus className="h-4 w-4" />
        <span>Sign In</span>
      </Button>
    </motion.div>
  );
};
