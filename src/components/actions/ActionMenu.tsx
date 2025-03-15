
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActionMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

interface ActionMenuProps {
  label?: string;
  items: ActionMenuItem[];
  position?: "bottom" | "top" | "right" | "left";
  variant?: "default" | "minimal";
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
}

export const ActionMenu = ({
  label,
  items,
  position = "bottom",
  variant = "default",
  disabled = false,
  className,
  triggerClassName,
}: ActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  
  const handleItemClick = (item: ActionMenuItem) => {
    if (!item.disabled) {
      item.onClick?.();
      setIsOpen(false);
    }
  };
  
  // Position based animation and styles
  const getMenuPosition = () => {
    switch (position) {
      case "top":
        return { bottom: "100%", left: 0, right: 0, marginBottom: "8px" };
      case "right":
        return { left: "100%", top: 0, marginLeft: "8px" };
      case "left":
        return { right: "100%", top: 0, marginRight: "8px" };
      case "bottom":
      default:
        return { top: "100%", left: 0, right: 0, marginTop: "8px" };
    }
  };
  
  const getAnimationVariants = () => {
    switch (position) {
      case "top":
        return {
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: 10 },
          visible: { opacity: 1, x: 0 },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: -10 },
          visible: { opacity: 1, x: 0 },
        };
      case "bottom":
      default:
        return {
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };
  
  return (
    <div ref={menuRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          variant === "default" 
            ? "inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors" 
            : "inline-flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors",
          disabled && "opacity-50 cursor-not-allowed",
          triggerClassName
        )}
        disabled={disabled}
      >
        {variant === "default" ? (
          <>
            {label || "Options"}
            <ChevronDown className={cn(
              "ml-2 h-4 w-4 transition-transform",
              isOpen && "transform rotate-180"
            )} />
          </>
        ) : (
          <MoreVertical className="h-5 w-5" />
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-50 min-w-[180px] bg-white rounded-xl shadow-lg border border-gray-200 py-1 overflow-hidden"
            style={getMenuPosition()}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={getAnimationVariants()}
            transition={{ duration: 0.15 }}
          >
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={cn(
                  "w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm transition-colors",
                  item.destructive 
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-100",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {item.icon && (
                  <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>
                )}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
