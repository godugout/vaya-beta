
import React from 'react';
import { useOfflineOperations } from '@/hooks/useOfflineOperations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { Wifi, WifiOff, RefreshCw, Check } from 'lucide-react';

interface OfflineStatusIndicatorProps {
  className?: string;
  showBadge?: boolean;
  showSyncButton?: boolean;
}

export const OfflineStatusIndicator: React.FC<OfflineStatusIndicatorProps> = ({
  className = '',
  showBadge = true,
  showSyncButton = true
}) => {
  const { status, syncNow, isOnline, hasPendingOperations, isSyncing } = useOfflineOperations();
  
  // If online with no pending operations, optionally show nothing
  if (isOnline && !hasPendingOperations && !showBadge) {
    return null;
  }
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showBadge && (
        <Tooltip content={isOnline ? "Connected" : "Offline"}>
          <Badge 
            variant={isOnline ? "default" : "destructive"} 
            className="px-2 py-1 flex items-center gap-1"
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5" />
                <span className="text-xs">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span className="text-xs">Offline</span>
              </>
            )}
          </Badge>
        </Tooltip>
      )}
      
      {hasPendingOperations && (
        <Tooltip content="Pending changes to be synchronized">
          <Badge 
            variant="outline" 
            className="px-2 py-1 flex items-center gap-1 border-amber-400 text-amber-600"
          >
            <span className="text-xs">{status.pendingOperations} pending</span>
          </Badge>
        </Tooltip>
      )}
      
      {showSyncButton && hasPendingOperations && isOnline && (
        <Button
          variant="outline"
          size="sm"
          onClick={syncNow}
          disabled={isSyncing || !isOnline}
          className="h-8 flex items-center gap-1"
        >
          {isSyncing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Syncing...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Now</span>
            </>
          )}
        </Button>
      )}
      
      {!hasPendingOperations && isOnline && showBadge && (
        <Tooltip content="All changes are synchronized">
          <Badge 
            variant="outline" 
            className="px-2 py-1 flex items-center gap-1 border-green-400 text-green-600"
          >
            <Check className="w-3.5 h-3.5" />
            <span className="text-xs">Synced</span>
          </Badge>
        </Tooltip>
      )}
    </div>
  );
};
