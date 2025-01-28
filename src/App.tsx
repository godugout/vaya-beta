import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainNav } from "./components/MainNav";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MemoryLane from "./pages/MemoryLane";
import Account from "./pages/Account";
import FamilyCapsules from "./pages/FamilyCapsules";
import ShareStories from "./pages/ShareStories";
import WildlifeCapsule from "./pages/capsules/WildlifeCapsule";
import MemoryPost from "./pages/MemoryPost";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <MainNav />
              <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/memory-lane" element={<MemoryLane />} />
                  <Route path="/memory/:id" element={<MemoryPost />} />
                  <Route path="/share-stories" element={<ShareStories />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/family-capsules" element={<FamilyCapsules />} />
                  <Route path="/capsule/wildlife" element={<WildlifeCapsule />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
