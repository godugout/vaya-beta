
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { MainNav } from "./components/MainNav";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import MemoryLane from "./pages/MemoryLane";
import ShareStories from "./pages/ShareStories";
import FamilyCapsules from "./pages/FamilyCapsules";
import Families from "./pages/Families";
import CreateFamily from "./pages/CreateFamily";
import Auth from "./pages/Auth";
import SetupAdmin from "./pages/SetupAdmin";
import ComponentsShowcase from "./pages/ComponentsShowcase";
import * as React from "react";
import "./index.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// RouteObserver component to set data-route attribute
function RouteObserver({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  // Extract the route name from the path
  const getRouteName = (path: string): string => {
    if (path === '/') return 'index';
    const routeName = path.split('/')[1];
    return routeName || 'index';
  };
  
  React.useEffect(() => {
    const routeName = getRouteName(location.pathname);
    document.documentElement.setAttribute('data-route', routeName);
  }, [location]);
  
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LanguageProvider>
          <Router>
            <RouteObserver>
              <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
                <MainNav />
                <main className="flex-1 relative z-10">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/memory-lane" element={<MemoryLane />} />
                    <Route path="/share-stories" element={<ShareStories />} />
                    <Route path="/family-capsules" element={<FamilyCapsules />} />
                    <Route path="/families" element={<Families />} />
                    <Route path="/create-family" element={<CreateFamily />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/setup-admin" element={<SetupAdmin />} />
                    <Route path="/components" element={<ComponentsShowcase />} />
                  </Routes>
                </main>
                <Footer />
              </div>
              <Toaster />
            </RouteObserver>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
