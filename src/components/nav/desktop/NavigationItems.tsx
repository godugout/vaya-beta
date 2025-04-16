
import { User } from "@supabase/supabase-js";
import { NavButton } from "../NavButton";
import { Home, Mic, Image, Archive, Users } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavigationItemsProps {
  user: User | null;
  isSimplifiedView: boolean;
}

export const NavigationItems = ({ user, isSimplifiedView }: NavigationItemsProps) => {
  return (
    <nav className={cn(
      "hidden md:flex items-center gap-1",
      isSimplifiedView && "gap-2"
    )}>
      <NavigationMenu>
        <NavigationMenuList className="gap-1">
          <NavigationMenuItem>
            <NavButton 
              to="/" 
              icon={<Home size={isSimplifiedView ? 20 : 16} />} 
              label="Home" 
              isSimplified={isSimplifiedView}
            />
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavButton 
              to="/share-stories" 
              icon={<Mic size={isSimplifiedView ? 20 : 16} />} 
              label="Stories" 
              isSimplified={isSimplifiedView}
            />
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavButton 
              to="/memory-lane" 
              icon={<Image size={isSimplifiedView ? 20 : 16} />} 
              label="Memories" 
              isSimplified={isSimplifiedView}
            />
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavButton 
              to="/family-capsules" 
              icon={<Archive size={isSimplifiedView ? 20 : 16} />} 
              label="Capsules" 
              isSimplified={isSimplifiedView}
            />
          </NavigationMenuItem>
          
          {user && (
            <NavigationMenuItem>
              <NavButton 
                to="/families" 
                icon={<Users size={isSimplifiedView ? 20 : 16} />} 
                label="Family" 
                isSimplified={isSimplifiedView}
              />
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
