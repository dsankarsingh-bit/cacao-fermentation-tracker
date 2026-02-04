import { useState } from 'react'

function nowLocal() {
  return new Date().toISOString().slice(0, 16)
}

export default function TurningEventForm({ onAdd }) {
  const [timestamp, setTimestamp] = useState(nowLocal())

  const handleSubmit = (e) => {
    e.preventDefault()

    onAdd({
      timestamp: new Date(timestamp).toISOString(),
    })

    setTimestamp(nowLocal())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="datetime-local"
        value={timestamp}
        onChange={e => setTimestamp(e.target.value)}
        className="border border-amber-300 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <button
        type="submit"
        className="bg-amber-100 hover:bg-amber-200 text-amber-800 text-sm font-medium py-1.5 rounded-lg transition-colors"
      >
        Log Turn
      </button>
    </form>
  )
}
