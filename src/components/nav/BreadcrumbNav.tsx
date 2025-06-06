
import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbNavProps {
  isSimplifiedView?: boolean;
  isMinimized?: boolean;
}

export const BreadcrumbNav = ({ isSimplifiedView = false, isMinimized = false }: BreadcrumbNavProps) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Don't render breadcrumbs on home page
  if (path === '/') return null;
  
  const pathSegments = path.split('/').filter(Boolean);
  if (pathSegments.length === 0) return null;
  
  return (
    <div className={cn(
      "container mx-auto px-4 py-1",
      isMinimized ? "py-0 mt-0" : "py-1 mt-0",
      isSimplifiedView && "text-base"
    )}>
      <Breadcrumb>
        <BreadcrumbList className="text-muted-foreground">
          {!isMinimized && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center hover:text-foreground transition-colors">
                    <Home className={cn("h-4 w-4", isSimplifiedView && "h-5 w-5")} />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            </>
          )}
          
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const formattedSegment = segment
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            
            const segmentPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
            
            return (
              <React.Fragment key={segment}>
                {index > 0 && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className={cn(
                      "font-medium text-foreground",
                      isSimplifiedView && "text-base"
                    )}>
                      {formattedSegment}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild
                      className={cn(
                        "hover:text-foreground transition-colors",
                        isSimplifiedView && "text-base"
                      )}
                    >
                      <Link to={segmentPath}>
                        {formattedSegment}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
