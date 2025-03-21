
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/contexts/ThemeContext"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { AnimationProvider } from "@/components/animation/AnimationProvider"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <AnimationProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AnimationProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
