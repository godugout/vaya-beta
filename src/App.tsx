
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AppRouter } from '@/components/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <AppRouter />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
