
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Family from "./pages/Family";
import ShareStoriesPage from "./pages/ShareStories";
import SacredVoiceExperience from "./pages/SacredVoiceExperience";
import HanumanEdition from "./pages/HanumanEdition";
import CreateFamily from "./pages/CreateFamily";
import Memories from "./pages/Memories";
import { AppLayout } from "./components/layout/AppLayout";

// Create the router with AppLayout as the root wrapper
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "family/:id",
        element: <Family />,
      },
      {
        path: "share-stories",
        element: <ShareStoriesPage />,
      },
      {
        path: "sacred-voice-experience",
        element: <SacredVoiceExperience />,
      },
      {
        path: "hanuman",
        element: <HanumanEdition />,
      },
      {
        path: "create-family",
        element: <CreateFamily />,
      },
      {
        path: "memories",
        element: <Memories />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
