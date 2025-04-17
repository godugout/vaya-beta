import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Gift, Archive, Clock, Unlock, Lock } from "lucide-react";

interface Capsule {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  reveal_date: string | null;
  status: 'upcoming' | 'active' | 'locked' | 'revealed';
  creator: {
    id: string;
    name: string;
  } | null;
  family: {
    id: string;
    name: string;
  } | null;
  item_count: number;
}

interface FamilyCapsuleListProps {
  familyId?: string;
  limit?: number;
  className?: string;
}

const FamilyCapsuleList = ({ familyId, limit = 6, className = "" }: FamilyCapsuleListProps) => {
  const navigate = useNavigate();
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
            profiles!creator_id(id, full_name),
            families!family_id(id, name),
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
            creator: capsule.profiles ? {
              id: capsule.profiles.id,
              name: capsule.profiles.full_name
            } : null,
            family: capsule.families ? {
              id: capsule.families.id,
              name: capsule.families.name
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

  const navigateToCapsule = (capsuleId: string) => {
    navigate(`/capsule/${capsuleId}`);
  };

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
    return (
      <div className={`space-y-4 ${className}`}>
        <h2 className="text-2xl font-semibold mb-4">Family Capsules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
              </CardHeader>
              <CardContent className="pb-2 space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="h-10 w-full bg-gray-200 rounded" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Family Capsules</h2>
        <Button 
          variant="outline" 
          onClick={() => navigate('/family-capsules')}
        >
          View All
        </Button>
      </div>
      
      {capsules.length === 0 ? (
        <div className="text-center py-12 bg-card dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-2">No capsules found</h3>
          <p className="text-muted-foreground mb-6">
            Create your first memory capsule to preserve special moments
          </p>
          <Button onClick={() => navigate('/create-capsule')}>
            Create Your First Capsule
          </Button>
        </div>
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
