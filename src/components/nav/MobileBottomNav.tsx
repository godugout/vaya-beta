
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Image, BookOpen, Package, Users, Clock } from "lucide-react";

interface MobileBottomNavProps {
  className?: string;
}

export const MobileBottomNav = ({ className = "" }: MobileBottomNavProps) => {
  return (
    <div className={`border-t bg-background fixed bottom-0 left-0 right-0 z-10 ${className}`}>
      <div className="flex items-center justify-around h-16">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-1/5 text-xs ${
              isActive
                ? "text-primary"
                : "text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            }`
          }
          end
        >
          <Home className="h-5 w-5 mb-1" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/memory-lane"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-1/5 text-xs ${
              isActive
                ? "text-primary"
                : "text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            }`
          }
        >
          <Image className="h-5 w-5 mb-1" />
          <span>Memories</span>
        </NavLink>
        <NavLink
          to="/share-stories"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-1/5 text-xs ${
              isActive
                ? "text-primary"
                : "text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            }`
          }
        >
          <BookOpen className="h-5 w-5 mb-1" />
          <span>Stories</span>
        </NavLink>
        <NavLink
          to="/family-capsules"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-1/5 text-xs ${
              isActive
                ? "text-primary"
                : "text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            }`
          }
        >
          <Package className="h-5 w-5 mb-1" />
          <span>Capsules</span>
        </NavLink>
        <NavLink
          to="/timeline"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-1/5 text-xs ${
              isActive
                ? "text-primary"
                : "text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            }`
          }
        >
          <Clock className="h-5 w-5 mb-1" />
          <span>Timeline</span>
        </NavLink>
      </div>
    </div>
  );
};
