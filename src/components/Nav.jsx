import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="bg-amber-900 text-amber-100 shadow-md">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-wide hover:text-white transition-colors">
          Cacao Fermentation Tracker
        </Link>
        <Link
          to="/batch/new"
          className="bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium px-4 py-1.5 rounded transition-colors"
        >
          + New Batch
        </Link>
      </div>
    </nav>
  )
}
