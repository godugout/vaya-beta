
import { useState, useEffect } from "react";

/**
 * Custom hook for responsive design using media queries
 * @param query CSS media query string
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with null to avoid hydration mismatch
  const [matches, setMatches] = useState<boolean>(false);
  
  useEffect(() => {
    // Initialize to current match state
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);
    
    // Create event listener for changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    } 
    // Legacy browsers
    else {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);
  
  return matches;
}

/**
 * Common breakpoint helpers
 */
export const useBreakpoints = () => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isLargeDesktop = useMediaQuery("(min-width: 1280px)");
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    // Is at least this size
    isAtLeastTablet: isTablet || isDesktop || isLargeDesktop,
    isAtLeastDesktop: isDesktop || isLargeDesktop,
    // Current active breakpoint
    current: isMobile 
      ? "mobile" 
      : isTablet 
        ? "tablet" 
        : isLargeDesktop 
          ? "largeDesktop" 
          : "desktop"
  };
};
