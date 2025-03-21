
import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { supabase } from './integrations/supabase/client';
import { toast } from "./hooks/use-toast";
import { MainLayout } from './components/layout/MainLayout';

// Import pages
import Home from "./pages/Home";
import FamilySetupPage from "./pages/FamilySetupPage";
import Memories from './pages/Memories';
import Account from './pages/Account';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import HanumanEdition from './pages/HanumanEdition';
import HouseOfHanuman from './pages/HouseOfHanuman';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a query client
const queryClient = new QueryClient();

function App() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

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
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/family/:familyId" element={<div>Family Page</div>} />
          <Route path="/invite-member/:familyId" element={<div>Invite Member Page</div>} />
          <Route path="/terms" element={<div>Terms of Service</div>} />
          <Route path="/privacy" element={<div>Privacy Policy</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/memory-lane" element={<div>Memory Lane Page</div>} />
          <Route path="/story/:storyId" element={<div>Story Page</div>} />
          <Route path="/family-setup" element={<div>Family Setup Page</div>} />
          <Route path="/tree/:familyId" element={<div>Family Tree Builder</div>} />
          <Route path="/stories" element={<div>Stories Page</div>} />
          <Route path="/setup" element={<FamilySetupPage />} />
          <Route path="/hanuman-edition" element={<HanumanEdition />} />
          <Route path="/houseofhanuman" element={<HouseOfHanuman />} />
        </Routes>
      </MainLayout>
    </QueryClientProvider>
  );
}

export default App;
