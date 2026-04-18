import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './Router'
import { AuthProvider } from './context/AuthContext'
import './App.css'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <AppRouter/>
    </AuthProvider>
  </StrictMode>,
)
