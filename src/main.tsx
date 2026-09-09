import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AllWork from './pages/AllWork.tsx'
import CaseStudy from './pages/CaseStudy.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work" element={<AllWork />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
