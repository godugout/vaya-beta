
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/contexts/ThemeContext"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { AnimationProvider } from "@/components/animation/AnimationProvider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <AnimationProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </AnimationProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
