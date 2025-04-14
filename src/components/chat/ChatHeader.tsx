
import { Link } from 'react-router-dom';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">Family Memory Chat</h2>
          <p className="text-xs text-muted-foreground">Preserving stories that matter</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <MoreVertical className="h-5 w-5" />
      </Button>
    </div>
  );
};
