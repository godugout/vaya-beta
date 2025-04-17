
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronsRight, X, Package, BookOpen, 
  Image, MessageSquare, Users
} from "lucide-react";
import { ContentType, RelationshipType } from './types';
import { useContentAssociations } from './useContentAssociations';
import { Skeleton } from "@/components/ui/skeleton";

interface ContentAssociationsProps {
  contentType: ContentType;
  contentId: string;
  title?: string;
}

export const ContentAssociations = ({ 
  contentType, 
  contentId,
  title = "Related Content" 
}: ContentAssociationsProps) => {
  const { fetchAssociationsForContent, deleteAssociation } = useContentAssociations();
  const { 
    data, 
    isLoading, 
    hasNextPage, 
    fetchNextPage, 
    isFetchingNextPage 
  } = fetchAssociationsForContent(contentType, contentId);
  
  const associations = data?.pages.flatMap(page => page.associations) || [];

  const getContentIcon = (type: ContentType) => {
    switch (type) {
      case 'capsule': return <Package className="h-4 w-4" />;
      case 'story': return <BookOpen className="h-4 w-4" />;
      case 'memory': return <MessageSquare className="h-4 w-4" />;
      case 'media': return <Image className="h-4 w-4" />;
      case 'family_member': return <Users className="h-4 w-4" />;
      default: return null;
    }
  };

  const getRelationshipLabel = (type: RelationshipType, customRel?: string) => {
    if (type === 'custom' && customRel) return customRel;
    
    switch (type) {
      case 'contains': return 'Contains';
      case 'references': return 'References';
      case 'inspiredBy': return 'Inspired by';
      case 'continuation': return 'Continues';
      case 'response': return 'Response to';
      case 'features': return 'Features';
      case 'related': return 'Related to';
      default: return 'Related';
    }
  };

  const getContentTitle = (association: any) => {
    // Determine if this content is the source or target in the association
    const isSource = association.source_type === contentType && association.source_id === contentId;
    const relatedType = isSource ? association.target_type : association.source_type;
    const relatedId = isSource ? association.target_id : association.source_id;
    
    // This is a placeholder - in a real implementation, we would fetch the title
    // based on the content type and ID from the appropriate table
    return `${relatedType.charAt(0).toUpperCase() + relatedType.slice(1)} ${relatedId.substring(0, 8)}...`;
  };

  const handleDelete = (associationId: string) => {
    if (confirm("Are you sure you want to remove this relationship?")) {
      deleteAssociation.mutate(associationId);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (associations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">
            <p>No related content found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {associations.map((association) => {
          const isSource = association.source_type === contentType && association.source_id === contentId;
          const relatedType = isSource ? association.target_type : association.source_type;
          
          return (
            <div 
              key={association.id} 
              className="flex items-center justify-between p-3 rounded-md border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getContentIcon(relatedType)}
                <div>
                  <div className="font-medium">{getContentTitle(association)}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    {isSource ? 'This' : relatedType}
                    <ChevronsRight className="h-3 w-3" />
                    {getRelationshipLabel(association.relationship_type as RelationshipType, association.custom_relationship)}
                    <ChevronsRight className="h-3 w-3" />
                    {isSource ? relatedType : 'this'}
                  </div>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleDelete(association.id)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
        
        {hasNextPage && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more..." : "Load more"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
