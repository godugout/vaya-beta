
import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const SearchInput = ({
  placeholder = "Search...",
  value: externalValue,
  onChange,
  onSearch,
  className,
  autoFocus = false,
  disabled = false,
}: SearchInputProps) => {
  const [value, setValue] = useState(externalValue || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
    }
  }, [externalValue]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setValue("");
    onChange?.("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn("relative", className)}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          <Search className="h-4 w-4" />
        </div>
        
        <Input
          ref={inputRef}
          type="search"
          className="pl-10 pr-10 py-2 rounded-xl h-12"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
        
        {value && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={handleClear}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};
