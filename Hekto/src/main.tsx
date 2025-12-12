import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import HomePage from "./Components/HomePage";
import AppRouter from './Router'
import './App.css'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter/>
  </StrictMode>,
)
