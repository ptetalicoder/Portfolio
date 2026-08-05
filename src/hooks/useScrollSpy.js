import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently occupying the reading area.
 * Uses a band across the upper-middle of the viewport so a heading counts as
 * "active" once it settles under the sticky header.
 */
export function useScrollSpy(ids, offset = 96) {
  const [activeId, setActiveId] = useState(ids[0] ?? null)

  useEffect(() => {
    const onScroll = () => {
      const line = window.scrollY + offset + 24
      let current = ids[0]

      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= line) current = id
      }

      // At the very bottom the last section may be too short to reach the
      // line, so pin it explicitly.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
      if (atBottom) current = ids[ids.length - 1]

      setActiveId(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, offset])

  return activeId
}
