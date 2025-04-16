
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
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbNavProps {
  isSimplifiedView?: boolean;
}

export const BreadcrumbNav = ({ isSimplifiedView = false }: BreadcrumbNavProps) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Don't render breadcrumbs on home page
  if (path === '/') return null;
  
  const pathSegments = path.split('/').filter(Boolean);
  if (pathSegments.length === 0) return null;
  
  return (
    <div className="mt-2 pt-1">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">
                <Home className={cn("h-4 w-4", isSimplifiedView && "h-5 w-5")} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const formattedSegment = segment
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            
            const segmentPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
            
            return (
              <React.Fragment key={segment}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className={cn(
                      "font-medium",
                      isSimplifiedView && "text-base"
                    )}>
                      {formattedSegment}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild
                      className={cn(
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
