import { Link } from 'react-router-dom'

function daysElapsed(startDate) {
  return Math.floor((Date.now() - new Date(startDate).getTime()) / 86400000)
}

export default function BatchCard({ batch }) {
  const days = daysElapsed(batch.startDate)
  const isOverdue = days > batch.targetDays && batch.status === 'active'

  return (
    <Link
      to={`/batch/${batch.id}`}
      className="block bg-white border border-amber-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-amber-900">{batch.name}</h3>
          {batch.origin && <p className="text-sm text-amber-600 mt-0.5">{batch.origin}</p>}
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
            batch.status === 'active'
              ? isOverdue
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {batch.status === 'active' ? (isOverdue ? 'Overdue' : 'Active') : 'Completed'}
        </span>
      </div>

      <div className="mt-3 flex gap-6 text-sm text-amber-700">
        <span>
          <span className="font-medium">{days}</span> / {batch.targetDays} days
        </span>
        {batch.quantity > 0 && <span>{batch.quantity} kg</span>}
        <span>{batch.temperatureReadings.length} readings</span>
        <span>{batch.turningEvents.length} turns</span>
      </div>
    </Link>
  )
}
