import { useParams, useNavigate } from 'react-router-dom'
import { useBatchContext } from '../App'
import TemperatureChart from '../components/TemperatureChart'
import TurningLog from '../components/TurningLog'
import TemperatureForm from '../components/TemperatureForm'
import TurningEventForm from '../components/TurningEventForm'

function daysElapsed(startDate) {
  return Math.floor((Date.now() - new Date(startDate).getTime()) / 86400000)
}

export default function BatchDetail() {
  const { id } = useParams()
  const { getBatchById, updateBatch, removeBatch } = useBatchContext()
  const navigate = useNavigate()
  const batch = getBatchById(id)

  if (!batch) {
    return (
      <div className="text-center py-20">
        <p className="text-amber-700">Batch not found.</p>
        <button onClick={() => navigate('/')} className="text-amber-600 underline mt-2 text-sm">
          Back to Dashboard
        </button>
      </div>
    )
  }

  const days = daysElapsed(batch.startDate)

  const handleAddReading = (reading) => {
    updateBatch(id, (b) => ({
      ...b,
      temperatureReadings: [...b.temperatureReadings, reading],
    }))
  }

  const handleAddTurning = (event) => {
    updateBatch(id, (b) => ({
      ...b,
      turningEvents: [...b.turningEvents, event],
    }))
  }

  const handleComplete = () => {
    updateBatch(id, { status: 'completed' })
  }

  const handleDelete = () => {
    if (window.confirm(`Delete "${batch.name}"? This can't be undone.`)) {
      removeBatch(id)
      navigate('/')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-amber-900">{batch.name}</h1>
          {batch.origin && <p className="text-amber-600 text-sm mt-0.5">{batch.origin}</p>}
        </div>
        <div className="flex gap-2">
          {batch.status === 'active' && (
            <button
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              Mark Complete
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Meta stats */}
      <div className="flex gap-6 bg-white border border-amber-200 rounded-xl p-4">
        <div className="flex-1 text-center">
          <p className="text-xs text-amber-500 uppercase tracking-wide">Day</p>
          <p className="text-xl font-bold text-amber-900">{days} <span className="text-sm font-normal text-amber-500">/ {batch.targetDays}</span></p>
        </div>
        <div className="flex-1 text-center border-l border-amber-200">
          <p className="text-xs text-amber-500 uppercase tracking-wide">Status</p>
          <p className={`text-sm font-semibold capitalize ${batch.status === 'active' ? 'text-green-700' : 'text-gray-600'}`}>
            {batch.status}
          </p>
        </div>
        <div className="flex-1 text-center border-l border-amber-200">
          <p className="text-xs text-amber-500 uppercase tracking-wide">Quantity</p>
          <p className="text-sm font-semibold text-amber-900">{batch.quantity || '—'} kg</p>
        </div>
        <div className="flex-1 text-center border-l border-amber-200">
          <p className="text-xs text-amber-500 uppercase tracking-wide">Started</p>
          <p className="text-xs font-semibold text-amber-900">{new Date(batch.startDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Temperature section */}
      <section className="bg-white border border-amber-200 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold text-amber-900">Temperature</h2>
        <TemperatureChart readings={batch.temperatureReadings} />
        {batch.status === 'active' && <TemperatureForm onAdd={handleAddReading} />}
      </section>

      {/* Turning log section */}
      <section className="bg-white border border-amber-200 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold text-amber-900">Turning Log</h2>
        <TurningLog events={batch.turningEvents} />
        {batch.status === 'active' && <TurningEventForm onAdd={handleAddTurning} />}
      </section>
    </div>
  )
}
