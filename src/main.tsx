import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import './index.css'
import AppRoutes from './routes/AppRoutes'
import { TransitionProvider } from './components/transition/TransitionProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <TransitionProvider>
          <AppRoutes />
        </TransitionProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
)
