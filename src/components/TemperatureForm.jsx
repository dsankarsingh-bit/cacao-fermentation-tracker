import { useState } from 'react'

function nowLocal() {
  return new Date().toISOString().slice(0, 16)
}

export default function TemperatureForm({ onAdd }) {
  const [timestamp, setTimestamp] = useState(nowLocal())
  const [temp, setTemp] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!temp) return

    onAdd({
      timestamp: new Date(timestamp).toISOString(),
      temp: parseFloat(temp),
    })

    setTemp('')
    setTimestamp(nowLocal())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="datetime-local"
          value={timestamp}
          onChange={e => setTimestamp(e.target.value)}
          className="flex-1 border border-amber-300 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <input
          type="number"
          value={temp}
          onChange={e => setTemp(e.target.value)}
          placeholder="°C"
          step="0.1"
          min="0"
          max="60"
          className="w-20 border border-amber-300 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-amber-100 hover:bg-amber-200 text-amber-800 text-sm font-medium py-1.5 rounded-lg transition-colors"
      >
        Log Reading
      </button>
    </form>
  )
}
