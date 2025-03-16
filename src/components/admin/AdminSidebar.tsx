
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  Settings, 
  Database, 
  ShieldCheck, 
  Image, 
  LayoutDashboard,
  FileText,
  Headphones,
  CalendarDays,
  MessageSquare,
  FolderTree,
  BookCopy
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminNavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

function AdminNavItem({ to, icon: Icon, label, isActive }: AdminNavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  );
}

export function AdminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/families", icon: FolderTree, label: "Families" },
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/permissions", icon: ShieldCheck, label: "Permissions" },
    { to: "/admin/media", icon: Image, label: "Media Library" },
    { to: "/admin/stories", icon: BookCopy, label: "Stories" },
    { to: "/admin/capsules", icon: CalendarDays, label: "Capsules" },
    { to: "/admin/recordings", icon: Headphones, label: "Recordings" },
    { to: "/admin/documents", icon: FileText, label: "Documents" },
    { to: "/admin/messages", icon: MessageSquare, label: "Messages" },
    { to: "/admin/database", icon: Database, label: "Database" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 border-r shrink-0 h-[calc(100vh-64px)] bg-card">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Admin Portal</h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <AdminNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={
                item.to === "/admin" 
                  ? currentPath === "/admin" 
                  : currentPath.startsWith(item.to)
              }
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
