
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface FamilyMember {
  id: string;
  user_id: string;
  role: string;
  profiles: {
    full_name: string;
    avatar_url: string | null;
  } | null;
}

interface FamilyMembersTabProps {
  members: FamilyMember[];
  familyId: string;
  isAdmin: boolean;
}

export function FamilyMembersTab({ members, familyId, isAdmin }: FamilyMembersTabProps) {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Family Members</span>
          {isAdmin && (
            <Button 
              size="sm" 
              onClick={() => navigate(`/invite-member/${familyId}`)}
            >
              Invite Member
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <div 
              key={member.id} 
              className="p-4 border rounded-lg flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {member.profiles?.avatar_url ? (
                  <img 
                    src={member.profiles.avatar_url}
                    alt={member.profiles.full_name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span>{member.profiles?.full_name?.charAt(0) || '?'}</span>
                )}
              </div>
              <div>
                <div className="font-medium">
                  {member.profiles?.full_name || 'Unknown User'}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
