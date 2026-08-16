import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function AdminDashboard() {
  const { admin } = useAuth()

  return (
    <div>
      <h1 className="mb-2 font-heading text-2xl font-extrabold text-[#e0ded2]">
        Welcome{admin?.name ? `, ${admin.name}` : ''}
      </h1>
      <p className="mb-8 max-w-xl text-sm text-[#e0ded2]/60">
        Use the menu on the left to manage the site's content. Changes take effect immediately on
        the public pages — use "View site" to check your work.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          to="/admin/list/board-members"
          className="rounded-lg bg-[#2ea3dd] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1b87bb]"
        >
          Manage Board Members
        </Link>
        <Link
          to="/admin/singleton/stats"
          className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-[#e0ded2]/80 transition hover:border-white/30"
        >
          Update Key Figures
        </Link>
      </div>
    </div>
  )
}
