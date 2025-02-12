import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function CreateFamily() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert the family
      const { data: familyData, error: familyError } = await supabase
        .from('vaya_families')
        .insert([
          { name, description }
        ])
        .select()
        .single();

      if (familyError) throw familyError;

      // Add the creator as an admin
      const { error: memberError } = await supabase
        .from('vaya_family_members')
        .insert([
          { 
            family_id: familyData.id,
            user_id: (await supabase.auth.getUser()).data.user?.id,
            role: 'admin'
          }
        ]);

      if (memberError) throw memberError;

      toast({
        title: "Family created",
        description: "Your family has been created successfully.",
      });

      navigate("/families");
    } catch (error: any) {
      toast({
        title: "Error creating family",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Family</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Family Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter family name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter family description (optional)"
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/families")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Family"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
