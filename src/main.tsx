import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './test.css'
import Index from './test'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Index />
  </StrictMode>,
)
