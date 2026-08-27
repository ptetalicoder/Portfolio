import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

export function useTheme() {
  // Always 'light' for the very first render, in every environment —
  // server (no `document` at all) and the client's first hydration pass
  // must produce identical output or React warns about a mismatch. The
  // layout effect below corrects to the real value synchronously before
  // the browser paints, so nothing actually flashes: index.html's inline
  // script already applied the real class pre-paint, this just brings
  // React's own state in sync with it before that first frame is drawn.
  const [theme, setTheme] = useState('light')

  useLayoutEffect(() => {
    const real = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    setTheme(real)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Private browsing / storage disabled — the toggle still works for the session.
    }
  }, [theme])

  // Follow the OS only while the visitor has not made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      let stored = null
      try {
        stored = localStorage.getItem(STORAGE_KEY)
      } catch {
        // ignore
      }
      if (!stored) setTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return { theme, toggle }
}
