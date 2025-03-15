
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FamilyMemberCardProps {
  id: string;
  name: string;
  avatar?: string;
  relation: string;
  bio?: string;
  isLoved?: boolean;
  className?: string;
  onMessage?: () => void;
  onCall?: () => void;
  onToggleLove?: () => void;
}

export const FamilyMemberCard = ({
  id,
  name,
  avatar,
  relation,
  bio,
  isLoved = false,
  className,
  onMessage,
  onCall,
  onToggleLove,
}: FamilyMemberCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={className}
    >
      <Card className="overflow-hidden rounded-xl hover:shadow-md transition-all duration-300">
        <CardContent className="p-5">
          <div className="flex gap-4">
            <Avatar className="h-16 w-16 border-2 border-gray-100">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="bg-vaya-secondary text-white text-lg">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <p className="text-sm text-gray-500">{relation}</p>
                </div>
                
                {onToggleLove && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      "rounded-full h-8 w-8",
                      isLoved && "text-red-500"
                    )}
                    onClick={onToggleLove}
                  >
                    <Heart 
                      className={cn(
                        "h-5 w-5",
                        isLoved && "fill-current"
                      )} 
                    />
                  </Button>
                )}
              </div>
              
              {bio && <p className="mt-2 text-sm text-gray-600 line-clamp-2">{bio}</p>}
              
              <div className="flex gap-2 mt-3">
                {onMessage && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full"
                    onClick={onMessage}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                )}
                
                {onCall && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full"
                    onClick={onCall}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
