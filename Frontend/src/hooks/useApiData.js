import { useEffect, useState } from 'react'
import { apiFetch } from '../config/api'

// Fetches CMS content for a public page. Returns `fallback` until the
// request resolves (and keeps it on error), so a slow/unreachable API never
// shows a broken or empty page — matches the "always have a placeholder"
// requirement.
export default function useApiData(path, fallback, { list = false } = {}) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    apiFetch(path)
      .then((res) => {
        if (cancelled) return
        setData(list ? res.data || [] : res.data ?? fallback)
      })
      .catch(() => {
        // keep fallback
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return { data, loading }
}
