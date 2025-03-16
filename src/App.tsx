
import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from "sonner";
import { ThemeProvider } from 'next-themes';
import { MainLayout } from '@/components/layout/MainLayout';
import './App.css';

// Lazy load pages
const Index = lazy(() => import('@/pages/Index'));
const Auth = lazy(() => import('@/pages/Auth'));
const ComponentsDemo = lazy(() => import('@/pages/ComponentsDemo'));
const DesignSystem = lazy(() => import('@/pages/DesignSystem'));
const Account = lazy(() => import('@/pages/Account'));
const Families = lazy(() => import('@/pages/Families'));
const FamilyDetail = lazy(() => import('@/pages/FamilyDetail'));
const CreateFamily = lazy(() => import('@/pages/CreateFamily'));
const MediaLibrary = lazy(() => import('@/pages/MediaLibrary'));
const FamilyCapsules = lazy(() => import('@/pages/FamilyCapsules'));
const MemoryLane = lazy(() => import('@/pages/MemoryLane'));
const MemoryPost = lazy(() => import('@/pages/MemoryPost'));
const SacredFoundation = lazy(() => import('@/pages/SacredFoundation'));

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
          <Route path="/components" element={<ComponentsDemo />} />
          <Route path="/design/*" element={<DesignSystem />} />
          <Route path="/families" element={<Families />} />
          <Route path="/family/:familyId" element={<FamilyDetail />} />
          <Route path="/create-family" element={<CreateFamily />} />
          <Route path="/media-library" element={<MediaLibrary />} />
          <Route path="/family-capsules" element={<FamilyCapsules />} />
          <Route path="/memory-lane" element={<MemoryLane />} />
          <Route path="/memory/:id" element={<MemoryPost />} />
          <Route path="/sacred-foundation" element={<SacredFoundation />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;
