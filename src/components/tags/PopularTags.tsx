
import { usePopularTags } from "./hooks/useTagManagement";
import { Badge } from "@/components/ui/badge";
import { Tag as TagIcon } from "lucide-react";

interface PopularTagsProps {
  limit?: number;
  onTagClick?: (tag: string) => void;
}

export const PopularTags = ({ limit = 10, onTagClick }: PopularTagsProps) => {
  const { data: popularTags = [], isLoading } = usePopularTags(limit);

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <TagIcon className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Popular Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Badge key={i} variant="outline" className="bg-muted animate-pulse">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  if (popularTags.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <TagIcon className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">Popular Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {popularTags.map((tag) => (
          <Badge 
            key={tag.tag} 
            variant="outline" 
            className={onTagClick ? "cursor-pointer hover:bg-secondary" : ""}
            onClick={() => onTagClick && onTagClick(tag.tag)}
          >
            {tag.tag}
            {tag.count > 1 && (
              <span className="ml-1 text-xs text-muted-foreground">({tag.count})</span>
            )}
          </Badge>
        ))}
      </div>
    </div>
  );
};
