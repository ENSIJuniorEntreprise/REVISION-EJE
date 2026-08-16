export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '')

const TOKEN_KEY = 'eje_admin_token'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  const isJson = res.headers.get('content-type')?.includes('application/json')
  const body = isJson ? await res.json().catch(() => null) : null

  if (!res.ok) {
    throw new ApiError(body?.message || `Request failed (${res.status})`, res.status)
  }

  return body
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

// Same as apiFetch, but attaches the admin's Bearer token — used for every
// authenticated admin-panel request.
export async function authFetch(path, options = {}) {
  const token = getToken()
  return apiFetch(path, {
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
}

// Media paths come in three shapes: a full external URL, a backend upload
// (/uploads/..., which needs the API's own origin), or a frontend-static
// asset (/assets/..., already correct relative to the current page). Only
// the middle case needs adjusting.
export function resolveMediaUrl(pathOrUrl) {
  if (!pathOrUrl) return ''
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl
  if (pathOrUrl.startsWith('/uploads')) return `${API_ORIGIN}${pathOrUrl}`
  return pathOrUrl
}
