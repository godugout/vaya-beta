import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Gift, Archive, Clock, Unlock, Lock } from "lucide-react";
import { CapsuleListSkeleton } from "./capsule-list/CapsuleListSkeleton";
import { EmptyCapsuleState } from "./capsule-list/EmptyCapsuleState";
import { CapsuleListHeader } from "./capsule-list/CapsuleListHeader";

interface FamilyCapsuleListProps {
  familyId?: string;
  limit?: number;
  className?: string;
}

const FamilyCapsuleList = ({ familyId, limit = 6, className = "" }: FamilyCapsuleListProps) => {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCapsules = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('capsules')
          .select(`
            id, 
            title, 
            description, 
            created_at, 
            reveal_date,
            status,
            creator_id,
            family_id,
            profiles(id, full_name),
            families(id, name),
            capsule_items(count)
          `)
          .order('created_at', { ascending: false });

        if (familyId) {
          query = query.eq('family_id', familyId);
        }
        
        if (limit) {
          query = query.limit(limit);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data) {
          const formattedCapsules = data.map(capsule => ({
            id: capsule.id,
            title: capsule.title,
            description: capsule.description,
            created_at: capsule.created_at,
            reveal_date: capsule.reveal_date,
            status: capsule.status,
            creator: capsule.profiles?.[0] ? {
              id: capsule.profiles[0].id,
              name: capsule.profiles[0].full_name
            } : null,
            family: capsule.families?.[0] ? {
              id: capsule.families[0].id,
              name: capsule.families[0].name
            } : null,
            item_count: capsule.capsule_items?.[0]?.count || 0
          }));
          
          setCapsules(formattedCapsules);
        }
      } catch (error) {
        console.error('Error fetching capsules:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCapsules();
  }, [familyId, limit]);

  const getCapsuleStatusInfo = (status: Capsule['status'], revealDate: string | null) => {
    switch(status) {
      case 'upcoming':
        return {
          icon: <Calendar className="h-5 w-5 text-blue-500" />,
          label: 'Upcoming',
          badgeColor: 'bg-blue-100 text-blue-800'
        };
      case 'active':
        return {
          icon: <Gift className="h-5 w-5 text-green-500" />,
          label: 'Active',
          badgeColor: 'bg-green-100 text-green-800'
        };
      case 'locked':
        return {
          icon: <Lock className="h-5 w-5 text-amber-500" />,
          label: 'Locked',
          badgeColor: 'bg-amber-100 text-amber-800'
        };
      case 'revealed':
        return {
          icon: <Unlock className="h-5 w-5 text-purple-500" />,
          label: 'Revealed',
          badgeColor: 'bg-purple-100 text-purple-800'
        };
      default:
        return {
          icon: <Archive className="h-5 w-5 text-gray-500" />,
          label: 'Unknown',
          badgeColor: 'bg-gray-100 text-gray-800'
        };
    }
  };

  if (isLoading) {
    return <CapsuleListSkeleton />;
  }

  return (
    <div className={className}>
      <CapsuleListHeader />
      
      {capsules.length === 0 ? (
        <EmptyCapsuleState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capsules.map(capsule => {
            const statusInfo = getCapsuleStatusInfo(capsule.status, capsule.reveal_date);
            
            return (
              <motion.div
                key={capsule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => navigateToCapsule(capsule.id)}
              >
                <Card className="h-full hover:shadow-md transition-shadow duration-200 border-2 hover:border-forest/30">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{capsule.title}</CardTitle>
                      <Badge className={statusInfo.badgeColor}>
                        {statusInfo.label}
                      </Badge>
                    </div>
                    {capsule.family && (
                      <CardDescription>
                        {capsule.family.name}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="pb-4">
                    {capsule.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {capsule.description}
                      </p>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Created {format(new Date(capsule.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                      
                      {capsule.reveal_date && (
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>
                            Opens {format(new Date(capsule.reveal_date), "MMM d, yyyy")}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full gap-2">
                      {statusInfo.icon}
                      <span>
                        {capsule.status === 'revealed' ? 'View Contents' : 
                         capsule.status === 'locked' && new Date(capsule.reveal_date || '') <= new Date() ? 'Unlock Now' :
                         'View Details'}
                      </span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FamilyCapsuleList;
