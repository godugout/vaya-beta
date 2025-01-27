import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CapsuleCardProps {
  title: string;
  link: string;
  icon: LucideIcon;
  isDesktop?: boolean;
}

export const CapsuleCard = ({ title, link, icon: Icon, isDesktop = false }: CapsuleCardProps) => {
  if (isDesktop) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="group relative w-[280px] h-[80px]"
      >
        <Link to={link} className="block h-full">
          <div className="absolute inset-0 flex items-center justify-between px-6 bg-white rounded-full border-2 border-vaya-gray-200 shadow-lg overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-vaya-accent-orange/20 rounded-full">
                <Icon className="w-6 h-6 text-vaya-primary" />
              </div>
              <h2 className="font-outfit text-lg font-semibold text-vaya-gray-900 truncate max-w-[160px]">
                {title}
              </h2>
            </div>
          </div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-vaya-primary to-vaya-secondary rounded-full transition-opacity duration-300" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center px-6 transition-opacity duration-300">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-full">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-outfit text-lg font-semibold text-white truncate max-w-[160px]">
                {title}
              </h2>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <Link
      to={link}
      className="block bg-white rounded-full p-4 transition-all duration-300 hover:bg-vaya-accent-orange/20 border-2 border-vaya-gray-200 shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 bg-vaya-accent-orange/20 rounded-full">
          <Icon className="w-6 h-6 text-vaya-primary" />
        </div>
        <h3 className="text-lg font-semibold text-vaya-gray-900 font-outfit truncate">
          {title}
        </h3>
      </div>
    </Link>
  );
};