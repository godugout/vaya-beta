
import React from "react";
import { useOfflineOperations } from "@/hooks/useOfflineOperations";
import { Cloud, CloudOff, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface OfflineStatusIndicatorProps {
  className?: string;
  showSyncButton?: boolean;
}

export function OfflineStatusIndicator({ 
  className,
  showSyncButton = true
}: OfflineStatusIndicatorProps) {
  const { isOnline, hasPendingOperations, pendingOperations, forceSync } = useOfflineOperations();
  const { toast } = useToast();

  const handleSyncClick = async () => {
    if (!isOnline) {
      toast({
        title: "No internet connection",
        description: "Please connect to the internet to sync your changes.",
        variant: "destructive",
      });
      return;
    }

    if (!hasPendingOperations) {
      toast({
        title: "No pending changes",
        description: "All your changes are already synced.",
      });
      return;
    }

    try {
      await forceSync();
      toast({
        title: "Sync complete",
        description: "Your changes have been synced successfully.",
      });
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "There was an error syncing your changes. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Don't render anything if online and no pending operations
  if (isOnline && !hasPendingOperations) {
    return null;
  }

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm",
      isOnline ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700",
      className
    )}>
      {isOnline ? (
        <Cloud className="h-4 w-4" />
      ) : (
        <CloudOff className="h-4 w-4" />
      )}
      
      <span>
        {!isOnline ? (
          "You're offline. Changes will sync when you reconnect."
        ) : hasPendingOperations ? (
          `${pendingOperations.length} changes pending sync`
        ) : (
          "All changes synced"
        )}
      </span>
      
      {showSyncButton && hasPendingOperations && isOnline && (
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-2 h-7 bg-white"
          onClick={handleSyncClick}
        >
          Sync now
        </Button>
      )}
    </div>
  );
}
