
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import "./App.css";
import "./styles/globals.css"; // Import our custom global styles

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider>
          <Router>
            <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-dark-background-DEFAULT">
              {/* Fixed background patterns */}
              <div className="fixed inset-0 bg-grid-pattern opacity-40 z-patterns"></div>
              <div className="fixed inset-0 bg-wave-pattern opacity-10 z-patterns"></div>
              
              <MainNav />
              <main className="flex-1 relative z-content">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/memory-lane" element={<MemoryLane />} />
                  <Route path="/share-stories" element={<ShareStories />} />
                  <Route path="/family-capsules" element={<FamilyCapsules />} />
                  <Route path="/families" element={<Families />} />
                  <Route path="/create-family" element={<CreateFamily />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster />
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
