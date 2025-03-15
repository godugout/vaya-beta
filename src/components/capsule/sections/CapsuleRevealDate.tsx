
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CapsuleRevealDateProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export const CapsuleRevealDate = ({
  selectedDate,
  onDateChange,
}: CapsuleRevealDateProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Reveal Date</h3>
      <p className="text-sm text-gray-500">Select when this capsule should be available to open.</p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal w-full sm:w-[240px]",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateChange}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4 mr-2" />
          {selectedDate 
            ? `Time until reveal: ${Math.ceil((selectedDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days`
            : "Please select a date"
          }
        </div>
      </div>
    </div>
  );
};
