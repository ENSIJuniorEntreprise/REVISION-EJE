import { useRef, useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { authFetch, resolveMediaUrl, ApiError } from '../../config/api'

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-[#e0ded2] outline-none transition focus:border-[#2ea3dd]'
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#e0ded2]/60'

function Field({ label, required, children, hint }) {
  return (
    <div className="mb-4">
      <label className={labelClass}>
        {label}
        {required && <span className="text-[#2ea3dd]"> *</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-[#e0ded2]/40">{hint}</p>}
    </div>
  )
}

function ImagePreview({ url, onRemove, small }) {
  if (!url) return null
  return (
    <div className="relative mb-2 inline-block">
      <img
        src={resolveMediaUrl(url)}
        alt=""
        className={small ? 'h-16 w-16 rounded-lg object-cover' : 'h-28 w-28 rounded-lg object-cover'}
      />
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}

// One field, driven by a config entry: { name, label, type, ... }.
// `value` is the current value; `onChange(newValue)` updates it.
// `onFileSelect(file)` is called for 'image'/'pdf' fields when a new file is
// picked (the actual upload happens on form submit via FormData).
export default function FieldRenderer({ field, value, onChange, onFileSelect, pendingFile }) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef(null)

  switch (field.type) {
    case 'text':
      return (
        <Field label={field.label} required={field.required}>
          <input
            type="text"
            className={inputClass}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
          />
        </Field>
      )

    case 'textarea':
      return (
        <Field label={field.label} required={field.required}>
          <textarea
            className={`${inputClass} min-h-[90px] resize-y`}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
          />
        </Field>
      )

    case 'number':
      return (
        <Field label={field.label} required={field.required}>
          <input
            type="number"
            className={inputClass}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
            required={field.required}
          />
        </Field>
      )

    case 'date':
      return (
        <Field label={field.label} required={field.required}>
          <input
            type="date"
            className={inputClass}
            value={value ? value.slice(0, 10) : ''}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
          />
        </Field>
      )

    case 'select':
      return (
        <Field label={field.label} required={field.required}>
          <select
            className={inputClass}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      )

    case 'checkbox':
      return (
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id={field.name}
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 accent-[#2ea3dd]"
          />
          <label htmlFor={field.name} className="text-sm text-[#e0ded2]">
            {field.label}
          </label>
        </div>
      )

    case 'image':
    case 'pdf': {
      const isImage = field.type === 'image'
      return (
        <Field label={field.label} required={field.required} hint={pendingFile ? `Selected: ${pendingFile.name}` : null}>
          {isImage && <ImagePreview url={value} />}
          {!isImage && value && (
            <a
              href={resolveMediaUrl(value)}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 inline-block text-sm text-[#2ea3dd] underline"
            >
              Current file
            </a>
          )}
          <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-2 text-sm text-[#e0ded2]/70 transition hover:border-[#2ea3dd] hover:text-[#2ea3dd]">
            <Upload className="h-4 w-4" />
            {value || pendingFile ? 'Replace file' : `Upload ${isImage ? 'image' : 'PDF'}`}
            <input
              type="file"
              accept={isImage ? 'image/jpeg,image/png,image/webp' : 'application/pdf'}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onFileSelect(file)
              }}
            />
          </label>
        </Field>
      )
    }

    case 'imageList': {
      const urls = value || []
      const handleAdd = async (file) => {
        setUploadError('')
        setUploading(true)
        try {
          const formData = new FormData()
          formData.append('file', file)
          const res = await authFetch(`/uploads/${field.uploadSubdir}`, { method: 'POST', body: formData })
          onChange([...urls, res.url])
        } catch (err) {
          setUploadError(err instanceof ApiError ? err.message : 'Upload failed')
        } finally {
          setUploading(false)
          if (fileInputRef.current) fileInputRef.current.value = ''
        }
      }
      return (
        <Field label={field.label} required={field.required}>
          <div className="mb-2 flex flex-wrap gap-2">
            {urls.map((url) => (
              <ImagePreview key={url} url={url} small onRemove={() => onChange(urls.filter((u) => u !== url))} />
            ))}
          </div>
          <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-2 text-sm text-[#e0ded2]/70 transition hover:border-[#2ea3dd] hover:text-[#2ea3dd]">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Add image
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleAdd(file)
              }}
            />
          </label>
          {uploadError && <p className="mt-1 text-xs text-red-400">{uploadError}</p>}
        </Field>
      )
    }

    case 'stringList':
      return (
        <Field label={field.label} required={field.required} hint="One item per line">
          <textarea
            className={`${inputClass} min-h-[100px] resize-y`}
            value={(value || []).join('\n')}
            onChange={(e) => onChange(e.target.value.split('\n'))}
          />
        </Field>
      )

    case 'group':
      return (
        <div className="mb-4">
          <span className={labelClass}>{field.label}</span>
          <div className="grid grid-cols-1 gap-3 rounded-lg border border-white/10 p-4 sm:grid-cols-2">
            {field.fields.map((sub) => (
              <div key={sub.name}>
                <label className="mb-1 block text-xs text-[#e0ded2]/50">{sub.label}</label>
                <input
                  type="text"
                  className={inputClass}
                  value={(value || {})[sub.name] || ''}
                  onChange={(e) => onChange({ ...(value || {}), [sub.name]: e.target.value })}
                />
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}
