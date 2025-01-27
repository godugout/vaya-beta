import { useState, useEffect } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface BrandGuideline {
  id: string;
  name: string;
  value: string;
  description: string;
}

const StyleEditor = () => {
  const [brandColors, setBrandColors] = useState<BrandGuideline[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchBrandGuidelines();
  }, []);

  const fetchBrandGuidelines = async () => {
    const { data: guidelines, error } = await supabase
      .from('brand_guidelines')
      .select('*')
      .eq('category', 'color');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load brand guidelines",
        variant: "destructive",
      });
      return;
    }

    setBrandColors(guidelines || []);
  };

  const updateBrandColor = async (id: string, newValue: string) => {
    const { error } = await supabase
      .from('brand_guidelines')
      .update({ value: newValue })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update brand color",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Brand color updated successfully",
    });

    fetchBrandGuidelines();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full shadow-lg bg-white hover:bg-gray-50"
          >
            <Palette className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px]">
          <SheetHeader>
            <SheetTitle>Brand Colors</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {brandColors.map((color) => (
              <div key={color.id} className="flex items-center gap-4">
                <label className="flex-1 text-sm font-medium">
                  {color.name}
                  {color.description && (
                    <span className="block text-xs text-gray-500">
                      {color.description}
                    </span>
                  )}
                </label>
                <input
                  type="color"
                  value={color.value}
                  onChange={(e) => updateBrandColor(color.id, e.target.value)}
                  className="h-8 w-14 cursor-pointer rounded border p-1"
                />
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default StyleEditor;