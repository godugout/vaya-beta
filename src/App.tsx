import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { SiteHeader } from './components/header/site-header';
import { SiteFooter } from './components/footer/site-footer';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './integrations/supabase/client';
import { Account } from './components/account/Account';
import { Home } from './pages/Home';
import { Memories } from './pages/Memories';
import { Family } from './pages/Family';
import { InviteMember } from './pages/InviteMember';
import { OnboardingController } from './components/onboarding/OnboardingController';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { MemoryLane } from './pages/MemoryLane';
import { Story } from './pages/Story';
import { DualPaneRecordingSection } from './components/stories/DualPaneRecordingSection';
import { FamilySetup } from './pages/FamilySetup';
import FamilyTreeBuilder from './components/family/tree/FamilyTreeBuilder';
import { getTable } from './integrations/supabase/client';
import { Database } from './types/supabase';
import { Toast } from './components/ui/use-toast';

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
    <ThemeProvider defaultTheme="system" storageKey="vite-react-supabase-theme">
      <Router>
        <SiteHeader session={session} />
        <main className="container relative mx-auto md:px-6 py-12 grow">
          <Routes>
            <Route path="/" element={<Home session={session} />} />
            <Route path="/auth" element={
              <div className="w-full h-full flex justify-center items-center">
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  providers={['google', 'github']}
                />
              </div>
            } />
            <Route path="/account" element={<Account session={session} />} />
            <Route path="/memories" element={<Memories session={session} />} />
            <Route path="/family/:familyId" element={<Family session={session} />} />
            <Route path="/invite-member/:familyId" element={<InviteMember session={session} />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/memory-lane" element={<MemoryLane />} />
            <Route path="/story/:storyId" element={<Story />} />
            <Route path="/family-setup" element={<FamilySetup />} />
            <Route path="/tree/:familyId" element={<FamilyTreeBuilder familyId="your_family_id" />} />
            <Route path="/stories" element={<DualPaneRecordingSection />} />

            {/* Route to the new FamilySetupPage */}
            <Route path="/setup" element={<FamilySetupPage />} />
          </Routes>
        </main>
        <SiteFooter />
      </Router>
      <OnboardingController />
      <Toast/>
    </ThemeProvider>
  );
}

export default App;
