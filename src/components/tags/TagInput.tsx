
import { useState, useEffect } from "react";
import { useTagSearch } from "./hooks/useTagManagement";
import { useTagSuggestions } from "./hooks/useTagSuggestions";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus, X, Tag as TagIcon } from "lucide-react";

interface TagInputProps {
  contentType: 'story' | 'memory' | 'photo' | 'capsule';
  contentId: string;
  title: string;
  description?: string;
  existingTags: Array<{ id: string; tag: string }>;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tagId: string) => void;
}

export const TagInput = ({
  contentType,
  contentId,
  title,
  description,
  existingTags,
  onAddTag,
  onRemoveTag,
}: TagInputProps) => {
  const [open, setOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  
  // Get tag search results
  const { data: searchResults = [] } = useTagSearch(tagInput);
  
  // Get tag suggestions based on content
  const { data: suggestions = [] } = useTagSuggestions(contentType, title, description);
  
  // Filter out suggestions that are already applied
  const filteredSuggestions = suggestions.filter(
    suggestion => !existingTags.some(tag => tag.tag.toLowerCase() === suggestion.tag.toLowerCase())
  );

  const handleAddTag = (tag: string) => {
    if (tag && !existingTags.some(t => t.tag.toLowerCase() === tag.toLowerCase())) {
      onAddTag(tag);
      setTagInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      handleAddTag(tagInput);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 mb-2">
        {existingTags.map((tag) => (
          <Badge key={tag.id} variant="outline" className="group">
            {tag.tag}
            <button
              className="ml-1 rounded-full outline-none focus:ring-2 group-hover:opacity-100 opacity-70"
              onClick={() => onRemoveTag(tag.id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <TagIcon className="mr-2 h-4 w-4" />
              {existingTags.length > 0 ? "Add another tag" : "Add a tag"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-72" align="start">
            <Command>
              <CommandInput 
                placeholder="Search or create tag..."
                value={tagInput}
                onValueChange={setTagInput}
                onKeyDown={handleKeyDown}
              />
              <CommandList>
                <CommandEmpty>
                  {tagInput ? (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-muted-foreground"
                      onClick={() => handleAddTag(tagInput)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create "{tagInput}"
                    </Button>
                  ) : (
                    "No tags found."
                  )}
                </CommandEmpty>
                
                {searchResults.length > 0 && (
                  <CommandGroup heading="Existing Tags">
                    {searchResults.map((result, index) => (
                      <CommandItem 
                        key={`search-${index}`}
                        onSelect={() => {
                          handleAddTag(result.tag);
                          setOpen(false);
                        }}
                      >
                        <TagIcon className="mr-2 h-4 w-4" />
                        {result.tag}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                
                {filteredSuggestions.length > 0 && (
                  <CommandGroup heading="Suggested Tags">
                    {filteredSuggestions.map((suggestion, index) => (
                      <CommandItem 
                        key={`suggestion-${index}`}
                        onSelect={() => {
                          handleAddTag(suggestion.tag);
                          setOpen(false);
                        }}
                      >
                        <TagIcon className="mr-2 h-4 w-4" />
                        {suggestion.tag}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
