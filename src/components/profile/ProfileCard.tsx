
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarDays, Mail, MapPin, FileSpreadsheet, Clock, Heart } from "lucide-react";
import { UserProfile } from "./types";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  profile: UserProfile;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  const initials = profile.full_name
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  const isWeddingGuest = profile.birthdate !== null; // Simple assumption for demo purposes

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group">
      <CardHeader className={cn(
        "bg-gradient-to-r p-4",
        isWeddingGuest 
          ? "from-[#D4AF37] to-[#F3D6E4]" // Wedding gold to rose colors for wedding guests
          : "from-autumn to-leaf" // Default colors for others
      )}>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white ring-2 ring-white/20 transition-all duration-300 group-hover:ring-4">
            <AvatarImage src={profile.avatar_url || ""} alt={profile.full_name} />
            <AvatarFallback className={cn(
              "text-white text-xl",
              isWeddingGuest ? "bg-[#91A8D0]" : "bg-ui-teal"
            )}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-white">
            <h3 className="font-semibold text-xl">{profile.full_name}</h3>
            <div className="flex items-center gap-2 mt-1">
              {isWeddingGuest && (
                <Badge variant="outline" className="bg-white/30 text-white border-white/30">
                  <Heart className="h-3 w-3 mr-1 fill-white" />
                  Wedding Guest
                </Badge>
              )}
              {profile.data_source && (
                <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                  {profile.data_source}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        {profile.birthdate && (
          <div className="flex items-start gap-3">
            <CalendarDays className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Birthdate</p>
              <p>{format(new Date(profile.birthdate), "PPP")}</p>
            </div>
          </div>
        )}
        
        {profile.email && (
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Email</p>
              <p>{profile.email}</p>
            </div>
          </div>
        )}
        
        {profile.home_address && (
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Address</p>
              <p>{profile.home_address}</p>
            </div>
          </div>
        )}
        
        {(profile.data_source || profile.imported_at) && (
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Source Information</p>
            
            {profile.data_source && (
              <div className="flex items-center gap-2 mb-2">
                <FileSpreadsheet className="h-4 w-4 text-gray-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Source: {profile.data_source}
                </p>
              </div>
            )}
            
            {profile.imported_at && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Imported on: {format(new Date(profile.imported_at), "PPP")}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
