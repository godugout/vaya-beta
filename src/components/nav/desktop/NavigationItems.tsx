
import { User } from "@supabase/supabase-js";
import { NavButton } from "../NavButton";
import { Home, Mic, Image, Archive, Users } from "lucide-react";

interface NavigationItemsProps {
  user: User | null;
  isSimplifiedView: boolean;
}

export const NavigationItems = ({ user, isSimplifiedView }: NavigationItemsProps) => {
  return (
    <nav className="flex items-center gap-1">
      <NavButton 
        to="/" 
        icon={<Home size={isSimplifiedView ? 20 : 16} />} 
        label="Home" 
        isSimplified={isSimplifiedView}
      />
      <NavButton 
        to="/share-stories" 
        icon={<Mic size={isSimplifiedView ? 20 : 16} />} 
        label="Stories" 
        isSimplified={isSimplifiedView}
      />
      <NavButton 
        to="/memory-lane" 
        icon={<Image size={isSimplifiedView ? 20 : 16} />} 
        label="Memories" 
        isSimplified={isSimplifiedView}
      />
      <NavButton 
        to="/family-capsules" 
        icon={<Archive size={isSimplifiedView ? 20 : 16} />} 
        label="Capsules" 
        isSimplified={isSimplifiedView}
      />
      {user && (
        <NavButton 
          to="/families" 
          icon={<Users size={isSimplifiedView ? 20 : 16} />} 
          label="Family" 
          isSimplified={isSimplifiedView}
        />
      )}
    </nav>
  );
};
