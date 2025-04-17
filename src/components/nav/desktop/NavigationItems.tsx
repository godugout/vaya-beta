
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Image, 
  BookOpen, 
  Package, 
  Users, 
  Clock,
  Music, 
  Calendar
} from "lucide-react";

export const NavigationItems = () => {
  const navItems = [
    { to: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { to: "/memory-lane", label: "Memory Lane", icon: <Music className="h-5 w-5" /> },
    { to: "/share-stories", label: "Stories", icon: <BookOpen className="h-5 w-5" /> },
    { to: "/family-capsules", label: "Capsules", icon: <Package className="h-5 w-5" /> },
    { to: "/families", label: "Families", icon: <Users className="h-5 w-5" /> },
    { to: "/timeline", label: "Timeline", icon: <Clock className="h-5 w-5" /> },
  ];

  return (
    <nav className="mt-6 space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-md transition-colors ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`
          }
          end={item.to === "/"}
        >
          <span className="mr-3">{item.icon}</span>
          <span className="text-sm font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
