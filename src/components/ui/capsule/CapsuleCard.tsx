import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CapsuleCardProps {
  title: string;
  link: string;
  icon: LucideIcon;
  colorKey: string;
  metadata?: {
    creatorAvatar?: string;
    creatorInitials: string;
    itemCount: number;
    status: "upcoming" | "active" | "locked" | "revealed";
    date: string;
  };
}

export const CapsuleCard = ({
  title,
  icon: Icon,
  colorKey,
  metadata,
}: CapsuleCardProps) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-sm border border-vaya-gray-200 p-4 hover:shadow-md transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className={cn(
          "p-2 rounded-lg",
          "bg-vaya-accent-green",
          "text-vaya-capsules"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-vaya-gray-900 mb-1">
            {title}
          </h3>
          {metadata && (
            <div className="flex items-center space-x-2 text-sm text-vaya-gray-500">
              <div className="flex items-center space-x-1">
                <span>{metadata.itemCount} items</span>
                <span>•</span>
                <span>{metadata.date}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};