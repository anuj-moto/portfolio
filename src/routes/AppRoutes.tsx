import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from '@/pages/Landing'
import { SectionLayout } from '@/layouts/SectionLayout'

// Landing is the entry (eager). Every section page is code-split and loads
// behind the wipe, so the initial bundle stays lean (case-study copy + GSAP
// only arrive when you actually open the work).
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ExperiencePage = lazy(() => import('@/pages/ExperiencePage'))
const CaseStudiesPage = lazy(() => import('@/pages/CaseStudiesPage'))
const SkillsPage = lazy(() => import('@/pages/SkillsPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const CaseStudy = lazy(() => import('@/pages/CaseStudy'))

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<SectionLayout />}>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/work" element={<CaseStudiesPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
