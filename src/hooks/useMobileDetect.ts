import { useState, useEffect } from 'react'

interface MobileDetectResult {
  isMobile: boolean
  isLowEnd: boolean
}

export function useMobileDetect(): MobileDetectResult {
  const [result, setResult] = useState<MobileDetectResult>(() => {
    if (typeof window === 'undefined') return { isMobile: false, isLowEnd: false }
    const isMobile = window.innerWidth < 768 || !window.matchMedia('(hover: hover)').matches
    const isLowEnd = (navigator.hardwareConcurrency ?? 8) < 4
    return { isMobile, isLowEnd }
  })

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768 || !window.matchMedia('(hover: hover)').matches
      const isLowEnd = (navigator.hardwareConcurrency ?? 8) < 4
      setResult({ isMobile, isLowEnd })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return result
}
