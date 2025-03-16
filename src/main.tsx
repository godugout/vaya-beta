
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AnimationProvider } from "@/components/animation/AnimationProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import styles
import "./index.css";
import "./styles/utilities/animations.css";
import "./styles/components/cosmic-effects.css";
import "./styles/components/temple-transitions.css";
import "./styles/components/mobile-nav.css";
import "./styles/components/desktop-nav.css";
import "./styles/components/voice-nav.css";
import "./styles/components/transitions.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AnimationProvider>
            <LanguageProvider>
              <App />
              <Toaster />
            </LanguageProvider>
          </AnimationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
