import { Routes, Route } from 'react-router-dom';
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
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/memory-lane" element={<MemoryLane />} />
        <Route path="/share-stories" element={<ShareStories />} />
        <Route path="/family-capsules" element={<FamilyCapsules />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/families" element={<Families />} />
        <Route path="/setup-admin" element={<SetupAdmin />} />
        <Route path="/create-family" element={<CreateFamily />} />
        <Route path="/components-demo" element={<ComponentsDemo />} />
        <Route path="/components" element={<ComponentsShowcase />} />
        <Route path="/wedding-mode" element={<WeddingModeShowcase />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
