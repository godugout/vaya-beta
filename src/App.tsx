
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainNav } from '@/components/MainNav';
import LandingPage from '@/pages/LandingPage';
import NotFound from '@/pages/NotFound';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Meteor from '@/pages/Meteor';

// Using lazy loading for better performance
const FamilyCapsules = lazy(() => import('@/pages/FamilyCapsules'));
const ShareStories = lazy(() => import('@/pages/ShareStories'));
const MemoryLane = lazy(() => import('@/pages/MemoryLane'));
const Families = lazy(() => import('@/pages/Families'));
const Settings = lazy(() => import('@/pages/Settings'));
const FamilyDetail = lazy(() => import('@/pages/FamilyDetail'));
const Authentication = lazy(() => import('@/pages/Authentication'));
const Profile = lazy(() => import('@/pages/Profile'));
const Account = lazy(() => import('@/pages/Account'));
const DesignSystem = lazy(() => import('@/pages/DesignSystem'));
const MediaLibrary = lazy(() => import('@/pages/MediaLibrary'));
const ComponentsDemo = lazy(() => import('@/pages/ComponentsDemo'));

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-grow mt-16">
        <ErrorBoundary>
          <Suspense fallback={<div className="flex items-center justify-center w-full h-96">Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/meteor" element={<Meteor />} />
              <Route path="/family-capsules" element={<FamilyCapsules />} />
              <Route path="/share-stories" element={<ShareStories />} />
              <Route path="/memory-lane" element={<MemoryLane />} />
              <Route path="/families" element={<Families />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/family/:id" element={<FamilyDetail />} />
              <Route path="/auth" element={<Authentication />} />
              <Route path="/account" element={<Account />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/design-system/*" element={<DesignSystem />} />
              <Route path="/media-library" element={<MediaLibrary />} />
              <Route path="/components-demo" element={<ComponentsDemo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default App;
