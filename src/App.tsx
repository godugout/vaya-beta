
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import LandingPage from '@/pages/LandingPage';
import Memories from '@/pages/Memories';
import Families from '@/pages/Families';
import CreateFamily from '@/pages/CreateFamily';
import ShareStoriesPage from '@/pages/ShareStories';
import HanumanEdition from '@/pages/HanumanEdition';
import Auth from '@/pages/Auth';

// Create a simplified router with only available pages
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/memories',
    element: <Memories />,
  },
  {
    path: '/families',
    element: <Families />,
  },
  {
    path: '/create-family',
    element: <CreateFamily />,
  },
  {
    path: '/stories',
    element: <ShareStoriesPage />,
  },
  {
    path: '/hanuman',
    element: <HanumanEdition />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
