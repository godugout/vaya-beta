
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AppRouter } from '@/components/AppRouter';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="hanuman-theme">
        <AppRouter />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
