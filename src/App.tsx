
import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { supabase } from './integrations/supabase/client';
import { toast } from "./hooks/use-toast";
import { MainLayout } from './components/layout/MainLayout';
import { AdminDiagnosticPanel } from './components/admin/AdminDiagnosticPanel';
import { AdminDiagnosticTrigger } from './components/admin/AdminDiagnosticTrigger';
import { useAdminDiagnostics } from './hooks/useAdminDiagnostics';

// Import pages
import Home from "./pages/Home";
import FamilySetupPage from "./pages/FamilySetupPage";
import Memories from './pages/Memories';
import Account from './pages/Account';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import HanumanEdition from './pages/HanumanEdition';
import HouseOfHanuman from './pages/HouseOfHanuman';
import DesignSystem from './pages/DesignSystem';
import NotFound from './pages/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a query client
const queryClient = new QueryClient();

function App() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const { isOpen, openPanel, closePanel, togglePanel } = useAdminDiagnostics();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-wrapper bg-white text-black dark:bg-black dark:text-white min-h-screen">
        <AdminDiagnosticPanel isOpen={isOpen} onClose={closePanel} />
        <AdminDiagnosticTrigger onClick={openPanel} />
      
        <Routes>
          {/* Design System Routes */}
          <Route path="/design-system/*" element={<DesignSystem />} />
          
          {/* Main App Routes */}
          <Route path="/" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />
          <Route path="/auth" element={
            <MainLayout>
              <Auth />
            </MainLayout>
          } />
          <Route path="/account" element={
            <MainLayout>
              <Account />
            </MainLayout>
          } />
          <Route path="/memories" element={
            <MainLayout>
              <Memories />
            </MainLayout>
          } />
          <Route path="/settings" element={
            <MainLayout>
              <Settings />
            </MainLayout>
          } />
          <Route path="/family/:familyId" element={
            <MainLayout>
              <div>Family Page</div>
            </MainLayout>
          } />
          <Route path="/invite-member/:familyId" element={
            <MainLayout>
              <div>Invite Member Page</div>
            </MainLayout>
          } />
          <Route path="/terms" element={
            <MainLayout>
              <div>Terms of Service</div>
            </MainLayout>
          } />
          <Route path="/privacy" element={
            <MainLayout>
              <div>Privacy Policy</div>
            </MainLayout>
          } />
          <Route path="/contact" element={
            <MainLayout>
              <div>Contact Page</div>
            </MainLayout>
          } />
          <Route path="/about" element={
            <MainLayout>
              <div>About Page</div>
            </MainLayout>
          } />
          <Route path="/memory-lane" element={
            <MainLayout>
              <div>Memory Lane Page</div>
            </MainLayout>
          } />
          <Route path="/story/:storyId" element={
            <MainLayout>
              <div>Story Page</div>
            </MainLayout>
          } />
          <Route path="/family-setup" element={
            <MainLayout>
              <div>Family Setup Page</div>
            </MainLayout>
          } />
          <Route path="/tree/:familyId" element={
            <MainLayout>
              <div>Family Tree Builder</div>
            </MainLayout>
          } />
          <Route path="/stories" element={
            <MainLayout>
              <div>Stories Page</div>
            </MainLayout>
          } />
          <Route path="/setup" element={
            <MainLayout>
              <FamilySetupPage />
            </MainLayout>
          } />
          <Route path="/hanuman-edition" element={
            <MainLayout>
              <HanumanEdition />
            </MainLayout>
          } />
          <Route path="/houseofhanuman" element={
            <MainLayout>
              <HouseOfHanuman />
            </MainLayout>
          } />
          
          {/* 404 route */}
          <Route path="*" element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          } />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
