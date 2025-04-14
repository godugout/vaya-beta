
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ChatPage } from '@/pages/ChatPage';
import { StoriesPage } from '@/pages/StoriesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/stories" element={<StoriesPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
