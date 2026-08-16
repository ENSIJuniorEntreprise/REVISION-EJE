// Shared by SingletonForm and ListEditor: decides whether a section's form
// needs to submit as multipart FormData (if it has an inline image/pdf
// field) or plain JSON, and builds the request body either way.

export function hasInlineFile(fields) {
  return fields.some((f) => f.type === 'image' || f.type === 'pdf')
}

export function buildSubmission(fields, values, files) {
  if (!hasInlineFile(fields)) {
    return { body: JSON.stringify(values) }
  }

  const formData = new FormData()
  for (const field of fields) {
    if (field.type === 'image' || field.type === 'pdf') {
      const file = files[field.uploadField || field.name]
      // No new file selected: omit entirely so the backend keeps the
      // existing value instead of wiping it.
      if (file) formData.append(field.uploadField, file)
      continue
    }
    if (field.type === 'group' || field.type === 'stringList' || field.type === 'imageList') {
      formData.append(field.name, JSON.stringify(values[field.name] ?? (field.type === 'group' ? {} : [])))
      continue
    }
    if (field.type === 'checkbox') {
      formData.append(field.name, values[field.name] ? 'true' : 'false')
      continue
    }
    const v = values[field.name]
    formData.append(field.name, v === undefined || v === null ? '' : String(v))
  }
  return { body: formData }
}

export function emptyValuesFor(fields) {
  const values = {}
  for (const field of fields) {
    if (field.type === 'checkbox') values[field.name] = false
    else if (field.type === 'stringList' || field.type === 'imageList') values[field.name] = []
    else if (field.type === 'group') values[field.name] = {}
    else values[field.name] = ''
  }
  return values
}
