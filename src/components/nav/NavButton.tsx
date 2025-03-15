
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
        "hover:bg-black/5 dark:hover:bg-white/10",
        isActive && "bg-black/5 dark:bg-white/10 text-forest dark:text-leaf",
        !isActive && "text-gray-700 dark:text-gray-300"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={cn(
        "transition-all",
        isActive ? "text-autumn" : "text-muted-foreground"
      )}>
        {icon}
      </span>
      {!isSimplified && <span className="font-medium">{label}</span>}
    </Link>
  );
};
