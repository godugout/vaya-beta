
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCapsule } from "@/components/capsule/useCapsules";
import { LoadingIndicator } from "@/components/animation/LoadingIndicator";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Lock, Unlock, Package } from "lucide-react";
import { format } from "date-fns";
import { ContentAssociations } from "@/components/associations/ContentAssociations";
import { AddContentAssociation } from "@/components/associations/AddContentAssociation";

export const CapsuleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useCapsule(id);
  
  const capsule = data?.pages[0]?.capsule;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingIndicator size="lg" />
      </div>
    );
  }

  if (!capsule) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-medium mb-2">Capsule Not Found</h2>
        <p className="text-gray-600">The capsule you're looking for could not be found.</p>
      </div>
    );
  }

  const isLocked = capsule.status === 'locked';
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    active: "bg-green-100 text-green-800",
    locked: "bg-amber-100 text-amber-800",
    revealed: "bg-purple-100 text-purple-800"
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{capsule.title}</CardTitle>
          <Badge className={statusColors[capsule.status]}>
            {capsule.status.charAt(0).toUpperCase() + capsule.status.slice(1)}
          </Badge>
        </CardHeader>
        <CardContent>
          {capsule.description && (
            <p className="text-gray-700 mb-6">{capsule.description}</p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarDays className="h-4 w-4" />
              <span>Created on {format(new Date(capsule.created_at), "MMMM d, yyyy")}</span>
            </div>
            
            {capsule.reveal_date && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  {isLocked ? "Unlocks" : "Unlocked"} on {format(new Date(capsule.reveal_date), "MMMM d, yyyy")}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <AddContentAssociation
              sourceType="capsule"
              sourceId={capsule.id}
              sourceTitle={capsule.title}
              buttonLabel="Link Content"
            />
          </div>
        </CardContent>
      </Card>
      
      <ContentAssociations 
        contentType="capsule" 
        contentId={capsule.id}
        title="Related Content" 
      />
    </div>
  );
};
