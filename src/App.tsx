import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useProfile } from './contexts/ProfileContext';
import { MainLayout } from '@/components/layout/MainLayout';
import LandingPage from '@/pages/LandingPage';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';
import Profile from '@/pages/Profile';
import EditProfile from '@/pages/EditProfile';
import Profiles from '@/pages/Profiles';
import Memories from '@/pages/Memories';
import Families from '@/pages/Families';
import CreateFamily from '@/pages/CreateFamily';
import ShareStoriesPage from '@/pages/ShareStories';
import Sacred from '@/pages/Sacred';
import HanumanEdition from '@/pages/HanumanEdition';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/edit-profile',
    element: <EditProfile />,
  },
  {
    path: '/profiles',
    element: <Profiles />,
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
    path: '/sacred',
    element: <Sacred />,
  },
  {
    path: '/hanuman',
    element: <HanumanEdition />,
  },
]);

function App() {
  const { authLoading } = useAuth();
  const { profileLoading } = useProfile();

  // Show loading indicator while auth state is being determined
  if (authLoading || profileLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </MainLayout>
    );
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
