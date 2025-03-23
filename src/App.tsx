import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { LoadingIndicator } from '@/components/animation/LoadingIndicator';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AnimationProvider } from '@/components/animation/AnimationProvider';

// Lazy load components to improve initial load time
const Home = lazy(() => import('@/pages/Home'));
const Auth = lazy(() => import('@/pages/Auth'));
const Families = lazy(() => import('@/pages/Families'));
const CreateFamily = lazy(() => import('@/pages/CreateFamily'));
const FamilyDetail = lazy(() => import('@/pages/FamilyDetail'));
const MediaLibrary = lazy(() => import('@/pages/MediaLibrary'));
const MediaLibraryEnhanced = lazy(() => import('@/pages/MediaLibraryEnhanced'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const HanumanEdition = lazy(() => import('@/pages/HanumanEdition'));
const MemoryLane = lazy(() => import('@/pages/MemoryLane'));
const MemoryPost = lazy(() => import('@/pages/MemoryPost'));
const ShareStories = lazy(() => import('@/pages/ShareStories'));
const Profile = lazy(() => import('@/pages/Profile'));
const Settings = lazy(() => import('@/pages/Settings'));
const StoryShowcase = lazy(() => import('@/components/design-system/StoryShowcase'));
const ComponentsShowcase = lazy(() => import('@/components/design-system/ComponentsShowcase').then(module => ({ default: module.ComponentsShowcase })));
const DesignSystem = lazy(() => import('@/pages/DesignSystem'));

const Admin = lazy(() => import('@/pages/Admin'));
const AdminUsers = lazy(() => import('@/pages/AdminUsers'));
const AdminMedia = lazy(() => import('@/pages/AdminMedia'));

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AnimationProvider>
          <div className="app dark">
            <ErrorBoundary>
              <Suspense fallback={<LoadingIndicator />}>
                <Routes>
                  <Route path="/" element={<MainLayout><Outlet /></MainLayout>}>
                    <Route index element={<Home />} />
                    <Route path="auth" element={<Auth />} />
                    <Route path="families" element={<Families />} />
                    <Route path="create-family" element={<CreateFamily />} />
                    <Route path="family/:familyId" element={<FamilyDetail />} />
                    <Route path="media" element={<MediaLibrary />} />
                    <Route path="media-enhanced" element={<MediaLibraryEnhanced />} />
                    <Route path="hanuman" element={<HanumanEdition />} />
                    <Route path="memories" element={<MemoryLane />} />
                    <Route path="memories/:memoryId" element={<MemoryPost />} />
                    <Route path="stories" element={<ShareStories />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="story-showcase" element={<StoryShowcase />} />
                    <Route path="components" element={<ComponentsShowcase />} />
                    <Route path="design" element={<DesignSystem />} />
                    <Route path="admin" element={<Admin />}>
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="media" element={<AdminMedia />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </Suspense>
            </ErrorBoundary>
            <Toaster position="top-center" />
          </div>
        </AnimationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
