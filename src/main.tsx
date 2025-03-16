
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimationProvider } from '@/components/animation/AnimationProvider'
import { WeddingModeProvider } from '@/components/wedding-mode/WeddingModeProvider'

// Create a client with configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <AnimationProvider>
              <WeddingModeProvider>
                <App />
              </WeddingModeProvider>
            </AnimationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
