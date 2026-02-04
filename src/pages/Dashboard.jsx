import { useBatchContext } from '../App'
import BatchCard from '../components/BatchCard'
import DataSync from '../components/DataSync'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { batches, loading } = useBatchContext()

  const active = batches.filter(b => b.status === 'active')
  const completed = batches.filter(b => b.status === 'completed')

  if (loading) {
    return <div className="text-center py-20"><p className="text-amber-500 text-sm">Loading…</p></div>
  }

  if (batches.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-amber-700 text-lg mb-2">No batches yet</p>
        <p className="text-amber-500 text-sm mb-6">Start your first cacao fermentation to begin tracking.</p>
        <Link
          to="/batch/new"
          className="inline-block bg-amber-700 hover:bg-amber-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          + New Batch
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-amber-900">Dashboard</h1>
        <DataSync />
      </div>

      {active.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">Active</h2>
          <div className="space-y-3">
            {active.map(batch => <BatchCard key={batch.id} batch={batch} />)}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">Completed</h2>
          <div className="space-y-3">
            {completed.map(batch => <BatchCard key={batch.id} batch={batch} />)}
          </div>
        </section>
      )}
    </div>
  )
}
