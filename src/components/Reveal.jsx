import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. Falls back to visible immediately if IntersectionObserver is missing.
 *
 * Starts visible so prerendered/no-JS output shows real content instead of
 * sitting at opacity:0 forever — a useLayoutEffect (not useEffect) flips it
 * back to hidden before the browser's first paint, so JS-enabled visitors
 * still get the exact same reveal-on-scroll experience as before; the
 * correction happens before anything is painted, so nothing flashes, and
 * server/first-hydration-render stay identical (no mismatch warning).
 */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(true)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    setVisible(false)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
