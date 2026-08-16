import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth, ApiError } from './AuthContext'

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1f212d] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl"
      >
        <h1 className="mb-1 font-heading text-2xl font-extrabold text-[#e0ded2]">Admin sign in</h1>
        <p className="mb-6 text-sm text-[#e0ded2]/60">Manage the ENSI Junior Entreprise website content.</p>

        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#e0ded2]/60">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          className="mb-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-[#e0ded2] outline-none focus:border-[#2ea3dd]"
        />

        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#e0ded2]/60">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-6 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-[#e0ded2] outline-none focus:border-[#2ea3dd]"
        />

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-[#2ea3dd] py-2.5 text-sm font-bold text-white transition hover:bg-[#1b87bb] disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
