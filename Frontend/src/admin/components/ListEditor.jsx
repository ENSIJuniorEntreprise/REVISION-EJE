import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus, ArrowUp, ArrowDown, X } from 'lucide-react'
import { authFetch, resolveMediaUrl, ApiError } from '../../config/api'
import FieldRenderer from './FieldRenderer'
import { buildSubmission, emptyValuesFor } from './submission'

// Generic table + add/edit/delete/reorder UI for a repeatable-list entity
// (BoardMember, Partner, Event, ...), driven entirely by a field config.
export default function ListEditor({
  title,
  apiPath,
  fields,
  thumbnailField,
  titleField,
  subtitleField,
  reorderable = true,
  listQuery = '',
}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // null | 'new' | item
  const [formValues, setFormValues] = useState({})
  const [formFiles, setFormFiles] = useState({})
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const load = () => {
    setLoading(true)
    return authFetch(`${apiPath}${listQuery}`)
      .then((res) => setItems(res.data))
      .catch((err) => setError(err instanceof ApiError ? err.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiPath])

  const startAdd = () => {
    setFormValues(emptyValuesFor(fields))
    setFormFiles({})
    setFormError('')
    setEditing('new')
  }

  const startEdit = (item) => {
    setFormValues(item)
    setFormFiles({})
    setFormError('')
    setEditing(item)
  }

  const cancelEdit = () => {
    setEditing(null)
    setFormValues({})
    setFormFiles({})
    setFormError('')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setFormError('')
    try {
      const { body } = buildSubmission(fields, formValues, formFiles)
      if (editing === 'new') {
        await authFetch(apiPath, { method: 'POST', body })
      } else {
        await authFetch(`${apiPath}/${editing._id}`, { method: 'PUT', body })
      }
      await load()
      cancelEdit()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item[titleField] || 'this item'}"? This cannot be undone.`)) return
    try {
      await authFetch(`${apiPath}/${item._id}`, { method: 'DELETE' })
      await load()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Delete failed')
    }
  }

  const move = async (index, direction) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= items.length) return
    const reordered = [...items]
    ;[reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]]
    setItems(reordered)
    try {
      await authFetch(`${apiPath}/reorder/all`, {
        method: 'PUT',
        body: JSON.stringify({ order: reordered.map((i) => i._id) }),
      })
    } catch {
      await load() // revert to server state on failure
    }
  }

  if (loading) return <div className="text-sm text-[#e0ded2]/60">Loading…</div>

  if (editing) {
    return (
      <div className="max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-xl font-extrabold text-[#e0ded2]">
            {editing === 'new' ? `Add ${title}` : `Edit ${title}`}
          </h2>
          <button onClick={cancelEdit} className="text-[#e0ded2]/50 hover:text-[#e0ded2]">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSave}>
          {fields.map((field) => (
            <FieldRenderer
              key={field.name}
              field={field}
              value={formValues[field.name]}
              onChange={(v) => setFormValues((prev) => ({ ...prev, [field.name]: v }))}
              onFileSelect={(file) => setFormFiles((prev) => ({ ...prev, [field.uploadField || field.name]: file }))}
              pendingFile={formFiles[field.uploadField || field.name]}
            />
          ))}
          {formError && <p className="mb-4 text-sm text-red-400">{formError}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#2ea3dd] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#1b87bb] disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border border-white/15 px-6 py-2.5 text-sm font-semibold text-[#e0ded2]/70 transition hover:border-white/30"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-xl font-extrabold text-[#e0ded2]">{title}</h2>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 rounded-lg bg-[#2ea3dd] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1b87bb]"
        >
          <Plus className="h-4 w-4" />
          Add {title}
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      {items.length === 0 ? (
        <p className="text-sm text-[#e0ded2]/50">Nothing here yet. Click "Add {title}" to create the first one.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <div
              key={item._id}
              className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
            >
              {thumbnailField && item[thumbnailField] && (
                <img
                  src={resolveMediaUrl(item[thumbnailField])}
                  alt=""
                  className="h-10 w-10 flex-shrink-0 rounded object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-[#e0ded2]">{item[titleField]}</div>
                {subtitleField && item[subtitleField] && (
                  <div className="truncate text-xs text-[#e0ded2]/50">{item[subtitleField]}</div>
                )}
              </div>
              <div className="flex flex-shrink-0 items-center gap-1">
                {reorderable && (
                  <>
                    <button
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      className="rounded p-1.5 text-[#e0ded2]/50 hover:bg-white/10 hover:text-[#e0ded2] disabled:opacity-20"
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => move(index, 1)}
                      disabled={index === items.length - 1}
                      className="rounded p-1.5 text-[#e0ded2]/50 hover:bg-white/10 hover:text-[#e0ded2] disabled:opacity-20"
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => startEdit(item)}
                  className="rounded p-1.5 text-[#e0ded2]/50 hover:bg-white/10 hover:text-[#2ea3dd]"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="rounded p-1.5 text-[#e0ded2]/50 hover:bg-white/10 hover:text-red-400"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
