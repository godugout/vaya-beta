
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
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Create a simplified router with only available pages
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/auth',
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/memories',
    element: <Memories />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/families',
    element: <Families />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/create-family',
    element: <CreateFamily />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/stories',
    element: <ShareStoriesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/hanuman',
    element: <HanumanEdition />,
    errorElement: <ErrorPage />,
  },
]);

// Custom error page component for route errors
function ErrorPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-hanuman-orange/20 shadow-lg">
          <h1 className="text-2xl font-bold text-hanuman-gold mb-4">
            Something went wrong
          </h1>
          <p className="text-white/80 mb-6">
            We apologize for the inconvenience. The page you're looking for might be unavailable or there was an error in loading it.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-hanuman-orange/80 hover:bg-hanuman-orange text-white rounded-lg transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    </MainLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
