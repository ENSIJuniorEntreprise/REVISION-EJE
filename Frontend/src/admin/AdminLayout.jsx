import { NavLink, Outlet } from 'react-router-dom'
import { LogOut, ExternalLink } from 'lucide-react'
import { useAuth } from './AuthContext'
import { singletonSections, listSections } from './sectionsConfig'

// Priority order per the brief: Board Members -> Stats -> Articles/News ->
// Events -> everything else.
const PRIORITY_KEYS = ['board-members', 'stats', 'articles', 'magazines', 'events']

function byKey(key) {
  return (
    listSections.find((s) => s.key === key) ||
    singletonSections.find((s) => s.key === key)
  )
}

const priorityItems = PRIORITY_KEYS.map(byKey).filter(Boolean)
const priorityKeySet = new Set(PRIORITY_KEYS)

const restListItems = listSections.filter((s) => !priorityKeySet.has(s.key))
const restSingletonItems = singletonSections.filter((s) => !priorityKeySet.has(s.key))

function sectionType(section) {
  return listSections.includes(section) ? 'list' : 'singleton'
}

function NavGroup({ heading, items }) {
  if (items.length === 0) return null
  return (
    <div className="mb-6">
      <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-[#e0ded2]/40">{heading}</div>
      <div className="flex flex-col gap-0.5">
        {items.map((section) => (
          <NavLink
            key={section.key}
            to={`/admin/${sectionType(section)}/${section.key}`}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm transition ${
                isActive ? 'bg-[#2ea3dd]/15 text-[#2ea3dd]' : 'text-[#e0ded2]/70 hover:bg-white/5 hover:text-[#e0ded2]'
              }`
            }
          >
            {section.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const { admin, logout } = useAuth()

  return (
    <div className="flex min-h-screen bg-[#1f212d]">
      <aside className="w-64 flex-shrink-0 border-r border-white/10 px-4 py-6">
        <div className="mb-8 px-3">
          <div className="font-heading text-lg font-extrabold text-[#e0ded2]">EJE Admin</div>
          <div className="text-xs text-[#e0ded2]/40">{admin?.email}</div>
        </div>

        <NavGroup heading="Priority" items={priorityItems} />
        <NavGroup heading="Pages" items={restSingletonItems} />
        <NavGroup heading="Other content" items={restListItems} />

        <div className="mt-8 flex flex-col gap-1 border-t border-white/10 pt-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#e0ded2]/70 hover:bg-white/5 hover:text-[#e0ded2]"
          >
            <ExternalLink className="h-4 w-4" />
            View site
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#e0ded2]/70 hover:bg-white/5 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto px-10 py-8">
        <Outlet />
      </main>
    </div>
  )
}
