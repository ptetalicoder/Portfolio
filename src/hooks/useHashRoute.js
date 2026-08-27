import { useEffect, useState } from 'react'

// Case study routes use a leading slash (#/case/<slug>) specifically so they
// can't collide with the site's plain #section-id anchors used for scroll-spy.
function parseCaseSlug(hash) {
  const match = hash.match(/^#\/case\/([a-z0-9-]+)$/i)
  return match ? match[1] : null
}

export function useHashRoute() {
  const [caseSlug, setCaseSlug] = useState(() => parseCaseSlug(window.location.hash))

  useEffect(() => {
    const onHashChange = () => setCaseSlug(parseCaseSlug(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return caseSlug
}
