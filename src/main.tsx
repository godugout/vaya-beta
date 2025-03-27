
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/contexts/ThemeContext"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { AnimationProvider } from "@/components/animation/AnimationProvider"
import { SoftThemeProvider } from "@/contexts/SoftThemeContext"
import { PremiumThemeProvider } from "@/contexts/PremiumThemeContext"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { VoiceInteractionProvider } from '@/contexts/VoiceInteractionContext'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SoftThemeProvider>
        <PremiumThemeProvider>
          <LanguageProvider>
            <AnimationProvider>
              <VoiceInteractionProvider>
                <QueryClientProvider client={queryClient}>
                  <App />
                </QueryClientProvider>
              </VoiceInteractionProvider>
            </AnimationProvider>
          </LanguageProvider>
        </PremiumThemeProvider>
      </SoftThemeProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
