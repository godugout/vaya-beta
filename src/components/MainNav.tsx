import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MainNav = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <nav className="flex items-center space-x-6">
      <Link to="/" className="text-2xl font-bold">
        Vaya Memoria
      </Link>
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Family Tree</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md data-[active]:bg-accent data-[state=open]:bg-accent"
                      href="/family-tree"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Family Tree
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Explore your roots and connect with relatives.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink className="group" href="/family-tree/create">
                    Create New
                    <svg
                      className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink className="group" href="/family-tree/manage">
                    Manage Existing
                    <svg
                      className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger>Stories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md data-[active]:bg-accent data-[state=open]:bg-accent"
                      href="/share-stories"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Share Stories
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Record and share your family's precious memories.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink className="group" href="/stories/record">
                    Record New
                    <svg
                      className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink className="group" href="/stories/browse">
                    Browse Existing
                    <svg
                      className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger>Capsules</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md data-[active]:bg-accent data-[state=open]:bg-accent"
                      href="/family-capsules"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Family Capsules
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Create lasting digital memories that can be shared across generations.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink className="group" href="/capsules/create">
                    Create New
                    <svg
                      className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink className="group" href="/capsules/manage">
                    Manage Existing
                    <svg
                      className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full items-center justify-start rounded-md bg-muted p-4 no-underline outline-none focus:shadow-md"
                      href="/pricing"
                    >
                      <div className="mr-2 mt-0.5 rounded-full bg-secondary p-1.5 text-white">
                        {/* Icon */}
                      </div>
                      <div>
                        <div className="text-lg font-medium">Pricing</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          See our subscription plans
                        </p>
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full items-center justify-start rounded-md bg-muted p-4 no-underline outline-none focus:shadow-md"
                      href="/blog"
                    >
                      <div className="mr-2 mt-0.5 rounded-full bg-secondary p-1.5 text-white">
                        {/* Icon */}
                      </div>
                      <div>
                        <div className="text-lg font-medium">Blog</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Read our latest articles
                        </p>
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-slate-100 to-slate-200 p-6 no-underline outline-none focus:shadow-md dark:from-slate-800 dark:to-slate-900"
                      href="/typography-docs"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Typography System
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Explore our comprehensive typography styles, font families, and utility classes.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full overflow-hidden w-9 h-9 border-2 border-muted">
              <Avatar>
                <AvatarImage src={user?.image} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute right-0 mt-2 w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Logout
              <LogOut className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};
