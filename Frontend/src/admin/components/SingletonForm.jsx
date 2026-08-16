import { useEffect, useState } from 'react'
import { authFetch, ApiError } from '../../config/api'
import FieldRenderer from './FieldRenderer'
import { buildSubmission } from './submission'

// Generic edit form for a single-document entity (SiteSettings, Stats,
// HomeContent, ...), driven entirely by a field config.
export default function SingletonForm({ title, apiPath, fields }) {
  const [values, setValues] = useState({})
  const [files, setFiles] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let cancelled = false
    authFetch(apiPath)
      .then((res) => {
        if (!cancelled) setValues(res.data)
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : 'Failed to load'))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [apiPath])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaved(false)
    setSaving(true)
    try {
      const { body } = buildSubmission(fields, values, files)
      const res = await authFetch(apiPath, { method: 'PUT', body })
      setValues(res.data)
      setFiles({})
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-sm text-[#e0ded2]/60">Loading…</div>

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <h2 className="mb-6 font-heading text-xl font-extrabold text-[#e0ded2]">{title}</h2>
      {fields.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          value={values[field.name]}
          onChange={(v) => setValues((prev) => ({ ...prev, [field.name]: v }))}
          onFileSelect={(file) => setFiles((prev) => ({ ...prev, [field.uploadField || field.name]: file }))}
          pendingFile={files[field.uploadField || field.name]}
        />
      ))}
      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-[#2ea3dd] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#1b87bb] disabled:opacity-60"
      >
        {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save changes'}
      </button>
    </form>
  )
}
