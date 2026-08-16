import { useParams } from 'react-router-dom'
import SingletonForm from './components/SingletonForm'
import ListEditor from './components/ListEditor'
import { singletonSections, listSections } from './sectionsConfig'

export default function SectionPage() {
  const { type, key } = useParams()

  if (type === 'singleton') {
    const section = singletonSections.find((s) => s.key === key)
    if (!section) return <p className="text-[#e0ded2]">Section not found.</p>
    return <SingletonForm title={section.label} apiPath={section.apiPath} fields={section.fields} />
  }

  const section = listSections.find((s) => s.key === key)
  if (!section) return <p className="text-[#e0ded2]">Section not found.</p>
  return (
    <ListEditor
      title={section.label}
      apiPath={section.apiPath}
      fields={section.fields}
      titleField={section.titleField}
      subtitleField={section.subtitleField}
      thumbnailField={section.thumbnailField}
      reorderable={section.reorderable !== false}
      listQuery={section.listQuery || ''}
    />
  )
}
