
import { useState } from "react";
import { X, AlertCircle, CheckCircle, InfoIcon, BellRing } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type NotificationType = "info" | "success" | "warning" | "error" | "default";

interface NotificationBannerProps {
  type?: NotificationType;
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const NotificationBanner = ({
  type = "default",
  title,
  message,
  action,
  dismissible = true,
  onDismiss,
  className,
}: NotificationBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const getIcon = () => {
    switch (type) {
      case "info":
        return <InfoIcon className="h-5 w-5" />;
      case "success":
        return <CheckCircle className="h-5 w-5" />;
      case "warning":
      case "error":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <BellRing className="h-5 w-5" />;
    }
  };

  const getBannerStyles = () => {
    switch (type) {
      case "info":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "success":
        return "bg-green-50 text-green-800 border-green-200";
      case "warning":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "error":
        return "bg-red-50 text-red-800 border-red-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "rounded-xl p-4 border mb-4",
            getBannerStyles(),
            className
          )}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
            
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium">{title}</h3>
              {message && <div className="mt-1 text-sm opacity-90">{message}</div>}
              
              {action && (
                <div className="mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={action.onClick}
                    className="text-xs"
                  >
                    {action.label}
                  </Button>
                </div>
              )}
            </div>
            
            {dismissible && (
              <div className="ml-auto flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={handleDismiss}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
