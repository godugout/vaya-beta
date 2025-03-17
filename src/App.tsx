
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { supabase } from './integrations/supabase/client';
import { toast } from "./hooks/use-toast";
import { Toaster } from "./components/ui/toaster";
import { getTable } from './integrations/supabase/client';

// Add the import for the new FamilySetupPage
import FamilySetupPage from "./pages/FamilySetupPage";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <main className="container relative mx-auto md:px-6 py-12 grow">
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/auth" element={
            <div className="w-full h-full flex justify-center items-center">
              <p>Authentication Page</p>
            </div>
          } />
          <Route path="/account" element={<div>Account Page</div>} />
          <Route path="/memories" element={<div>Memories Page</div>} />
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

          {/* Route to the new FamilySetupPage */}
          <Route path="/setup" element={<FamilySetupPage />} />
        </Routes>
      </main>
      <Toaster />
    </Router>
  );
}

export default App;
