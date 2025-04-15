
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster";
import { AnimationProvider } from '@/components/animation/AnimationProvider'
import { ThemeProvider } from 'next-themes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <AnimationProvider>
          <App />
          <Toaster />
        </AnimationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
