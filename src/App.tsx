import { Routes, Route, Navigate } from 'react-router-dom';
import { MainNav } from './components/MainNav';
import Index from './pages/Index';
import Auth from './pages/Auth';
import MemoryLane from './pages/MemoryLane';
import ShareStories from './pages/ShareStories';
import FamilyCapsules from './pages/FamilyCapsules';
import Profile from './pages/Profile';
import Account from './pages/Account';
import Families from './pages/Families';
import SetupAdmin from './pages/SetupAdmin';
import CreateFamily from './pages/CreateFamily';
import ComponentsDemo from './pages/ComponentsDemo';
import ComponentsShowcase from './pages/ComponentsShowcase';
import WeddingModeShowcase from './components/wedding-mode/WeddingModeShowcase';
import DesignSystem from './pages/DesignSystem';
import TypographyDocs from './pages/TypographyDocs';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/design-system/*" element={<DesignSystem />} />
        <Route path="/typography-docs" element={<TypographyDocs />} />
        
        <Route path="/" element={
          <>
            <MainNav />
            <Index />
          </>
        } />
        
        <Route path="/memory-lane" element={
          <>
            <MainNav />
            <div className="page-content">
              <MemoryLane />
            </div>
          </>
        } />
        <Route path="/share-stories" element={
          <>
            <MainNav />
            <div className="page-content">
              <ShareStories />
            </div>
          </>
        } />
        <Route path="/family-capsules" element={
          <>
            <MainNav />
            <div className="page-content">
              <FamilyCapsules />
            </div>
          </>
        } />
        <Route path="/profile" element={
          <>
            <MainNav />
            <div className="page-content">
              <Profile />
            </div>
          </>
        } />
        <Route path="/account" element={
          <>
            <MainNav />
            <div className="page-content">
              <Account />
            </div>
          </>
        } />
        <Route path="/families" element={
          <>
            <MainNav />
            <div className="page-content">
              <Families />
            </div>
          </>
        } />
        <Route path="/setup-admin" element={
          <>
            <MainNav />
            <div className="page-content">
              <SetupAdmin />
            </div>
          </>
        } />
        <Route path="/create-family" element={
          <>
            <MainNav />
            <div className="page-content">
              <CreateFamily />
            </div>
          </>
        } />
        <Route path="/components-demo" element={
          <>
            <MainNav />
            <div className="page-content">
              <ComponentsDemo />
            </div>
          </>
        } />
        <Route path="/components" element={
          <>
            <MainNav />
            <div className="page-content">
              <ComponentsShowcase />
            </div>
          </>
        } />
        <Route path="/wedding-mode" element={
          <>
            <MainNav />
            <div className="page-content">
              <WeddingModeShowcase />
            </div>
          </>
        } />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
