
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Family from "./pages/Family";
import ShareStoriesPage from "./pages/ShareStories";
import SacredVoiceExperience from "./pages/SacredVoiceExperience";
import HanumanEdition from "./pages/HanumanEdition";
import CreateFamily from "./pages/CreateFamily";
import Memories from "./pages/Memories"; // Add import

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/family/:id",
    element: <Family />,
  },
  {
    path: "/share-stories",
    element: <ShareStoriesPage />,
  },
  {
    path: "/sacred-voice-experience",
    element: <SacredVoiceExperience />,
  },
  {
    path: "/hanuman",
    element: <HanumanEdition />,
  },
  {
    path: "/create-family",
    element: <CreateFamily />,
  },
  {
    path: "/memories", // Add route
    element: <Memories />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
