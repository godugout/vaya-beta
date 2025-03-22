
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Loading fallback
import { LoadingIndicator } from '@/components/animation/LoadingIndicator';

// Eagerly loaded components for critical paths
import { MainLayout } from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';

// Lazily loaded components
const Families = lazy(() => import('@/pages/Families'));
const FamilyDetail = lazy(() => import('@/pages/FamilyDetail'));
const CreateFamily = lazy(() => import('@/pages/CreateFamily'));
const MediaLibrary = lazy(() => import('@/pages/MediaLibrary'));
const HanumanEdition = lazy(() => import('@/pages/HanumanEdition'));
const Profile = lazy(() => import('@/pages/Profile'));
const Settings = lazy(() => import('@/pages/Settings'));
const StoryShowcase = lazy(() => import('@/components/design-system/StoryShowcase'));
const ComponentsShowcase = lazy(() => import('@/components/design-system/ComponentsShowcase').then(m => ({ default: m })));
const DesignSystem = lazy(() => import('@/pages/DesignSystem'));

// Admin components are a good candidate for code splitting
const Admin = lazy(() => import('@/pages/Admin'));
const AdminUsers = lazy(() => import('@/pages/AdminUsers'));
const AdminFamilies = lazy(() => import('@/pages/AdminFamilies'));
const AdminMedia = lazy(() => import('@/pages/AdminMedia'));
const AdminPermissions = lazy(() => import('@/pages/AdminPermissions'));

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider>
      <div className={`app-container ${theme}`}>
        <ErrorBoundary>
          <Suspense fallback={<LoadingIndicator />}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="auth" element={<Auth />} />
                <Route path="families" element={<Families />} />
                <Route path="families/new" element={<CreateFamily />} />
                <Route path="families/:id" element={<FamilyDetail />} />
                <Route path="media" element={<MediaLibrary />} />
                <Route path="hanuman" element={<HanumanEdition />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="components" element={<ComponentsShowcase />} />
                <Route path="design-system" element={<DesignSystem />} />
                <Route path="stories" element={<StoryShowcase />} />
                
                {/* Admin routes */}
                <Route path="admin" element={<Admin />}>
                  <Route index element={<Navigate to="users" replace />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="families" element={<AdminFamilies />} />
                  <Route path="media" element={<AdminMedia />} />
                  <Route path="permissions" element={<AdminPermissions />} />
                </Route>
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Toaster richColors />
      </div>
    </ThemeProvider>
  );
}

export default App;
