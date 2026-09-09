import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useWipe } from './TransitionProvider'

interface WipeLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
  children: ReactNode
}

/**
 * A real <Link> (focusable, crawlable, degrades to normal nav) that plays the
 * line-wipe before navigating. Modifier-clicks still open in a new tab.
 */
export function WipeLink({ to, children, onClick, ...rest }: WipeLinkProps) {
  const { wipeTo } = useWipe()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return
    }
    e.preventDefault()
    wipeTo(to)
  }

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
