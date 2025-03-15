
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface NavButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isSimplified: boolean;
}

export const NavButton = ({ to, icon, label, isSimplified }: NavButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
        "hover:bg-autumn/10 dark:hover:bg-leaf/10",
        isActive 
          ? "bg-autumn/10 dark:bg-leaf/10 text-autumn dark:text-leaf" 
          : "text-black dark:text-white"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={cn(
        "transition-colors",
        isActive ? "text-autumn dark:text-leaf" : "text-muted-foreground"
      )}>
        {icon}
      </span>
      {!isSimplified && <span className="font-medium">{label}</span>}
    </Link>
  );
};
